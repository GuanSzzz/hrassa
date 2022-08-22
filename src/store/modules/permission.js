import router, { asyncRoutes, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [], //我们自己维护的的路由规则，包括所有静态路由+用户所有的动态权限
    points: []
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filtrtRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        // 拿到用户权限信息，与所有的动态路由比较
        // 返回一个新数组，就是用户可以访问的路由权限
        return roles.menus.includes(item.meta.id)
      })
      //   给路由规则添加动态路由
      context.commit('setRoutes', routes)
      context.commit('setPoints', roles.points)

      // $router自己有一个可以添加路由的方法addRoute
      router.addRoutes([
        ...routes,
        // 404必须放在最后，否则刷新就会404
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
