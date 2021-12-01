import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router'
import store from './store'
import img from './utils/img'
import api from './api'

// Vue原型链（加$是一个习惯，表示原型链上的）
Vue.prototype.$img = img
Vue.prototype.$api = api

Vue.directive('auth', function(el){
  // 从合适的地方取出token
  const isLogin = localStorage.getItem('token')
  el.style.position = 'relative'
  const oDiv = document.createElement('div')
  oDiv.style.position = 'absolute'
  oDiv.style.top = 0;
  oDiv.style.bottom = 0;
  oDiv.style.left = 0;
  oDiv.style.right = 0;
  oDiv.style.zIndex = 9999;
  oDiv.addEventListener('click', function(){
    router.push('/login')
  })
  if(!isLogin) el.appendChild(oDiv)
})

// 按需导入（是H5开发中的一种性能优化方案）
import {
  Button,
  Tabbar,
  TabbarItem,
  NoticeBar,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  PullRefresh,
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  NavBar,
  SubmitBar,
  Checkbox,
  SwipeCell,
  Card,
  Col,
  Row,
  Form,
  Field,
  Toast
} from 'vant'
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NoticeBar)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(NavBar)
Vue.use(SubmitBar)
Vue.use(Checkbox)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
