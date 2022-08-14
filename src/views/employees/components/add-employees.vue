<template>
  <el-dialog title="提示" @close="onClose" :visible="visible" width="50%">
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.value"
            :label="item.value"
            :value="item.id"
          >
          </el-option
        ></el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          v-model="formData.departmentName"
          @focus="getDepts"
          placeholder="请选择"
          ref="treeSelect"
        >
          <el-option value="" v-loading="treeLoading" class="treeOption">
            <el-tree
              :data="depts"
              :props="TreeProps"
              @node-click="treeNodeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employees from '@/constant/employees'
const { hireType } = employees
import { getDeptsApi } from '@/api/department'
import { changeTree } from '@/utils'
import { addEmployee } from '@/api/employess'
export default {
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      hireType,
      depts: [],
      TreeProps: {
        label: 'name'
      },
      treeLoading: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
      // 清空
      this.$refs.form.resetFields()
    },
    // 获取部门列表
    async getDepts() {
      this.treeLoading = true
      const { depts } = await getDeptsApi()
      this.treeLoading = false
      changeTree(depts, '')
      this.depts = depts
    },
    // 树形选择节点
    treeNodeClick(val) {
      this.formData.departmentName = val.name
      //   组件自带的选择完，隐藏下拉框
      this.$refs.treeSelect.blur()
    },
    onSave() {
      // 点击确定 表单校验
      this.$refs.form.validate(async (valib) => {
        if (!valib) return
        console.log('发发')
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        // 触发父组件的函数 刷新列表
        this.$emit('add-success')
        this.onClose()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}

.treeOption {
  height: 100px;
}
</style>
