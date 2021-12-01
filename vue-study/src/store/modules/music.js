import { fetchMusicList } from '@/api'

const state = {
  list: []
}

const mutations = {
  updateList(state, list) {
    state.list = list
  }
}

var str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.top&searchid=70112214423706526&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&_=1632465498056&cv=4747474&ct=24&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&uin=0&g_tk_new_20200303=5381&g_tk=5381&hostUin=0&loginUin=0'
let params = {}
str.split('&').map(ele=>{
  const arr = ele.split('=')
  params[arr[0]] = arr[1]
})
params.w = decodeURI(params.w)

const actions = {
  getList(store, payload) {
    params = {...params, ...payload}
    fetchMusicList(params).then(res=>{
      store.commit('updateList', res.song.list)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
