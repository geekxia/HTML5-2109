import axios from 'axios'

// const baseURL = '/api/v1'

const baseURL = 'http://localhost:3000'
// const baseURL = 'https://c.y.qq.com'

// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
})

// 封装请求拦截器
instance.interceptors.request.use(function (config) {
  // 加token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 封装响应拦截器
instance.interceptors.response.use(function (response) {
  let res = null
  // console.log('res ', response)
  // 对后端返回的数据，做统一拦截处理
  if(response.status===200) {
    res = response.data.data
  }else{
    alert('网络异常，稍后再试')
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
