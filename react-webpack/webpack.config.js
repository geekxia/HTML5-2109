// 语法：CommonJS语法，node代码（webpack必须运行在node环境）
// module.exports = {}
// module.exports = function() { return { } }
// module.exports =  () => { return {} }
// module.exports =  () => ({})

const common = require('./config/common.js')
const build = require('./config/build.js')
const serve = require('./config/serve.js')

const { merge } = require('webpack-merge')

// 【v4写法：使用cross-env来添加环境变量】
// process是node一个全局变量，全局的node api不用require()
// console.log('env--------', process.env.NODE_ENV)
// const isDev = process.env.NODE_ENV === 'development'
// module.exports = merge(common, isDev ? serve : build)

// 【v5写法：使用--env来添加环境变量】
module.exports = ({production}) => merge(common, production ? build : serve)

// 扩展作业：
// 1、自已搜索webpack面试题？（根据你找的答案，进一步去理解webpack）
// 2、继续翻阅webpack、babel、eslint文档，试一试自己看得懂的知识点。
// 3、如何优雅地使用npm官网？（查看下载量、版本号、依赖包、使用说明、源码分析）
