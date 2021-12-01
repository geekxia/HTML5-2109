// 入口文件
// 每个应用程序都有入口文件（入口函数）

// 从node_modules包中导入Vue这个类
import Vue from 'vue'
// 引入App根组件，这种.vue后缀的文件就表示一个Vue组件。
import App from './App.vue'

// 在开发环境下vue报错提示正常显示，在生产环境下关闭vue各种报错提示。
Vue.config.productionTip = false

// 开发范式：在new Vue()之前，经常注入很多全局的东西
// Vue.filter()
// Vue.directive()
// Vue.mixin()
// Vue.component()
// Vue.use()
// Vue.prototype
// window.bus = new Vue()

import router from './router.js'
import store from './store'

// Vue根容器、根组件、Vue的响应式系统
new Vue({
  el: '#app',
  // 这个router选项是专门用于挂载vue-router路由系统的
  router,
  // 这个store选项是专门用于挂载vuex状态系统的
  store,
  // 如何理解render？它是new Vue()根组件的视图结构（仅仅是理解）。
  // h 函数，用于生成虚拟DOM的一个重要函数，它接受一个Vue组件，返回一个虚拟DOM。
  render: h => h(App)
})
