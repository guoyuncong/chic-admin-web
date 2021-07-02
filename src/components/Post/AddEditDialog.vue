<template>
  <el-drawer
    :title="dialogType ==='add' ? '新增标签': '编辑标签'"
    :visible.sync="addEditVisible"
    :direction="direction"
  >
    <span>我来啦!</span>
  </el-drawer>
</template>

<script>
export default {
  name: 'AddEditDialog',
  props: {
    // 新增/编辑可见标识
    visable: {
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
      default: () => { }
    }
  },
  data() {
    return {
      addEditVisible: false,
      direction: 'rtl'
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.addEditVisible = val
        this.formData = JSON.parse(JSON.stringify(this.rowInfo))
      }
    }
  }
}
</script>

<style>
.el-form-item__label {
  font-size: 16px;
}
.el-input__inner {
  font-size: 16px;
  font-family: Times New Roman, 楷体, Helvetica Neue, Helvetica, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>
