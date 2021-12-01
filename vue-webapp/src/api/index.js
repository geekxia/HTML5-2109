import request from '@/utils/request'

// 在vue项目中，事实上并不是所有接口都需要走Vuex。

export function fetchGoodList(params) {
  return request({
    url: '/good/list',
    method: 'GET',
    params
  })
}

export function fetchAllCate(params) {
  return request({
    url: '/good/cate',
    method: 'GET',
    params
  })
}

export function fetchGoodInfo(params) {
  return request({
    url: '/good/info',
    method: 'GET',
    params
  })
}

export function fetchRegist(data) {
  return request({
    url: '/user/regist',
    method: 'POST',
    data
  })
}

export function fetchLogin(data) {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function fetchCartAdd(data) {
  return request({
    url: '/cart/add',
    method: 'POST',
    data
  })
}

export function fetchCartList(params) {
  return request({
    url: '/cart/list',
    method: 'GET',
    params
  })
}

export const fetchCartDel = params => request({url:'/cart/del', params})
export const fetchCartUpd = params => request({url:'/cart/upd', params})
export const fetchCartSub = data => request({url:'/cart/submit', method:'POST', data})

// 统一导出的目的是，方便放在原型链上
export default {
  fetchGoodList,
  fetchAllCate,
  fetchGoodInfo,
  fetchRegist,
  fetchLogin,
  fetchCartAdd,
  fetchCartList,
  fetchCartDel,
  fetchCartUpd,
  fetchCartSub
}
