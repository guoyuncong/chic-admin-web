<template>
  <div>
    <!-- 弹框：添加分类-->
    <el-dialog title="新增分类" :visible.sync="addCategoryVisible" width="30%" @close="close">
      <el-form ref="form">
        <el-form-item label="父级分类" label-width="100px">
          <el-input v-model="formData.categoryName" size="small" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="categoryName" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="100px">
          <el-input v-model="alias" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="100px">
          <el-input v-model="description" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" label-width="100px">
          <el-select v-model="sort" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框：更新分类-->
    <el-dialog title="编辑分类" :visible.sync="editCategoryVisible" width="30%" @close="close">
      <el-form ref="form">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="formData.categoryName" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="100px">
          <el-input v-model="formData.alias" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="100px">
          <el-input v-model="formData.description" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" label-width="100px">
          <el-select v-model="formData.sort" placeholder="请选择">
            <el-option v-for="item in options" :key="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory, updateCategory } from '@/api/category'

export default {
  name: 'AddEditDialog',
  props: {
    // 新增可见标识
    addVisible: {
      type: Boolean,
      default: false
    },
    // 编辑标识
    editVisible: {
      type: Boolean,
      default: false
    },
    // 表格行数据
    rowInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 新增分类弹框标识
      addCategoryVisible: false,
      // 更新分类弹框标识
      editCategoryVisible: false,
      // 自身数据
      categoryName: '',
      alias: '',
      description: '',
      sort: '',
      // 父组件中数据
      formData: {
        categoryId: '',
        categoryName: '',
        alias: '',
        description: '',
        sort: null
      },
      // 下拉选择排序框
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  watch: {
    addVisible: {
      handler(val) {
        this.addCategoryVisible = val
        this.formData = JSON.parse(JSON.stringify(this.rowInfo))
      }
    },
    editVisible: {
      handler(val) {
        this.editCategoryVisible = val
        this.formData = JSON.parse(JSON.stringify(this.rowInfo))
      }
    }
  },
  methods: {
    // 弹框关闭
    close() {
      this.$refs.form.resetFields()
      this.addVisible = false
      this.editVisible = false
      this.formData = this.$options.data.call(this).formData
      this.$emit('update:addVisible', this.addVisible)
      this.$emit('update:editVisible', this.editVisible)
    },
    // 新增分类
    handleAdd() {
      addCategory({
        parentId: this.formData.categoryId,
        categoryName: this.categoryName,
        alias: this.alias,
        description: this.description,
        sort: this.sort
      }).then(() => {
        this.$refs.form.resetFields()
        this.addVisible = false
        this.$emit('update:addVisible', this.addVisible)
        this.$emit('reload')
      })
    },
    // 编辑分类
    handleEdit() {
      updateCategory({
        categoryId: this.formData.categoryId,
        categoryName: this.formData.categoryName,
        alias: this.alias,
        sort: this.formData.sort,
        description: this.formData.description
      }).then(() => {
        this.editVisible = false
        this.$emit('update:updateVisible', this.editVisible)
        this.$emit('reload')
      })
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

