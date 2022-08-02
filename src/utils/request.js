import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
const service = axios.create({
  // 根据不同的环境，请求不同的接口，根据启动服务器指令判断
  // 开发环境
  // 生产环境
  // 测试环境
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  // 请求成功函数
  (res) => {
    const { data, success, message } = res.data
    // 逻辑成功
    if (success) {
      return data
    }
    // 逻辑失败，给用户看
    Message.error(message)
    // 制造错误
    return Promise.reject(new Error(message))
  },
  // 请求失败函数
  (error) => {
    Message.error('服务器错误')
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
