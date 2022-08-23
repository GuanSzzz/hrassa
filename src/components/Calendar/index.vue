<template>
  <div class="Calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="upDateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="currenyMonth" @change="upDateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate" >
      <template v-slot:dateCell="{ date }">
        <div>
          {{ date.getDate() }}
          <span  v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: 2022,
      currenyMonth: 8,
      currentDate: '',
      years: [2012, 2014, 1000]
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currenyMonth = date.getMonth() + 1
      this.currentDate = new Date()
      //   数组自动填充的方法
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    upDateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>
