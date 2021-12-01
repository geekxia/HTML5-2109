import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import demoArr from './demo'

// 经验：阅读路由规则时，只用注意path、component、children、meta。

// 静态路由（任何人都可以访问的页面）
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    // 这个hidden不是router的路由字段，是自定义字段，你可理解成meta信息
    hidden: true,
    // 只要见到children字段，一定有嵌套视图
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        // 命名路由
        name: 'Dashboard',
        // 路由元信息
        // meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        meta: { title: '首页大屏', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

// 权限路由（有权限的页面）
export const asyncRoutes = [
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  {
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    name: 'Example',
    meta: {
      title: '商品管理',
      icon: 'el-icon-s-help',
      roles: ['editor']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/good/index'),
        name: 'CreateArticle',
        meta: { title: '商品列表', icon: 'edit' }
      },
      {
        path: 'create',
        component: () => import('@/views/good/good-create'),
        name: 'EditArticle',
        meta: { title: '商品新增', icon: 'email', noCache: true, activeMenu: '/example/list' }
      },
      {
        path: 'cate',
        component: () => import('@/views/good/cate-list'),
        name: 'ArticleList',
        meta: { title: '品类管理', icon: 'list' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 只指定了静态的路由规则
  // 问题：asyncRoutes路由规则哪去了？（asyncRoutes与路由守卫有关）
  routes: constantRoutes
})

// 第一次创建router实例
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
