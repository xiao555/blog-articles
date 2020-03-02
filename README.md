# 博客文章发布脚本

将posts目录中的md文件解析成JSON数组上传到github指定文件，

图片上传至指定repo，原文和生成后的内容中图片链接会被替换。有重名文件会提示处理方式，跳过or覆盖。

文章缩略图通过unsplash api获取。如果文章已拉取过缩略图则会复用。

文章简介可以通过在正文中增加tag`--intro--`生成, tag之前的为简介内容。

文章正文和简介会转换成html。

## Usage

```
➜  blog-articles git:(master) ✗ node index.js
? 请输入github token： {手动输入github的api token}
开始处理: FreeCodeCamp学习笔记
开始处理: win7 安装 mongodb
开始处理: 关于Git 和 Github 以及Git pages
检测到图片:  005NJVkbjw1f1ymc2ulnuj309h04y3yn.jpg https://xiao555.netlify.com/005NJVkbjw1f1ymc2ulnuj309h04y3yn.jpg
检测到图片:  005NJVkbjw1f1ymenjrv4j30lj0fhq5w.jpg https://xiao555.netlify.com/005NJVkbjw1f1ymenjrv4j30lj0fhq5w.jpg
检测到图片:  005NJVkbjw1f1ymkab7fkj30o90hgwjf.jpg https://xiao555.netlify.com/005NJVkbjw1f1ymkab7fkj30o90hgwjf.jpg
检测到图片:  005NJVkbjw1f1ymvjn5hnj30il0goq8z.jpg https://xiao555.netlify.com/005NJVkbjw1f1ymvjn5hnj30il0goq8z.jpg
检测到图片:  ](http://ww3.sinaimg.cn/mw1024/005NJVkbjw1f1ynaltri1j30sg0ar41g.jpg) http://ww3.sinaimg.cn/mw1024/005NJVkbjw1f1ynaltri1j30sg0ar41g.jpg
上传图片失败: http://ww3.sinaimg.cn/mw1024/005NJVkbjw1f1ynaltri1j30sg0ar41g.jpg
检测到图片:  005NJVkbjw1f1ynooepmdj30en0erwgg.jpg https://xiao555.netlify.com/005NJVkbjw1f1ynooepmdj30en0erwgg.jpg
开始处理: 在vps上搭建hexo博客用Git Hooks 更新
检测到图片:  codebug.png https://xiao555.netlify.com/codebug.png
开始处理: 搬瓦工VPS pptpd VPN配置
开始处理: 搬瓦工VPS shadowsocks配置
开始处理: 日记——2016.3.3
开始处理: 深入浅出Node.js之事件循环与异步I/O
检测到图片:  28b0c513315b4c13a96a46f7ac7bac6b_image.png https://xiao555.netlify.com/28b0c513315b4c13a96a46f7ac7bac6b_image.png
检测到图片:  4d19e938b5644a81924735fca57a4723_image.png https://xiao555.netlify.com/4d19e938b5644a81924735fca57a4723_image.png
检测到图片:  803ca124254e42198715f684acc85f1e_image.png https://xiao555.netlify.com/803ca124254e42198715f684acc85f1e_image.png
检测到图片:  30ebef2fb9304bf2b07bf3680ab9e7b0_image.png https://xiao555.netlify.com/30ebef2fb9304bf2b07bf3680ab9e7b0_image.png
检测到图片:  e4f98fc94dc6422b944cd208e5c6c94f_image.png https://xiao555.netlify.com/e4f98fc94dc6422b944cd208e5c6c94f_image.png
检测到图片:  eac966fd47684d69a005ff291ee1fb9f_image.png https://xiao555.netlify.com/eac966fd47684d69a005ff291ee1fb9f_image.png
检测到图片:  3b9cb346c07149638576a41fabff06f6_image.png https://xiao555.netlify.com/3b9cb346c07149638576a41fabff06f6_image.png
检测到图片:  8f524f1ae111459f99a01b58674b6bd9_image.png https://xiao555.netlify.com/8f524f1ae111459f99a01b58674b6bd9_image.png
检测到图片:  de7a832ab9af4b6dad29b499873f0efb_image.png https://xiao555.netlify.com/de7a832ab9af4b6dad29b499873f0efb_image.png
检测到图片:  bdecb4903b1e4bd9b892a1e82a0644b4_image.png https://xiao555.netlify.com/bdecb4903b1e4bd9b892a1e82a0644b4_image.png
检测到图片:  61ad2742e89c4c249712ce65c4e387ae_image.png https://xiao555.netlify.com/61ad2742e89c4c249712ce65c4e387ae_image.png
检测到图片:  9142627df5b34afcbc6450c11f0ea42a_image.png https://xiao555.netlify.com/9142627df5b34afcbc6450c11f0ea42a_image.png
检测到图片:  67bbbba6a2d34116a2bee74664c9d606_image.png https://xiao555.netlify.com/67bbbba6a2d34116a2bee74664c9d606_image.png
检测到图片:  34e201b99a0f4197b9b66fd53af3886c_image.png https://xiao555.netlify.com/34e201b99a0f4197b9b66fd53af3886c_image.png
开始处理: 用Express + Socket.io + MongoDB实现简易聊天室
检测到图片:  005NJVkbjw1f3fsnv448uj311y0kg0vk.jpg https://xiao555.netlify.com/005NJVkbjw1f3fsnv448uj311y0kg0vk.jpg
检测到图片:  005NJVkbjw1f3ftv2386qj311y0kg0wl.jpg https://xiao555.netlify.com/005NJVkbjw1f3ftv2386qj311y0kg0wl.jpg
检测到图片:  084929_dx2L_1017135.png https://xiao555.netlify.com/084929_dx2L_1017135.png
检测到图片:  084956_5TlW_1017135.png https://xiao555.netlify.com/084956_5TlW_1017135.png
开始发布...
发布成功！
```

转换前的结构：

```
---
title: "Blog Title"
tags: ["tag"]
slug: blog title
createDate: 1455155301793
---
## This is a demo.

--intro--

end.
```

转换后：

```
{
  "intro": "<h2 id="this-is-a-demo">This is a demo.</h2>",
  "content": "<h2 id="this-is-a-demo">This is a demo.</h2>
<p>end.</p>",
  "title": "Blog Title",
  "tags": ["tag"],
  slug: "blog-title",
  createDate: 1455155301793,
  id: "blog-title",
  thumb: "https://images.unsplash.com/photo-1580337603547-6209ef255d26?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwNTE3MH0"
}
```

每篇文章转换后的对象组成数组，上传到指定文件。

访问时通过github的接口：

1. 预览（不推荐，非实时的，这个是github传到aws的静态资源）： https://raw.githubusercontent.com/xiao555/blog-articles/master/articles.json
2. API（实时的，但是content需要base64转string）: https://api.github.com/repos/xiao555/blog-articles/contents/articles.json