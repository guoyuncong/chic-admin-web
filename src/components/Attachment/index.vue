<template>
  <el-drawer
    title="附件详情"
    direction="rtl"
    :visible.sync="editVisible"
    :before-close="handleClose"
  >
    <div class="attachment-drawer__content">
      <el-form ref="form" :model="formData">
        <el-form-item label="附件名" label-width="100px" prop="title">
          <el-input v-model="formData.attachmentName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="附件类型" label-width="100px" prop="title">
          <el-input v-model="formData.mediaType" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="图片尺寸" label-width="100px" prop="title">
          <el-input v-model="formData.measure" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="附件大小" label-width="100px" prop="title">
          <el-input v-model="formData.size" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="上传日期" label-width="100px" prop="title">
          <el-input v-model="formData.createTime" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="普通链接" label-width="100px" prop="title">
          <el-input v-model="formData.path" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="Markdown" label-width="100px" prop="title">
          <el-input v-model="formData.markdown" autocomplete="off" :disabled="true" />
        </el-form-item>
      </el-form>
      <div class="attachment-drawer__footer">
        <el-button type="primary" @click="updateAttachment()">确定</el-button>
        <el-button type="danger" @click="deleteAttachment()">删除</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { detailAttachment, deleteAttachment } from '@/api/attachment'

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
        // 附件名称
        attachmentName: '',
        // 附件类型
        mediaType: '',
        // 附件路径
        path: '',
        // 附件大小
        size: 0,
        // 附件尺寸
        measure: '',
        // 上传日期
        createTime: '',
        // markdown 格式
        markdown: ''
      }
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.editVisible = val
        // 如果 visible 为 true，即打开抽屉，调用详情接口
        if (val) {
          this.detail(this.attachmentId)
        }
      }
    }
  },
  created() {

  },
  methods: {
    // 关闭抽屉
    handleClose() {
      this.editVisible = false
      this.$emit('update:visible', this.editVisible)
      this.$emit('reload')
    },
    // 附件详情
    detail(attachmentId) {
      detailAttachment({
        attachmentId
      }).then(response => {
        this.formData = response.data
        this.formData.measure = this.formData.height + ' * ' + this.formData.width
        this.formData.size = this.formData.size + ' KB'
        this.formData.markdown = '![' + this.formData.attachmentName + '](' + this.formData.path + ')'
      })
    },
    // 删除附件
    deleteAttachment(attachmentId) {
      this.$confirm('此操作将永久删除附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAttachment({
          attachmentId: this.formData.attachmentId
        }).then((response) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.handleClose()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep :focus{
    outline: 0;
}
.attachment-drawer__content {
  margin-right: 10px;
}
.el-button {
  float: right;
  margin-left: 10px;
}
</style>
