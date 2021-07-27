<template>
  <el-drawer
    title="附件详情"
    direction="rtl"
    :visible.sync="editVisible"
    :before-close="handleClose"
  >
    <div class="post-drawer__content">
      <el-form ref="form" :model="formData" />
    </div>
  </el-drawer>
</template>

<script>
import { detailAttachment } from '@/api/attachment'

export default {
  name: 'EditDialog',
  props: {
    // 新增/编辑可见标识
    visible: {
      type: Boolean,
      default: false
    },
    // 表格行数据
    attachmentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 编辑弹框标识
      editVisible: false,
      // 数据
      formData: {
        attachmentId: '',
        attachmentName: '',
        mediaType: '',
        path: '',
        size: null,
        height: null,
        width: null,
        type: ''
      }
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.editVisible = val
        this.detail(this.attachmentId)
      }
    }
  },
  created() {

  },
  methods: {
    // 关闭抽屉
    handleClose() {
      this.editVisible = false
      this.$refs.form.resetFields()
      this.$emit('update:visible', this.editVisible)
    },
    // 取消按钮
    cancelForm() {
      this.editVisible = false
      this.$refs.form.resetFields()
      this.$emit('update:visible', this.editVisible)
    },
    // 文章详情
    detail(attachmentId) {
      detailAttachment({
        attachmentId: attachmentId
      }).then(response => {
        this.formData = response.data
        console.log(this.formData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep :focus{
    outline: 0;
}
.treeCategory {
  align-items: center;
  margin-top: 9px;
}
.post-drawer__content {
  margin-right: 10px;
}
.el-button {
  float: right;
  margin-left: 10px;
}
</style>
