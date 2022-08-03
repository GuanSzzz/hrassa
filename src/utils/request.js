import { Message } from 'element-ui'
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 引入token时间戳
import { getTokenTime } from '@/utils/auth'

// 封装判断是否过期的函数
const isTimeOut = () => {
  // 判断是否过期
  // 过期，跳到登录页
  // 没过期，携带
  const tokenTime = getTokenTime()
  const currentTime = Date.now()
  // 自定义有效时间
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}
const service = axios.create({
  // 根据不同的环境，请求不同的接口，根据启动服务器指令判断
  // 开发环境
  // 生产环境
  // 测试环境
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      // 过期，退出，清除token
      await store.dispatch('user/logout')
      router.push('login')
      return Promise.reject(new Error('登录过期'))
    }
    // 没过期，携带
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
  async (error) => {
    // 响应错误时，提示汉字
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
