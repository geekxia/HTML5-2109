function fetchMsg(params) {
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(Math.random())
    }, 1000)
  })
}

export default {
  namespace: 'user',
  state: {
    msg: 'hello umi'
  },
  // 相当于是vuex中mutations
  reducers: {
    updateMsg(state:any, action:any) {
      const newState = JSON.parse(JSON.stringify(state))
      newState.msg = action.paylaod
      return newState
    }
    // updateMsg(state, action) {
    //   state.msg = action.payload
    // }
  },
  // 相当vuex中actions
  effects: {
    *getMsg(action:any, {call,put}) {
      const res = yield call(fetchMsg, {})
      yield put({type:'user/updateMsg', paylaod: res})
    }
  }
}
