
// 把这个模块理解成Vuex的子store
// 注意：在子store中不要使用modules，也就说不能再往下拆分了。
export default {
  // namespaced=true，表示开启store的命名空间
  // 作用：可以保证每一个store中变量、方法名不会冲突
  namespaced: true,
  // state
  // 作用：专门用于定义在组件中需要共享的数据（是Vuex数据源）
  // 特点：state变量是响应式的，当state变化时，视图组件自动更新。
  state: {
    username: 0
  },
  // getters
  // 理解：你可以把它理解成计算属性。
  // 作用：用于对state变量进行复杂的计算。
  // 特点：当它关联的state变量发生变化时，getters方法会自动执行。
  getters: {
    qf(state) {
      return 'QF'+state.username
    }
  },
  // mutations
  // 作用：专门用于定义“用来修改state”的同步方法
  // 语法：mutationFn(state, payload)
    // state表示当前vuex共享数据
    // payload来自commit()传递过来的数据。
  // 知道：事实上在mutations方法中可以调接口的，但是不推荐。
  mutations: {
    // payload负荷，它指的是commit()时传递过来的数据
    updateUserName(state, payload) {
      console.log('vuex payload', payload)
      // 根据commit()传递过来的数据，来修改state
      state.username = payload
    }
  },
  // actions
  // 作用：专门用于定义“获取异步数据（比如后端数据）”的方法
  // 语法：actionFn(store, payload)
    // store，代表当前store实例（相当于组件中this.$store）
    // payload，常常表示从组件中传递过来的“用于调接口”的入参
  // 知道：事实上在actions方法中可以直接修改state，也不推荐这么做。
  actions: {
    getUserInfo(store) {
      setTimeout(()=>{
        // 假想来自后端调接口的数据
        const username = 2111
        store.commit('updateUserName', username)
      }, 2000)
    }
  }
}
