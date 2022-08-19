<template>
  <div>
    <!-- 打印 -->
    <i
      class="el-icon-printer"
      @click="$router.push('/employees/print?type=job')"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
