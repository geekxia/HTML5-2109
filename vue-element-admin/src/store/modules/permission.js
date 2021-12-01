import { asyncRoutes, constantRoutes } from '@/router'

// hasPermission(['admin', 'editor'], { path, component, children, meta})
// 根据路由元信息的roles字段，来判断当前用户是否有权限访问
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 根据asyncRoutes 和 roles，返回当前用户可以访问的动态的路由规则
export function filterAsyncRoutes(routes, roles) {

  // 用于承载用户可以访问的路由规则
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 递归
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {

  // 根据用户信息roles和asyncRoutes，生成当前用户有权访问的路由规则
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {

      let accessedRoutes = []

      if (roles.includes('admin')) {
        // 如果用户信息的roles数组中有'admin'这个角色，则当前用户可以访问所有的动态路由规则
        // accessedRoutes = asyncRoutes || []
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      } else {
        // 如果用户信息的roles数组中没有'admin'这个角色，说明你是普通用户
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 把当前用户可以访问的所有动态的路由规则放在state
      commit('SET_ROUTES', accessedRoutes)
      // 给.then()使用
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
