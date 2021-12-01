# 环境搭建

- 脚手架：使用系统方法（node提供的）快速生成项目基础架构。
- 前提：node v12、v14
```
cnpm i @vue/cli -g
# 在windows电脑全局安装的包，要先关闭当前命令行，再打开才能访问到
```
```
# 创建项目的第一方式
vue ui
```
```
# 创建项目的第二方式
vue create vue-study
# 选择vue2
```

```
# 假如当前项目没有node_modules目录
# 或者node_modules中丢包了，项目肯定是启动不了的。怎么办呢？

# 在项目的根目录下执行如下命令：
rm -rf node_modules
cnpm install
npm run serve / npm start
```

# 环境问题记录

- 1、如何正确地在脚手架环境中使用sass？
```
cnpm i sass-loader@8.0.2 -D
cnpm i sass -D
```
  - 在.vue文件中，在<style lang='scss'>


# 项目结构介绍

- .vue 是Vue脚手架中专门定义Vue组件的一种方式，我们经常称呼这种文件叫“单文件组件”，它由三个部分组成：
  - <template> 用于指定当前组件的视图结构，在其中可以使用所有指令。
  - <script> 用于放置js代码，用于定义Vue组件。
  - <style> 用于放置样式，比如css、sass。在.vue的文件中，这个标签可以使用多次。

- 为了在vscode中打开.vue文件有高亮颜色，安装`vetur`这个插件。

# vue-router

- 常识：现代前端应用程序，大多数都是单页应用程序（SPA），即只有一个index.html页面。
- 问题：在一个index.html页面中，如何实现“url-页面”的切换关系（从一个页面到另一个页面）？
- 答案：要使用vue-router来实现，通过url切换来控制vue组件的创造与销毁。所以，在路由的眼中一切皆组件。

- 如何集成路由系统？

```
cnpm i vue-router -S
```
```
# src/router.js
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/url', component: '你希望显示的当前url所对应的Vue组件' }
  ]
})
```
```
# src/main.js
new Vue({router})  // 挂载路由系统
```
```
# src/App.vue
<template>
  <router-view></router-view>
</template>
```

- 在Vue的单页面应用程序中如何集成Vue-Router?
  - 如何定义“path-component”的这种路由规则？在哪里定义？
  - 如何触发浏览器地址栏中URL的变化？
  - 在哪里显示URL所对应的Vue组件？（<router-view>放在哪里？）

- 两个内置组件
  - <router-view>  用于显示url所对应的Vue组件
  - <router-link>  相当于是a标签，用于触发url的变化

- 两个内置API
  - $route  代表的是当前URL的基础信息，vue任意组件中的watch都可以监听$route的变化。
  - $router 代表的是路由API，通常用于编程式路由跳转。

- 两种路由跳转方式
  - 声明式路由跳转，使用<router-link to='/path'>跳转页面。通常用于菜单类的导航（常常高亮样式）。
  - 编程式路由跳转，使用$router.push()/replace()/back()跳转页面。通常用于非菜单类的路由跳转（常常不需要添加高亮样式）。

- 两种路由传参方式
  - 动态路由传参（工作经常用）：在路由规则上配置动态路由 {path:'/p/:id', component, props:true}，在详情页使用this.$route来接收动态路由参数；当路由规则上的props=true时，在详情页还可以使用 props选项来接收动态路由参数。
  - Query传参（工作中很少用）：使用this.$router.push('/p?id='+id)跳转到详情页，在详情页中使用this.$route.query.id来接收query参数。

- 两个命名
  - 命名路由（几乎没有用）：给路由规则取个名字。路由规则有了名字之后，跳转路由可以这么写this.$router.push({name:'路由规则名字', params: {}})。
  - 命名视图（还是挺有用的）：给视图容器<router-view name=''>取个名字。设想一个场景，在Vue单页面应用程序中有100个页面组件，其中有10个页面组件需要使用<keep-alive>进行包裹，这时候我们就可以使用命名视图来解决问题。

- 两种路由模式
  - Hash路由：在域名后面有一个‘#’；当项目打包上线部署后，不会出404问题；背后原理是监听onHashStateChange事件来实现的。
  - History路由：在域名后面没有‘#’；当项目打包上线部署后，会出现404问题（需要在Nginx上做重定向处理）；背后原理是BOM的History API来实现的。

- 重定向和别名
  - 重定向（很常用）：给未定义的路由添加重定向跳转 {path:'/*',redirect:'/已定义的path上'}。
  - 别名（不常用）：给路由规则中的path取一个小名 { path:'/abcd', alias:'/a' }，别名是可以当作url来访问的。

- 嵌套视图（难理解）
  定义：在<router-view>所显示的Vue组件中再使用<router-view>。
  作用：常常用于设计二级菜单。事实上三级以上的菜单很少出现前端产品的。
  实现：路由规则的配置 { path: '/a', component, children: [{path:'/b'},{path:'/c'}]}
  思考：嵌套视图实现的二级菜单和Tab栏有什么本质区别？

- 路由懒加载
  - 作用：是Vue路由设计层面的一种性能优化方案。
  - 原理：Vue异步组件、Webpack代码分割技术。

