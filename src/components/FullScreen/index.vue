<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onFullscreen"
      className="fullscreen"
      iconClass="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Fullscreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped>
.fullscreen {
  color: #fff;
}
</style>
