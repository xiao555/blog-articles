const matter = require('gray-matter');
const glob   = require('glob');
const fs     = require('fs');
const marked = require('marked');
const hljs   = require('highlight.js');
const fetch  = require('node-fetch');
const inquirer = require('inquirer');
const chalk = require('chalk');

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
})

const results = []
const introTag = '--intro--'
const thumbUrl = 'https://api.unsplash.com/photos/random?client_id=cd8f6ebac5a5ed217bc4674a5fe851f30eb6e92686b8d027adadf602048b49fa'
const imgReg = /\!\[(.*)\]\((.*\.(jpg|jpeg|png|gif))\)/g
const ghToken = '104c2a84474d28f84ce9838f857c61da7f40d53f'
const ghName = 'xiao555'
const ghEmail = 'zhangruiwu32@gmail.com'
const cdnRepoLink = 'https://api.github.com/repos/xiao555/netlify'
const cdnLink = 'https://xiao555.netlify.com'
const articleRepoLink = 'https://api.github.com/repos/xiao555/blog-articles'

;(async () => {
  try {
    const repoContents = await fetch(`${cdnRepoLink}/contents/`).then(r => r.json())
    const repoFiles = repoContents.map(content => content.name)
    const posts = glob.sync('./posts/*.md')
    await Promise.all(posts.map(async post => {
      const res = {}
      let { content, data } = matter(fs.readFileSync(post, 'utf8'));
      if (imgReg.test(content)) {
        const replaceMap = {}
        content.replace(imgReg, (match, name, url) => {
          replaceMap[name] = {
            originUrl: url
          }
        })
        let p = Promise.resolve()
        let ignoreDuplicateFile = false
        Object.entries(replaceMap).forEach(([name, { originUrl: url }]) => {
          p = p.then(async () => {
            console.log('Uploading: ', name, url)
            if (repoFiles.includes(name) && url.includes(cdnLink)) {
              return Promise.resolve()
            } else {
              let imgData = await fetch(url).then(r => r.buffer())
              let ext = url.match(/\.(jpg|jpeg|png|gif)/)[1]
              if (repoFiles.includes(name)) {
                // 全部跳过
                if (ignoreDuplicateFile) {
                  return Promise.resolve()
                }
                const { METHOD } = await inquirer.prompt([
                  {
                    name: 'METHOD',
                    type: 'list',
                    message: `存在同名文件${name}，请选择处理方式：`,
                    choices: ['跳过本次', '全部跳过', '重命名']
                  }
                ])
                if (METHOD === '跳过本次') {
                  return Promise.resolve()
                } else if (METHOD === '全部跳过') {
                  ignoreDuplicateFile = true
                  return Promise.resolve()
                } else if (METHOD === '重命名') {
                  const { NAME } = await inquirer.prompt([
                    {
                      name: 'NAME',
                      type: 'input',
                      message: '请输入名称(不带后缀)：',
                    }
                  ])
                  name = `${NAME}.${ext}`
                }
              }
              let res = await fetch(`${cdnRepoLink}/contents/${name}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `token ${ghToken}`
                },
                body: JSON.stringify({
                  message: `upload ${name}`,
                  committer: {
                    name: ghName,
                    email: ghEmail
                  },
                  content: imgData.toString('base64')
                })
              }).then(r => r.json())
              console.log(res)
              content = content.replace(`![${name}](${url})`, `![${name}](${cdnLink}/${name})`)
              return Promise.resolve()
            }
          })
        })
        await p
      }
      if (content.includes(introTag)) {
        let [before, after] = content.split(introTag)
        res.intro = marked(before)
        res.content = marked(before + after)
      } else {
        res.content = marked(content)
      }
      data.slug = data.slug.replace(/ +/g, '-').toLowerCase()
      data.id = data.slug
      results.push({
        ...res,
        ...data
      })
    }))
    await Promise.all(
      results
        .sort((a,b) => a.createDate - b.createDate)
        .map(async (post) => {
          console.log('fetch thumb...')
          const response = await fetch(thumbUrl).then(r => r.json())
          post.thumb = response.urls.small
        })
    )
    console.log(results)
    // publish
    const articleRepoContents = await fetch(`${articleRepoLink}/contents/`).then(r => r.json())
    const sha = articleRepoContents.find(item => item.name === 'articles.json').sha
    let res = await fetch(`${articleRepoLink}/contents/articles.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${ghToken}`
      },
      body: JSON.stringify({
        message: `update ${Date.now()}`,
        committer: {
          name: ghName,
          email: ghEmail
        },
        content: new Buffer(JSON.stringify(results)).toString('base64'),
        sha
      })
    }).then(r => r.json())
    console.log(res)
  } catch (e) {
    console.log(e);
  }
})()