- 路由守卫（全局守卫、局部守卫）
  - 作用：网站实现登录拦截、权限设计时一种解决方案。
  - 全局守卫：是路由实例上的三个钩子 beforeEach()/beforeResolve()/afterEach()
  - 局部守卫：是Vue组件上的三个钩子 beforeRouteEach() / ....

- 路由元信息（meta）
  - 理解：给路由规则添加自定义字段，用于描述当前路由规则的特点。
  - 使用：在路由守卫钩子中、$route中都可以访问到这些元信息。
  - 举例：在Vue管理系统开发中，常常结合路由守卫实现权限设计。

# Vuex入门学习

- 什么是状态？状态，在应用程序中就表示“数据”，你可以把“状态管理”理解成“数据流管理”。
- 作用：组件之间数据共享；实现数据缓存。（Vuex是vue中最终极的通信方案）
- 介绍：Vuex是基于Facebook的Flux数据架构思想而设计的一个经典的状态管理工具。
- 特点：凡是定义在Vuex中的state数据，在所有组件中都可以共享；当Vuex中state数据发生变化时，组件视图自动更新。

- 如何在Vue脚手架项目中集成Vuex？
```
cnpm install vuex -S
```
```
# src/store/index.js
Vue.use(Vuex)
export default new Vuex.Store({
  state: { count: 1 },
  getters: {},
  mutations: {
    updateCount(state, payload) {
      state.count = payload
    }
  },
  actions: {
    getList(store, payload) {
      axios(payload).then(list=>{
        store.commit('updateList', list)
      })
    }
  }
})
```
```
# src/main.js
new Vue({ store })
```
```
# 在vue组件中
this.$store.state.msg
this.$store.commit('updateCount', 100)
this.$store.dispatch('updateList', {page:1})
```

# Vuex最佳实践

- 知识点：五个概念、四个API
- 面试题：Vuex的工作流程？为什么要分modules？为什么要开启命名空间？在Actions方法中能不能直接修改state？在mutations方法中能不能调接口？谈一谈你对Vuex的理解？

- Vuex工作流程
  - 从需求出发，当我们在Vue项目开发过程，遇到需要在页面之间进行数据共享时，或者需要对某些数据进行缓存时，我们常常会想到使用Vuex来解决问题。
  - 安装vuex，在src/store/index.js，创建根store。使用modules这个概念，对根store进行拆分，同时建议开启子store命令空间。
  - 把目标数据定义state中，在Vue组件中的计算属性中使用 mapState()映射目标数据，然后在组件内部就可以使用this来访问了。（不建议直接使用this.$store.state.xxx来访问）
  - 如果目标数据放置在后端数据库，我们需要调接口获取。所以在子store中封装actions方法来调接口。
  - 在actions方法中调接口拿到后端数据后，再封装mutations方法，将拿到的后端数据更新到state上。当state数据变化时，页面组件能够自动更新。
  - 和后端打交道的actions方法是不会自动调用的，需要在Vue组件中进行派发与触发。我们推荐在Vue的methods选项中使用mapActions方法进行映射，通常会在生命周期中通过this来调用这些映射进行actions方法。

- 一些最佳实践的建议
  - Vuex的根store建议拆分子store，子store建议开启命名空间。
  - 在组件中使用子store的变量和方法时，建议使用四个map*系列方法分别进行映射。mapState和mapGetters要写在Vue的计算属性中，mapMuations和mapActions要写在Vue的methods选项中。
  - 在使用Vuex进行开发时，并不是所有调接口的逻辑都要封装在actions中。只有那些需要在Vuex中进行存储的数据所对应的调接口方法，才需要在actions中进行封装。



# axios

- 简介：基于Promise而封装一个ajax工具，用于调接口；axios不仅在客户端可以使用，在node环境中也可以使用。
- 使用步骤：安装axios、封装axios(请求拦截器、响应拦截器)。

- 什么是跨域？协议、域名、端口号，三者只要有不同的，都属于跨域。
  - http:mi.com  -> https.mi.com
  - http:mii.com -> http:mi.com
  - http:10.168.204.32:8001 -> http:10.168.204.32:8002

- 为什么axios向远程服务器调接口会被拦截？
  - 本质原因：浏览器中内置了一个CORS的安全策略，这个有个特点，它阻塞ajax跨域请求。
  - 进一步说明：在浏览器中，ajax不跨域会不会被阻塞吗？非ajax工具跨域请求会被阻塞吗？

- 在Vue开发环境如何解决跨域？
  - JSONP 在浏览器中使用<script src='api'>标签发起api请求，需要后端使用JSONP的方式响应数据。这种解决跨域的方案只适用于GET请求。
  - CORS 当后端响应前端时要添加一系列的CORS安全Headers字段。
  - 代理（工作中常用）：在vue开发环境下使用webpack(背后实际上仍然是node服务)进行代理请求。

- 在生产环境下如何解决跨域？（前端无能为力，在服务器上要使用Nginx进行代理请求）

- 如何优雅地调试数据流？
  - axios请求拦截器（token有误）axios响应拦截器（判断HTTP状态有误、数据过滤有误）
  - api封装时也可能出错（[GET/params],[POST/data],method）
  - vue.config.js（解决跨域问题，配置文件有错）
  - 触发调接口时有误（可以actions方法中打印、network查看）
  - 如果有走vuex流程actions->mutations-state（在devtools查看）
  - 在Vue组件中使用state数据、渲染页面时有误（结合指令排查错误）
