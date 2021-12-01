import { fetchCnode } from '@/utils/api'

const state = {
  list: [],
  cates: [
    { id: 1, label: '全部', tab: '' },
    { id: 2, label: '精华', tab: 'good' },
    { id: 3, label: '问答', tab: 'ask' },
    { id: 4, label: '招聘', tab: 'job' },
    { id: 5, label: '分享', tab: 'share' }
  ]
}

const mutations = {
  updateList(state, payload) {
    state.list = payload
    state.list = JSON.parse(JSON.stringify(state.list))
    console.log('vuex list', state.list)
  }
}

const actions = {
  getList({commit}, params) {
    fetchCnode(params).then(list=>{
      console.log('调接口成功', list)
      commit('updateList', list)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
