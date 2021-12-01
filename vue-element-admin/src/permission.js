import router from './router'
import store from './store'
import { Message } from 'element-ui'

import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

// 进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单，无论用户登录与否，都可以访问
const whiteList = ['/login', '/auth-redirect']

// 全局路由守卫(配对之前)
router.beforeEach(async(to, from, next) => {
  // 显示进度条
  NProgress.start()

  // 根据你配置的元信息来设置当前页面的Title
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录了(获取Token)
  const hasToken = getToken()

  if (hasToken) {

    // 如果有Token(表示用户已登录)
    if (to.path === '/login') {
      // 如果用户已登录，并且你正尝试访问登录页，直接跳转到系统内部首页
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // 如果有Token，并且用户正在访问非登录页
      // 根据当前的用户信息(放在数据库中)，判断当前用户是否有权利访问当前路由（页面）

      // 从vuex中，判断当前roles(它一个数组)是否有值且有角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        // 如果hasRoles=true，说明vuex中已经有用户的角色信息
        next()
      } else {
        // 特别说明：下面这段生成权限路由规则的逻辑，在每次登录成功后会执行、在每页面刷新时会执行。

        // 如果hasRoles=false，说明vuex中没有有用户的角色信息
        try {
          // 因为当前vuex中没有用户信息，所以现在通过调接口来获取用户信息
          // 特点注意：后端给的 roles = 数组 ['admin'] or ,['developer','editor']

          // 通过vuex的actions方法调接口获取当前token对应的用户信息（角色信息）
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 根据当前用户的roles信息，生成当前用户可以访问的权限路由
          // accessRoutes，表示当前用户有权访问的asyncRoutes
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 路由实例上的 addRoutes() 手动地向添加路由规则
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }

  } else {
    // 如果没有token(表示用户未登录)
    if (whiteList.indexOf(to.path) !== -1) {
      // 判断当前用户访问的页面在不在白名单中
      // 如果在白名单中，直接访问
      next()
    } else {
      // 如果不在白名单中，重定向到login页面
      // ?redirect用于记录“你从哪个页面被重定向过来的”
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局路由守卫(配对之后)
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// - 通过url访问vue的页面组件时都要经过全局守卫
// - 首先判断有Token(是否登录了)
//   - N 未登录
//     - 访问白名单页面 next()
//     - 访问非白名单页面 next('/login')
//   - Y 已登录
//     - 判断vuex中有没有roles
//       - N 根据token调接口获取用户信息、把roles放进vuex中、根据roles生成当前用户可以访问的路由规则、next()
//       - Y next()
