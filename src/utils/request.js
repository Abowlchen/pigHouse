import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080',
  timeout: 5000
})

request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // config ：本次请求的配置对象
  // config 里面有一个属性：headers
  const { getToken } = store.state
  if (getToken && getToken.token) {
    config.headers.authorization = getToken.token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
