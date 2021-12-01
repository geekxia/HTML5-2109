import axios from 'axios'

const baseURL = 'http://localhost:8080'

const fetch = axios.create({
  baseURL,
  timeout: 7000,
  headers: {}
})

fetch.interceptors.request.use(config => {
  // 加token
  return config
}, error => {
  return Promise.reject(error)
})

fetch.interceptors.response.use(response => {
  // 数据过滤，统一拦截异常和错误
  if (response.status===200) {
    if (response.data && response.data.code === 0) {
      return response.data.data
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default fetch
