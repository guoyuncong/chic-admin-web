<template>
  <div>
    <!-- 弹框：添加分类-->
    <el-dialog :title="dialogType ==='add' ? '新增分类': '编辑分类'" :visible.sync="addEditVisible" width="30%" @close="close">
      <el-form ref="form">
        <el-form-item v-if="dialogType ==='add'" label="父级分类" label-width="100px" prop="parentCategoryName">
          <el-input v-model="formData.categoryName" size="small" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="名称" label-width="100px" prop="categoryName">
          <el-input v-model="categoryName" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="100px" prop="alias">
          <el-input v-model="formData.alias" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="100px" prop="description">
          <el-input v-model="formData.description" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="封面图" label-width="100px" prop="thumbnail">
          <el-input v-model="formData.thumbnail" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" label-width="100px" prop="sort">
          <el-select v-model="formData.sort" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="handleAddEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory, updateCategory } from '@/api/category'

export default {
  name: 'AddEditDialog',
  props: {
    // 新增/编辑可见标识
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
      // 新增/更新分类弹框标识
      addEditVisible: false,
      // 自身数据
      categoryName: '',
      // 父组件中数据
      formData: {
        categoryId: '',
        categoryName: '',
        alias: '',
        description: '',
        thumbnail: '',
        sort: null
      },
      // 下拉选择排序框
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.addEditVisible = val
        if (val && this.dialogType === 'add') {
          this.formData = JSON.parse(JSON.stringify(this.rowInfo))
        }
        if (val && this.dialogType === 'edit') {
          this.formData = JSON.parse(JSON.stringify(this.rowInfo))
          this.categoryName = this.formData.categoryName
        }
      }
    }
  },
  methods: {
    // 弹框关闭
    close() {
      this.addEditVisible = false
      this.formData = this.$options.data.call(this).formData
      this.$refs.form.resetFields()
      this.$emit('update:visible', this.addEditVisible)
      this.$emit('reload')
    },
    // 新增/编辑分类
    handleAddEdit() {
      if (this.dialogType === 'add') {
        addCategory({
          parentId: this.formData.categoryId,
          categoryName: this.categoryName,
          alias: this.formData.alias,
          description: this.formData.description,
          thumbnail: this.formData.thumbnail,
          sort: this.formData.sort
        }).then(() => {
          this.close()
        })
      } else {
        console.log(this.formData)
        updateCategory({
          categoryId: this.formData.categoryId,
          categoryName: this.categoryName,
          alias: this.formData.alias,
          sort: this.formData.sort,
          thumbnail: this.formData.thumbnail,
          description: this.formData.description
        }).then(() => {
          this.close()
        })
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
  font-family: Times New Roman, 楷体, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}
</style>

