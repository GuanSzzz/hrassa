import { login } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async getToken(context, payload) {
      // 发送登录请求
      const res = await login(payload)
      // console.log(res)
      context.commit('setToken', res)
    }
  }
}
