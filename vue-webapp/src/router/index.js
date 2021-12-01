import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由懒加载
const Home = ()=>import('@/views/home/Home.vue')
const Detail = ()=>import('@/views/home/Detail.vue')
const Find = ()=>import('@/views/find/Find.vue')
const Cart = ()=>import('@/views/cart/Cart.vue')
const User = ()=>import('@/views/user/User.vue')
const Login = ()=>import('@/views/user/Login.vue')
const Regist = ()=>import('@/views/user/Regist.vue')

const router = new VueRouter({
  mode: 'hash',
  routes: [
    // 当访问url='/'时，要找到一个名字叫alive的<router-view>来显示Home组件
    { path: '/', components: { alive: Home } },
    // 以下组件，都是寻找名字叫default的<router-view>来显示组件
    { path: '/detail/:id', component: Detail },
    { path: '/find', component: Find },
    { path: '/cart', component: Cart, meta: {auth:true} },
    { path: '/user', component: User, meta: {auth:true} },
    { path: '/login', component: Login },
    { path: '/regist', component: Regist },
    { path: '/*', redirect: '/' }
  ]
})

// 全局守卫
// 坑：无论在任何情况下，路由守卫中的逻辑线只能执行一次next()
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  const isLogin = localStorage.getItem('token')
  if (to.meta.auth) {
    // 在这里判断用户是否登录了
    // 如果已登录，next()
    // 如果未登录，next('/login')
    if (isLogin) {
      next()
    } else {
      // next('/login')
      // 解决路由守卫报错的问题
      // window.location.href = '/#/login'
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
