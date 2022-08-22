// 混入组件，组件有的，他都可以有
import permissionPoints from '@/constant/permissionPoints'
export default {
  data() {
    return {
      points: permissionPoints
    }
  },
  methods: {
    isHas(val) {
      return this.$store.state.permission.points.includes(val)
    }
  }
}
