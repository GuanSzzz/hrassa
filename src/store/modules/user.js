import { getUserInfo, login, getUserImg } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
// 引入重置路由
import { resetRouter } from '@/router'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    // 设置token
    setToken(state, payload) {
      state.token = payload
    },
    // 设置用户信息
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    // 获取token
    async getToken(context, payload) {
      // 发送登录请求
      const res = await login(payload)
      // console.log(res)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo()
      // 获取用户头像
      const res1 = await getUserImg(res.userId)
      context.commit('setUserInfo', { ...res, ...res1 })
      // 处理动态路由
      // 通过return传递数据，返回一个promise
      return res
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      // 退出的时候 调用重置路由的函数  不然会继承上一个用户的数据
      resetRouter()
      // 退出的时候清空自己维护的路由规则
      // 跨模块修改数据
      // { root: true } context相当于全局的
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
