<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="dashboard-container">
        <div class="app-container">
          <el-card>
            <el-tabs @tab-click="changeTabs" v-model="activeName">
              <el-tab-pane name="login" label="登录账户设置">
                <!-- 放置表单 -->
                <el-form
                  label-width="120px"
                  style="margin-left: 120px; margin-top: 30px"
                >
                  <el-form-item label="姓名:">
                    <el-input
                      style="width: 300px"
                      v-model="formData.username"
                    />
                  </el-form-item>
                  <el-form-item label="密码:">
                    <el-input
                      style="width: 300px"
                      type="password"
                      v-model="formData.password"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="upDateDerail"
                      >更新</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane name="user" label="个人详情">
                <userInfo></userInfo>
              </el-tab-pane>
              <el-tab-pane name="job" label="岗位信息">
                <jobInfo></jobInfo>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserImg, saveUserDetailById } from '@/api/user'
import userInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
import jobInfo from './components/job-info.vue'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('tabName') || 'user'
    }
  },

  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserImg(this.$route.params.id)
      this.formData = res
    },
    async upDateDerail() {
      await saveUserDetailById(this.formData)
      this.$message.success('更新成功')
      this.$router.go(-1)
    },
    changeTabs() {
      Cookies.set('tabName', this.activeName)
    }
  },
  components: {
    userInfo,
    jobInfo
  }
}
</script>

<style scoped></style>
