<template>
  <div class="tree">
    <el-tree
      :data="tableData"
      :props="defaultProps"
      node-key="categoryId"
      default-expand-all
      :expand-on-click-node="false"
      draggable
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}</span>
        <span class="operate">
          <svg-icon class="plusIcon" icon-class="tree-plus" @click="addDialog(data)" />
          <svg-icon class="plusIcon" icon-class="tree-update" @click="editDialog(data)" />
          <svg-icon v-if="data.child.length === 0" class="plusIcon" icon-class="tree-delete" @click="handleDelete(data)" />
        </span>
      </span>
    </el-tree>
    <!-- 新增/编辑分类 -->
    <addEditDialog :add-visible.sync="addVisible" :edit-visible.sync="editVisible" :row-info="rowInfo" @reload="fetchData" />
  </div>
</template>

<script>
import { treeCategory, deleteCategory } from '@/api/category'
import addEditDialog from '@/components/Category/AddEditDialog'

export default {
  name: 'TreeCategory',
  components: {
    addEditDialog
  },
  data() {
    return {
      // 树形结构数据
      tableData: null,
      // 树形结构使用
      defaultProps: {
        children: 'child',
        label: 'categoryName'
      },
      // 添加分类弹框标识
      addVisible: false,
      // 添加分类弹框标识
      editVisible: false,
      // 行数据
      rowInfo: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 添加分类弹框控制
    addDialog(data) {
      this.addVisible = true
      this.editVisible = false
      this.rowInfo = data
    },
    // 编辑分类弹窗控制
    editDialog(data) {
      this.editVisible = true
      this.addVisible = false
      this.rowInfo = data
    },
    // 分类树结构
    fetchData() {
      this.$emit('reload')
      treeCategory().then(response => {
        this.tableData = response.data
      })
    },
    // 删除分类
    handleDelete(data) {
      this.$confirm('此操作将永久分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategory({
          categoryId: data.categoryId
        }).then(response => {
          this.$emit('reload')
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style scoped>
.plusIcon {
  font-size: 18px;
  margin-top:3px;
  margin-left: 10px;
}
</style>
