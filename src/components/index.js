import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

// 如果组件很多 可以利用数组的方法
const components = [PageTools,UploadExcel]
export default {
  install(Vue) {
    // Vue.component('PageTools', PageTools)
    // 循环遍历绑定组件
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
