<template>
  <el-dialog
    title="添加部门"
    @close="onClose"
    :visible="dialogVisible"
    width="50%"
  >
    <!-- 表单区域 -->
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50个字符"></el-input>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50个字符"></el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择负责人"
          style="width: 100%"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employess"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="formData.introduce"
          placeholder="1-300个字符"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptApi } from '@/api/department'
import { getEmployessApi } from '@/api/employess'
export default {
  data() {
    // 将校验部门名字的函数抽离，全都写在data里
    const checkDeptName = (rule, value, callback) => {
      // 如果没有儿子，随便添加
      if (!this.currentNode.children) return callback()
      // 需要拿到同级部门比较，是否有重复
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      )
      // 如果重复，提示，不重复，通过
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    // 将校验部门编码的函数抽离，全都写在data里
    const checkDeptCode = async (rule, value, callback) => {
      // 需要拿到同级部门比较，是否有重复
      const { depts } = await getDeptsApi()
      const isRepeat = depts.some((item) => item.code === value)
      // 如果重复，提示，不重复，通过
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [{ required: true, message: '请输入内容', trigger: 'change' }],
        introduce: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      employess: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },

    currentNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployessApi()
  },

  methods: {
    // 获取部门负责人列表
    async getEmployessApi() {
      const res = await getEmployessApi()
      console.log(res)
      this.employess = res
    },
    // 点击关闭
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
    // 点击确定
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      try {
        await addDeptApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    }
  }
}
</script>

<style scoped></style>
