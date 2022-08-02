import router from '@/router'
import store from '@/store'
// 全局前置路由守卫
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 如果有数据，则不需要再发请求
    if (!store.state.user.userId) {
      store.dispatch('user/getUserInfo')
    }
    // 获取用户信息

    // 1.登录
    // 是否进入登录页
    // 1.1 是 跳到首页
    // 1.2 不是 直接进入
    if (to.path === '/login') return next('/')
    next()
  } else {
    // 2.未登录
    // 访问的是否白名单（未登录也能访问的页面，比如注册页、404等）
    // 2.1 在白名单 放行
    // 2.2 不在白名单 （不登录不能访问），跳到登录页
    const isCludes = whiteList.includes(to.path)
    if (isCludes) return next()
    next('/login')
  }
})
