import Vue from 'vue'
import VueRouter from 'vue-router'
// 这是vue开发中一种常见的开发范式：表示注册第三方插件。
// Vue.use()触发VueRouter的install方法调用和执行，会向当前Vue系统中注入很多全局API。
Vue.use(VueRouter)


// 路由懒加载（按需加载）
const Home = ()=>import('./pages/home/Home.vue')
const Detail = ()=>import('./pages/home/Detail.vue')

import FollowList from './pages/home/list/FollowList.vue'
import ReferList from './pages/home/list/ReferList.vue'
import HotList from './pages/home/list/HotList.vue'
import VideoList from './pages/home/list/VideoList.vue'

import Vip from './pages/vip/Vip.vue'
import Find from './pages/find/Find.vue'
import Answer from './pages/answer/Answer.vue'

export const navs = [
  // 当url=/follow时，路由系统将找到一个名字叫default的视图容器来显示Home组件
  {
    path: '/follow',
    text:'首页',
    component: Home,
    children: [
      { path: '/follow', component: FollowList, text:'关注', meta:{ path:'/follow' } },
      { path: '/refer', component: ReferList, text:'推荐',  meta:{ path:'/follow' } },
      { path: '/hot', component: HotList, text:'热榜',  meta:{ path:'/follow' } },
      { path: '/zvideo', component: VideoList, text:'视频',  meta:{ path:'/follow' } }
    ]
  },
  // 当url=/vip时，路由系统将找到一个名字叫alive的视图容器来显示Vip组件
  { path: '/vip', text: '会员', components: { alive: Vip }, meta:{ path:'/vip' } },
  { path: '/explore', text: '发现', components: { default: Find }, meta:{ path:'/explore' } },
  { path: '/answer', text: '等你来答', component: Answer, meta:{ path:'/answer' } },
]

const router = new VueRouter({
  // mode用于指定vue-router路由模式：hash、history。默认是hash路由。
  mode: 'hash',
  // 如何理解route？你可以理解成一条路径规则。
  // 什么是路由规则？比如你访问 /home，我就让Vue系统显示 Home组件。
  routes: [
    ...navs,
    // :xx 动态路由，props=true开启“从列表页到详情页的跳转”使用props来传递路由参数
    // name，表示给路由规则取个名字
    // alias，表示给path取一个小名，是可以当作url来访问的。
    { path: '/detail/:id', name: 'dd', alias: '/d/:id', component: Detail, props: true, meta:{ path:'/follow' } },
    // { path: '/detail', component: Detail },

    // 当访问不存在的路径时，重定向到/follow这个路径
    // 下面这条路由规则是重定向，一般要放在routes的最后。
    // { path: '/*', redirect: '/follow' }
  ]
})

// 路由实例上有三个钩子函数
router.beforeEach((to, from, next)=>{
  // console.log('to', to)
  // console.log('from', from)
  // 鉴权（判断当前用户是否已登录）
  // 权限（根据用户身份判断是否有权访问）
  next()
})

export default router

// 简单说明一下ES6模块化语法
// 用 export default 导出，在另一个文件中使用 import router from './'
// 用 export 导出，在另一个文件中使用 import { } from './'
// 注意：在同一个文件中，最多只能使用一次 export default ，可以使用多次 export
