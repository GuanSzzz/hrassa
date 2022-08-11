import PageTools from './PageTools'

// 如果组件很多 可以利用数组的方法
const components = [PageTools]
export default {
  install(Vue) {
    // Vue.component('PageTools', PageTools)
    // 循环遍历绑定组件
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
