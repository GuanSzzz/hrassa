<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importmapKeyPath } = employees
import { importEmployee } from '@/api/employess'
import { formatTime } from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importmapKeyPath) {
          // 处理excel时间
          if (key === '入职日期' || key === '转正日期') {
            // 先拿到数据里的时间项
            const timestamp = item[key]
            // excel的时间戳与js里不同  以天为单位，多一天，而且多了70年，要减去
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importmapKeyPath[key]] = formatTime(date)
          } else {
            obj[importmapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      // console.log(newArr)
      await importEmployee(newArr)
      this.$message.success('上传成功')
      this.$router.go('-1')
    }
  }
}
</script>

<style scoped></style>
