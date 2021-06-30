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
          <svg-icon class="plusIcon" icon-class="plus" @click="addCategory(data)" />
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { treeCategory } from '@/api/category'

export default {
  name: 'TreeCategory',
  data() {
    return {
      tableData: null,
      defaultProps: {
        children: 'child',
        label: 'categoryName'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 分类树结构
    fetchData() {
      treeCategory().then(response => {
        this.tableData = response.data
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
