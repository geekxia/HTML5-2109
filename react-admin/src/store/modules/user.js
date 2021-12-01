

import produce from 'immer'
import { USER_LOGIN, GET_USER_INFO, RESET_USER } from '../actions'

const initState = {
  // 避免在“刷新流程”中丢失token。
  token: localStorage.getItem('token'),
  userinfo: {}
}

export default function reducer(state=initState, {type,payload}) {
  return produce(state, state=>{
    switch (type) {
      case USER_LOGIN:
        state.token = payload
        break
      case GET_USER_INFO:
        state.userinfo = payload
        break
      case RESET_USER:
        state.token = null
        state.userinfo = {}
        localStorage.removeItem('token')
        break
      default:
    }
  })
}
