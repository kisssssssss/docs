# 前言

为满足记录学习过程中笔记与文档的需求，我想要一个简洁的仓库，能在网上展示我的笔记即可。
刚开始计划使用静态博客框架与 Vercel 托管服务。在使用 Hexo、VuePress 以及 VitePress 之后，我发现它们对我来说都不是很理想：

- Hexo 虽然部署便捷和主题多样，但是大量教程文献年代久远，官方文档不是很优秀，而且我不是很喜欢它的项目结构。
- VuePress 与 VitePress 虽然功能更强大与部署也更简单，但对于仅需基础功能的我而言，它们有显得过于臃肿。

鉴于上述考量，我选择了 Next.js 作为开发框架，并通过 Vercel 就行部署。至于为什么选择 Next.js，只是单纯地因为我想了解一些新技术。

# 功能

- [x] 存储并展示个人笔记与文档
- [x] 自动生成笔记目录结构
- [ ] 文章内容请求缓存机制
- [ ] 添加 Live2D 动态模型

# 本地调试

> 本地调试前，确保电脑已安装 Node.js, Git

1. 将项目克隆到本地

2. 安装项目依赖
  ```sh
  npm i
  ```

3. 运行

  ```sh
  npm run dev
  ```

  

# 部署

1. Fork 此项目到你的Github上 (不一定非得 fork，只是与其它方法相比，fork 可能更方便一点)
2. 将 Fork 后的项目从远程仓库克隆到本地计算机
3. 在本地项目中，将 docs 文件夹中的笔记替换为你自己的笔记内容，同时确保将笔记内引用的所有图片保存于 public 文件夹内。
4. 修改完成后，将更改提交至你个人仓库
5. 最后在 vercel 中导入部署即可



# 预览

![](https://github.com/kisssssssss/docs/blob/main/public/1.png)

![](https://github.com/kisssssssss/docs/blob/main/public/2.png)
