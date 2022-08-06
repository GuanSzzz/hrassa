<template>
  <el-dialog
    :title="titleChoose"
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
import {
  getDeptsApi,
  addDeptApi,
  getDeptByIdApi,
  getEditDeptApi
} from '@/api/department'
import { getEmployessApi } from '@/api/employess'
export default {
  data() {
    // 将校验部门名字的函数抽离，全都写在data里
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        // 编辑状态  名字可以跟自己相同 不能跟同级相同
        const { depts } = await getDeptsApi()
        const filterDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && this.formData.id !== item.id
        )
        const isRepeat = filterDepts.some((item) => item.name === value)

        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        // 如果没有儿子，随便添加
        if (!this.currentNode.children) return callback()
        // 需要拿到同级部门比较，是否有重复
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        )
        // 如果重复，提示，不重复，通过
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    // 将校验部门编码的函数抽离，全都写在data里
    const checkDeptCode = async (rule, value, callback) => {
      // 需要拿到同级部门比较，是否有重复
      const { depts } = await getDeptsApi()
      let isRepeat
      // 判断 是编辑状态 还是添加状态
      // 编辑状态，编码可以跟自己一样
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

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

  computed: {
    titleChoose() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  },

  methods: {
    // 获取部门负责人列表
    async getEmployessApi() {
      const res = await getEmployessApi()
      // console.log(res)
      this.employess = res
    },
    // 点击关闭
    onClose() {
      this.$emit('update:dialogVisible', false)
      // 关闭的时候，校验规则重置，组件自带
      this.$refs.form.resetFields()
      // 清空formData，让添加部门没有残留数据
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 点击确定
    async onSave() {
      try {
        // 点击确定，根据id判断是 编辑状态，还是添加状态
        if (this.formData.id) {
          // 编辑
          await getEditDeptApi(this.formData)
          // console.log('编辑')
          this.$message.success('修改成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          // 新加
          await this.$refs.form.validate()
          this.formData.pid = this.currentNode.id
          await addDeptApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByIdApi(id)
    }
  }
}
</script>

<style scoped></style>
