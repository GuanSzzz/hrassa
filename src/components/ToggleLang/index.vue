<template>
  <el-dropdown @command="changeLang">
    <span class="el-dropdown-link">
      语言<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key, index) in messages"
        :key="index"
        :command="key"
        :disabled="key == $i18n.locale"
        >{{ value.name }}</el-dropdown-item
      >
      <!-- <el-dropdown-item command="en">英</el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    changeLang(val) {
      this.$root.$i18n.locale = val
      this.$router.go(0)
      Cookie.set('lang', val)
    }
  }
}
</script>

<style scoped></style>
