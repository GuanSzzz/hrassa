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
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="allocation(row.id)"
                  >分配权限</el-button
                >
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
        <el-tab-pane label="配置管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="warning"
            show-icon
            :closable="false"
          >
          </el-alert>

          <!-- 表单 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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

    <!-- 角色分配弹层 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      destroy-on-close
      @close="roleOnclose"
    >
      <el-tree
        :data="permission"
        :props="{ label: 'name' }"
        node-key="id"
        default-expand-all
        show-checkbox
        :default-checked-keys="defaultExpandKeys"
        ref="perTree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi, getRoleInfo, assignPerm } from '@/api/role'
import { getCompanyApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { changeTree } from '@/utils'
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
        description: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      companyInfo: {},
      setRightDialog: false,
      permission: [],
      // 树形默认勾选节点
      defaultExpandKeys: [],
      roleId: ''
    }
  },

  created() {
    // 获取角色列表
    this.getRoles()
    this.getCompany()
    this.getPermissionList()
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
    },
    async getCompany() {
      const res = await getCompanyApi(this.$store.state.user.userInfo.companyId)
      // console.log(res)
      this.companyInfo = res
    },
    // 分配权限弹框 确认
    async allocation(id) {
      this.roleId = id
      this.setRightDialog = true
      const res = await getRoleInfo(id)
      // console.log(res)
      this.defaultExpandKeys = res.permIds
    },
    // 获取权限列表
    async getPermissionList() {
      const res = await getPermissionList()
      const changetree = changeTree(res, '0')
      this.permission = changetree
      // console.log(this.permission)
    },
    // 关闭角色分配弹窗
    roleOnclose() {
      // 关闭时清空树形节点的选中
      this.defaultExpandKeys = []
    },
    // 点击角色分配弹窗的确认按钮
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.setRightDialog = false
    }
  }
}
</script>

<style scoped lang="less"></style>
