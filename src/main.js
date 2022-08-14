import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 引入自定义指令文件夹（下面注册）
import * as directives from '@/directives'
// 引入自定义组件（里面注册）
import pageTools from '@/components'
Vue.use(pageTools)
// 引入自定义过滤器（下面注册）
import * as filters from '@/filters'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 模拟假数据的接口
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 开发环境的提示
Vue.config.productionTip = false

// 统一注册自定义指令，判断图片是否有，没有自动补全
// 参数1：自定义指令的名字 这里不需要加V-，但是在使用的时候要加
// 参数2：是配置对象
// 因为引入的文件夹是一个对象，可以循环遍历绑定自定义事件
for (let key in directives) {
  Vue.directive(key, directives[key])
}

// 统一注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
