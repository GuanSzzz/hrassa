import PageTools from '@/components/PageTools'
import MyTest from '@/components/MyTest'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from '@/components/Calendar'
import Fullscreen from '@/components/FullScreen'
import ToggleLang from '@/components/ToggleLang'
const components = [
  PageTools,
  MyTest,
  UploadExcel,
  UploadImg,
  Calendar,
  Fullscreen,
  ToggleLang
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
