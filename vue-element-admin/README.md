# 项目分析

- README.md  代码规范说明、目录结构介绍、项目启动、运行、打包、逻辑、坑、Bug、环境配置等。。。
- package.json 有哪些依赖包(核心代码依赖包、环境所需要的包)，npm scripts、eslint配置。。。
  - 建议认真浏览所有的依赖包，如果有不认识的包，使用npm官网进行查看。
  - 要知道怎么安装依赖、要知道怎么运行项目
- 浏览项目根目录中所有的配置文件
  - vue.config.js
  - babel.config.js
  - .eslintrc.js
- 注意非src的其它目录，比如本地静态服务public
- src 源代码目录
  - src/main.js 入口文件、有哪些全局的东西。
  - src/router路由文件, 阅读每一条路由规则，重点关注path、component、children、meta等字段。
  - src/store状态管理, 根store、子store封装，会添加store，能读懂actions方法的封装。
  - src/layout布局设计, 重点研究菜单的实现、嵌套视图等。。。
  - src/全局指令、过滤器、全局组件。。。
  - src/utils 一些工具方法的封装
  - src/views 主要学习一下页面组件的规范。。。
  - 。。。



```
"tui-editor": "1.3.3",
```


# 国际化

  - 组件库的国际化，一般对组件进行设置即可
  - 网站中交互文字，需要前端自己配置国际化字段
  - 数据库文字，需要后端根据语言环境返回相应的国际化字段

- 角色
  - admin  管理员 可以看到所有页面
  - editor  编辑  根据权限看到能看到的页面
  - baoan   保安  
