<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px" :inline="true">
        <el-col :span="5">
          <el-input v-model="keyword" placeholder="关键字" clearable />
        </el-col>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column align="center" prop="tagName" label="名称" />
          <el-table-column align="center" prop="createTime" label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDate(scope.row.createTime, 'yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column></el-table>
      </el-main>
    </el-container>
    <el-aside width="40%" style="background-color: rgb(238, 241, 246)" />
  </el-container>
</template>

<script>
import { getList, deleteTag } from '@/api/tag'

import { formatDate } from '@/utils/formatDate'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatDate(value) {
      return formatDate(value, 'yyyy-MM-dd')
    }
  },
  data() {
    return {
      keyword: '',
      tableData: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList().then(response => {
        this.tableData = response.data
      })
    },
    deleteTag(index, row) {

    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {
      deleteTag({
        tagIds: [row.tagId]
      }).then(response => {

      })
    }
  }
}
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>
