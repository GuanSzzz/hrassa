<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <!-- 默认图片  用require引入，不用再导入 -->
              <img
                :src="row.staffPhoto"
                alt=""
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <!-- 本来是v-model,但是不需要@input事件，可以直接使用:value  -->
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>

    <!-- 新增员工组件 -->
    <addEmployees
      :visible.sync="isVisible"
      @add-success="getEmployessList"
    ></addEmployees>
  </div>
</template>

<script>
import { getEmployessInfoApi, delEmployee } from '@/api/employess'
import employees from '@/constant/employees'
import addEmployees from './components/add-employees.vue'
const { exportExcelMapPath } = employees
export default {
  data() {
    return {
      employees: [],
      pages: {
        page: 1,
        size: 10
      },
      total: 0,
      isVisible: false
    }
  },

  created() {
    this.getEmployessList()
  },

  methods: {
    async getEmployessList() {
      const { rows, total } = await getEmployessInfoApi(this.pages)
      this.employees = rows
      this.total = total
      // console.log(this.employees)
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployessList()
    },
    // 表格自带方法，取到相对单元格的数据，可以直接处理
    formatterEmployment(row, column, cellValue, index) {
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '为知'
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除按钮
    async onRemove(id) {
      await this.$confirm('是否删除该员工')
      await delEmployee(id)
      this.$message.success('删除成功')
      this.getEmployessList()
    },
    showAdd() {
      this.isVisible = true
    },
    // 导出excel
    async exportExcel() {
      const { rows } = await getEmployessInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = employees.hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })

      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header, //表头 必填
          data, //具体数据 必填
          filename: 'excel-list', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx' //非必填
        })
      })
    }
  },
  components: {
    addEmployees
  }
}
</script>

<style scoped lang="less"></style>
