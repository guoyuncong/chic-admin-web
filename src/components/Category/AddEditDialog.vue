<template>
  <!-- 弹框：添加/更新标签-->
  <el-dialog :title="dialogType ==='add' ? '新增分类': '编辑分类'" :visible.sync="addEditVisible" width="30%" @close="close">
    <el-form ref="form">
      <el-form-item label="分类名称" label-width="100px">
        <el-input v-model="formData.categoryName" size="small" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddEdit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTag, updateTag } from '@/api/category'

export default {
  name: 'AddEditDialog',
  props: {
    // 可见标识
    visible: {
      type: Boolean,
      default: false
    },
    // 表单类型：新增/编辑
    dialogType: {
      type: String,
      default: 'add'
    },
    // 表格行数据
    rowInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addEditVisible: false,
      formData: {
        tagId: '',
        tagName: ''
      }
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.addEditVisible = val
        if (val && this.dialogType === 'edit') {
          this.formData = JSON.parse(JSON.stringify(this.rowInfo))
        }
      }
    }
  },
  methods: {
    // 弹框关闭
    close() {
      this.$refs.form.resetFields()
      this.addEditVisible = false
      this.formData = this.$options.data.call(this).formData
      this.$emit('update:visible', this.addEditVisible)
    },
    // 标签新增/编辑
    handleAddEdit() {
      if (this.dialogType === 'add') {
        addTag({
          tagName: this.formData.tagName
        }).then(() => {
          this.addEditVisible = false
          this.$emit('reload')
        })
      } else {
        updateTag({
          tagId: this.formData.tagId,
          tagName: this.formData.tagName
        }).then(() => {
          this.addEditVisible = false
          this.$emit('reload')
        })
      }
    }
  }
}
</script>
