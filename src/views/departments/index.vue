<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <TreeTools
          :treeNode="company"
          :isRoot="true"
          @add="addDept"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <!-- <template v-slot="scoped"> -->
            <!-- <TreeTools :treeNode="scoped.data"></TreeTools> -->
            <TreeTools
              :treeNode="data"
              @remove="getDepts"
              @add="addDept"
              @edit="editDept"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>

      <!-- 添加部门弹窗 -->
      <AddDept
        ref="adddept"
        :dialogVisible.sync="isVisible"
        :currentNode="currentNode"
        @add-success="getDepts"
      ></AddDept>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { changeTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      loading: false,
      currentNode: {},
      defaultProps: {
        label: 'name'
      },
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: { name: '传智教育', manage: '负责人' },
      isVisible: false
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      this.loading = true
      const res = await getDeptsApi()
      console.log(res)
      this.departs = changeTree(res.depts, '')
      this.loading = false
    },
    addDept(val) {
      this.isVisible = true
      this.currentNode = val
    },
    editDept(val) {
      this.isVisible = true
      // 点击编辑按钮的时候，调用子组件的方法，触发请求，获取数据
      this.$refs.adddept.getDeptById(val.id)
    }
  },
  components: {
    TreeTools,
    AddDept
  }
}
</script>

<style scoped lang="less"></style>
