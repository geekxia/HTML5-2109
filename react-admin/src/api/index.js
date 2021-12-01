import axios from '@/utils/axios'

// cnode的文章接口
export function fetchArticleList(params) {
  return axios({url:'/api/v1/topics',method:'GET',params})
}


// 商品列表
export function fetchGoodList(params) {
  return axios({url:'/apix/v1/getGoodList', method:'GET', params})
}

// 品类接口
export function fetchAllCate(params) {
  return axios({url:'/apix/v1/getAllCate', method:'GET', params})
}

// 新增或编辑商品
export function fetchGoodUpdate(data) {
  return axios({url:'/apix/v1/updateGood', method:'POST', data})
}

// 商品详情
export function fetchGoodInfo(params) {
  return axios({url:'/apix/v1/getGoodInfo', method:'GET', params})
}

// 登录
export function fetchLogin(data) {
  return axios({url:'/apix/v1/login', method:'POST', data})
}

// 获取用户信息
export function fetchUserInfo(params) {
  return axios({url:'/apix/v1/getUserInfo', method:'GET', params})
}
