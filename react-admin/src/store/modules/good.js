import produce from 'immer'
import {
  GET_GOOD_LIST,
  GET_ALL_CATE,
  ADD_OR_EDIT_GOOD,
  RESET_GOOD_DONE,
  GET_GOOD_INFO
} from '../actions'

const initState = {
  list: [],
  total: 0,
  cates: [],
  done: 0,
  info: {}
}

export default function (state=initState, {type,payload}) {
  return produce(state, state=>{
    switch (type) {
      case GET_GOOD_LIST:
        state.list = payload.list
        state.total = payload.total
        break
      case GET_ALL_CATE:
        state.cates = payload
        break
      case ADD_OR_EDIT_GOOD:
        state.done++
        break
      case RESET_GOOD_DONE:
        state.done = 0
        state.info = {}
        break
      case GET_GOOD_INFO:
        state.info = payload
        break
      default:
    }
  })
}
