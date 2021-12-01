// 理解：一个type就是一个功能（信号）
// 为什么要把type封装在一个文件中？目的是避免协同开发时type信号冲突。

import {
  fetchArticleList,
  fetchGoodList,
  fetchAllCate,
  fetchGoodUpdate,
  fetchGoodInfo,
  fetchLogin,
  fetchUserInfo
} from '@/api'

export const COUNT_CHANGE = 'COUNT_CHANGE'
export const NUM_CHANGE = 'NUM_CHANGE'
export const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST'

export const GET_GOOD_LIST = 'GET_GOOD_LIST'
export const GET_ALL_CATE = 'GET_ALL_CATE'
export const ADD_OR_EDIT_GOOD = 'ADD_OR_EDIT_GOOD'
export const RESET_GOOD_DONE = 'RESET_GOOD_DONE'
export const GET_GOOD_INFO = 'GET_GOOD_INFO'

export const USER_LOGIN = 'USER_LOGIN'
export const GET_USER_INFO = 'GET_USER_INFO'
export const RESET_USER = 'RESET_USER'

// =================================================

// 功能：让count自增
export function changeCount(payload) {
  return { type: COUNT_CHANGE, payload }
}

// 功能：调接口获取文章列表
export function getArticleList(params) {
  // return这个函数为什么有dispatch？谁给的？redux-thunk这个中间件给的。
  return function (dispatch) {
    fetchArticleList(params).then(res=>{
      // 向redux发一个信号，并把文章列表的数据给到redux
      dispatch({type: GET_ARTICLE_LIST, payload: res})
    })
  }
}


// ==================================================

export function getGoodList(params) {
  return dispatch => {
    fetchGoodList(params||{}).then(res=>{
      console.log('商品列表', res)
      // 派发到redux
      dispatch({type: GET_GOOD_LIST, payload: res})
    })
  }
}

export function getAllCate(params) {
  return dispatch => {
    fetchAllCate(params||{}).then(res=>{
      console.log('品类列表', res)
      // 派发到redux
      dispatch({type: GET_ALL_CATE, payload: res.list})
    })
  }
}

export function postGood(data) {
  return dispatch => {
    fetchGoodUpdate(data).then(res=>{
      console.log('商品添加或编辑成功', res)
      // 派发到redux
      dispatch({type: ADD_OR_EDIT_GOOD, payload: res})
    })
  }
}

export function resetDone(payload) {
  return { type: RESET_GOOD_DONE, payload }
}

export function getGoodInfo(params) {
  return dispatch => {
    fetchGoodInfo(params).then(res=>{
      console.log('商品详情', res)
      // 派发到redux
      dispatch({type: GET_GOOD_INFO, payload: res.info})
    })
  }
}

// 用于获取用户完整信息
// 思考：这个action在哪些地方会用到？在登录流程中用得到，在刷新流程中也用得到。
export function getUserInfo(params) {
  return dispatch => {
    fetchUserInfo(params).then(res=>{
      console.log('用户完整信息', res)
      if (res.data && res.data.err===-1) {
        // 本来我们想在axion拦截器中来清除用户信息，但axios中无法导入store，没有办法使用dispatch
        // 所以在这里实现这个“清除用户信息”的功能
        dispatch({type: RESET_USER, payload: {}})
      } else {
        dispatch({type: GET_USER_INFO, payload: res})
      }
    })
  }
}

export function login(data) {
  return dispatch => {
    fetchLogin(data).then(res=>{
      console.log('登录接口调用成功', res)
      // 把token放进状态管理中
      dispatch({type: USER_LOGIN, payload: res.token})
      localStorage.setItem('token', res.token)
    })
  }
}

// 重置用户信息（退出登录时可以使用、当token无效时使用它进行重置）
export function resetUser(payload) {
  return { type: RESET_USER, payload }
}
