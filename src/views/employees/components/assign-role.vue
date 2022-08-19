<template>
  <div>
    <el-dialog
      title="角色分配"
      :visible="visible"
      @close="onClose"
      @open="onOpen"
      center
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          :label="item.id"
          name="type"
          v-for="item in roles"
          :key="item.id"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="getassignRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserImg } from '@/api/user'
import { assignRoles } from '@/api/employess'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getRoles() {
      const { rows } = await getRolesApi()

      this.roles = rows
    },
    onOpen() {
      this.getRoles()
      this.getUserImgDetail()
    },
    //   获取员工详细列表
    async getUserImgDetail() {
      const { roleIds } = await getUserImg(this.employeesId)
      this.checkList = roleIds
    },
    // 修改员工角色
    async getassignRoles() {
      if (!this.checkList.length) return this.$message.error('请选择员工角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('更新成功')
      this.onClose()
    }
  }
}
</script>

<style scoped></style>
