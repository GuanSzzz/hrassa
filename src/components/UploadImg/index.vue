<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :file-list="fileList"
      :on-preview="pvwImg"
      :on-remove="removeImg"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-style"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDpSpvlMktmPr2xTy98ctzsWwCH8oIYhdJ',
  SecretKey: 'ShZhjX9UwBCxRhivseBTWKtDLCuNbaMt'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      loading: false
    }
  },

  created() {},

  methods: {
    // 上传
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'gszzz-1313341633' /* 桶名，必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /*文件名， 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            console.log(err)
            return this.$message.error('上传失败')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },

    onChange(file, filelist) {
      this.fileList = filelist
    },
    // 预览
    pvwImg(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除
    removeImg(file, filelist) {
      this.fileList = filelist
    },
    // 限制格式
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('图片格式' + types.join('、') + '格式')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超快1mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-style {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
