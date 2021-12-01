// 3个3
// 三个API：createStore()/combineReducers()/applyMiddleware()
// store的三个特点：只读的，单一数据源，要修改store必须使用reducer函数。
// 三个概念：store、reducer、action

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
// redux默认不支持直接的异步数据流，我们要使用redux-thunk这个中间件来解决异步问题。
// redux-thunk
// redux-saga
// redux-log
// redux-promise
// ……

import study from './modules/study'
import good from './modules/good'
import user from './modules/user'

export default createStore(
  // 对多个子reducer进行合并
  combineReducers({
    study, good, user
  }),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)
