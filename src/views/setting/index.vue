<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addVisible = true">新增</el-button>

          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="warning">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              layout="sizes,prev, pager, next"
              :total="total"
              :page-size="pageSize"
              @size-change="handleSizeChange"
              @current-change="CurrentChange"
              :page-sizes="[3, 5, 10, 20]"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">公司信息</el-tab-pane>
      </el-tabs>
    </div>

    <!-- 对话题弹窗 -->
    <el-dialog
      title="新增角色"
      @close="closeDialog"
      :visible.sync="addVisible"
      width="50%"
    >
      <el-form
        :model="addRoleFrom"
        ref="form"
        label-width="80px"
        :rules="addRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRoleFrom.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
export default {
  data() {
    return {
      activeName: 'first',
      // 表格数据
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      // 弹框表单
      addVisible: false,
      addRoleFrom: {
        name: '',
        description: ''
      },
      addRules: {
        name: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        description: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },

  created() {
    // 获取角色列表
    this.getRoles()
  },

  methods: {
    // 获取角色列表
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      // console.log(rows)
      this.tableData = rows
      this.total = total
    },
    CurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    // 点击关闭按钮
    onClose() {
      this.addVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      // console.log(111)
      await addRolesApi(this.addRoleFromForm)
      this.$message.success('添加成功')
      this.addVisible = false
      this.getRoles()
    },
    // 监听关闭对话框
    closeDialog() {
      this.$refs.form.resetFields()
      this.addRoleFrom = {
        name: '',
        description: ''
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
