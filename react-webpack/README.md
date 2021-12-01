【React学习路径】

一、webpack环境，babel、eslint、react基础、react-router、mobx
	工程化
	运行速度快

二、create-react-app、redux、@reduxjs/toolkit、项目实战Hooks

三、react阿里系 antd、dva、umi、ant-design-pro、antv图片、微前端
	研究阿里系前端开源代码


webpack构建工具：gulp、rollup
什么webpack？把工程化里通过模块化语法关联的模块进行打包，转化成浏览器能够普遍兼容的静态资源文件。

# webpack环境搭建

```
cnpm i webpack -g
cnpm i webpack -D
cnpm i webpack-cli -g
cnpm i webpack-cli -D
cnpm i webpack-dev-server -g
cnpm i webpack-dev-server -D
```
- webpack，是核心api、内置插件都在这个包中
- webpack-cli，给当前电脑环境暴露一些webpack命令
- webpack-dev-server, 用于构建本地服务
- html-webpack-plugin，主要作用用于把js代码和html组装起来
- cross-env，在v4中给node添加环境环境，在v5中使用--env添加node环境变量
- webpack-merge，专门用于对webpack配置项进行合并的


重新审视：
- webpack、babel、eslint...
- react基础：JSX、组件化（组合）、上下文、高阶组件、Hooks
- react-router-dom、antd
- mobx、axios
