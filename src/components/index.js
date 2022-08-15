import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'

// 如果组件很多 可以利用数组的方法
const components = [PageTools,UploadExcel,UploadImg]
export default {
  install(Vue) {
    // Vue.component('PageTools', PageTools)
    // 循环遍历绑定组件
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
