<template>
  <!-- 弹框：添加/更新标签-->
  <el-dialog :visible.sync="uploadVisible" width="40%" @close="close">
    <div class="upload-container">
      <el-upload
        class="upload-demo"
        accept="image/jpeg,image/gif,image/png"
        drag
        action="/api/system/attachment/upload"
        :before-upload="onBeforeUpload"
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'AddEditDialog',
  props: {
    // 可见标识
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadVisible: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.uploadVisible = val
      }
    }
  },
  methods: {
    // 弹框关闭
    close() {
      this.uploadVisible = false
      this.$emit('update:visible', this.uploadVisible)
    },
    // 上传文件之前
    onBeforeUpload(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    }
  }
}
</script>

<style scoped>
</style>
