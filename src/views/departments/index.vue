<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
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
            ></TreeTools>
          </template>
          <!-- 内部组件 -->
          <!-- <template>
            <slot :node=""  :data=""/>
          </template> -->
        </el-tree>
      </el-card>

      <!-- 添加部门弹窗 -->
      <AddDept
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
      const res = await getDeptsApi()
      console.log(res)
      this.departs = changeTree(res.depts, '')
    },
    addDept(val) {
      this.isVisible = true
      this.currentNode = val
    }
  },
  components: {
    TreeTools,
    AddDept
  }
}
</script>

<style scoped lang="less"></style>
