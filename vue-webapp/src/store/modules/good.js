import { fetchGoodList } from '@/api'

export default {
  namespaced: true,
  state: {
    msg: '第一个vue项目',
    // 作用：用于品类页面中的列表数据
    cache: {
      // 0: [],
      // 1: []
    }
  },
  mutations: {
    // 作用：用于更新缓存
    updateCache(state, {idx, list}) {
      state.cache[idx] = list
      // 解决“vuex中数据变量但视图不更新”的问题
      state.cache = JSON.parse(JSON.stringify(state.cache))
    },
    cleanCache(state) {
      state.cache = {}
    }
  },
  actions: {
    getList({commit}, {cate, idx}) {
      fetchGoodList({cate}).then(res=>{
        commit('updateCache', {idx, list:res.list })
      })
    }
  }
}
