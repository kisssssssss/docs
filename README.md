# 前言

为满足记录学习过程中笔记与文档的需求，我想要一个简洁的仓库，能在网上展示我的笔记即可。
刚开始计划使用静态博客框架与 Vercel 托管服务。在使用 Hexo、VuePress 以及 VitePress 之后，我发现它们对我来说都不是很理想：

- Hexo 虽然部署便捷和主题多样，但是大量教程文献年代久远，官方文档不是很优秀，而且我不是很喜欢它的项目结构。
- VuePress 与 VitePress 虽然功能更强大与部署也更简单，但对于我而言，它们的功能过于丰富。

鉴于上述考量，我选择了 Next.js 作为开发框架，并通过 Vercel 就行部署。

> 至于为什么选择 Next.js，只是单纯地因为我想了解一些新技术。

# 功能

> 笔记仅支持 Markdown

- [x] 存储并展示个人笔记
- [x] 自动生成笔记目录结构
- [x] [Live2D 动态模型](https://github.com/kisssssssss/model)
- [x] 多种背景模式
- [x] 多种Markdown插件



# Markdown 文件说明

需在 Markdown 文件前面插入 YAML Front Matter

``` yaml
title: 操作系统概述
index: 1
typora-root-url: ./..\..\..\..\IMG\docs\计算机\操作系统
```

- title (必须): 决定页面及文章标题
- index (可选): 决定文件在目录里面的排列顺序, index > 0
- typora-root-url (可选): 在 typora 里面设置的图片根路径


# 目录结构

```
├─app // nextjs 代码
├─components // 通用页面组件
├─docs // 笔记内容
├─public // 资源文件夹
├─style // 页面样式
├─utils // 工具函数
└─views // 具体页面
```

# 本地调试

1. 将项目克隆到本地

2. 安装项目依赖

```sh
npm i
```

3. 运行

```sh
npm run dev
```

# 预览

![](https://github.com/kisssssssss/docs/blob/main/public/img/plum.png)

![](https://github.com/kisssssssss/docs/blob/main/public/img/sky.png)

![](https://github.com/kisssssssss/docs/blob/main/public/img/vortex.png)
