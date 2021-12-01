import axios from 'axios'

// 给你数据的那台机器的地址（域名、IP地址）
// const baseURL = 'https://c.y.qq.com'  // 远程服务器
const baseURL = 'http://localhost:8001'  // 本地node服务器
// const baseURL = 'http://m.3fengs.com'
const version = '/api/v1'

// 创建axios实例对象
const instance = axios.create({
  baseURL: baseURL + version,
  // 指定调接口的超时时间
  timeout: 5000,
  headers: {}
})

// 封装请求拦截器（在ajax被浏览器发送出去之前）
instance.interceptors.request.use(config => {
  // console.log('请求拦截器', config)
  // 一般在请求拦截器中添加鉴权字段token
  config.headers['Authorization'] = localStorage.getItem('token')

  return config
}, error => {
  return Promise.reject(error)
})

// 封装响应拦截器（在后端响应数据回到浏览器的时候）
instance.interceptors.response.use(response => {
  // console.log('响应拦截器', response)
  // 一般在这里统一劫持HTTP错误（主要针对4XX/5XX）弹框提示用户错在哪里
  // 还会在这里做数据过滤。
  if(response.status === 200) {
    if(response.data && response.data.err===0) {
      // 真正的调接口成功
      return response.data.data
    } else if (response.data && response.data.err===-1) {
      // 先弹框提示用户token过期
      // 再跳转到登录页
      window.location.href = '#/login'
    }
    return response
  }else{
    alert('网络异常，稍后再试')
  }
}, error => {
  return Promise.reject(error)
})

export default instance
