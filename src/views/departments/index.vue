<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
        <!-- 树形 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <!-- <template v-slot="scoped"> -->
            <TreeTools :treeNode="data"></TreeTools>
            <!-- <TreeTools :treeNode="scoped.data"></TreeTools> -->
          </template>

          <!-- 内部组件 -->
          <!-- <template>
            <slot :node=""  :data=""/>
          </template> -->
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/department'
import { changeTree } from '@/utils'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: { name: '传智教育', manage: '负责人' }
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
    }
  },
  components: {
    TreeTools
  }
}
</script>

<style scoped lang="less"></style>
