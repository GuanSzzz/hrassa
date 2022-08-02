import { getUserInfo, login, getUserImg } from '@/api/user'

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
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfo()
      // 获取用户头像
      const res1 = await getUserImg(res.userId)
      context.commit('setUserInfo', { ...res, ...res1 })
    }
  }
}
