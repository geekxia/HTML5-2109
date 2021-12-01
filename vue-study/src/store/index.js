import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import test from './modules/test'
import music from './modules/music'

// 根store
// 说明：当把根store拆分成多个子store以后，在根store上仍然可以再定义state、getters。
const store = new Vuex.Store({
  // modules
  // 作用：当vuex体量比较大的时候，我们需要把根store拆分多个小store，以便代码的维护。
  // 注意：为了让Vuex的各个子store彻底地分离，建议把每个子store的namespaced打开。
  // 思考：为什么要分modules？为什么建议开启子store的命名空间？
  modules: {
    test,
    music
  }
})

export default store
