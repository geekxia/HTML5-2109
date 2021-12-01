
// 可被组件共享或用于缓存的状态数据

// 因为js引用类型比较复杂，当我们直接修改这种复杂的引用数据时，React上下文可能识别不了store的变化，这将导致视图不更新。所以，redux一开始就要求开发者不能直接修改store，要在reducer函数中使用“深复制”的方法来修改store。

// 摆在我们面前常用的深复制方案有哪些？
// 1、JSON.parse(JSON.stringify(state))
// 2、immutable 比较难使用（面试官会问）
// 3、immer 我们推荐使用immer来实现深复制

import produce from 'immer'
import { COUNT_CHANGE, GET_ARTICLE_LIST } from '../actions'

const initState = {
  count: 1,
  list: []
}

export default function reducer(state=initState, {type,payload}) {
  // console.log('收到了一个信号', type, payload)

  return produce(state, state=>{
    switch (type) {
      case 'add':
        state.count++
        break
      case 'sub':
        state.count--
        break
      case COUNT_CHANGE:
        state.count += payload
        break
      case GET_ARTICLE_LIST:
        state.list = payload
        break
      default:
    }
  })
}
