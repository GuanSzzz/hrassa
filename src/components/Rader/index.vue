<template>
  <div ref="main" class="rader"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.init()
  },

  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)

      const option = {
        // 背景色
        backgroundColor: '#6fb3ef',
        title: {
          text: '员工绩效表',
          left: 'leftr',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          data: ['zs', 'ls']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 }
          ],
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4']
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [42, 30, 20, 35, 50, 18],
                name: 'zs',
                itemStyle: {
                  color: '#ffe434'
                }
              },
              {
                value: [50, 14, 28, 26, 42, 21],
                name: 'ls',
                itemStyle: {
                  color: '#ff917c'
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.rader {
  width: 500px;
  height: 500px;
}
</style>
