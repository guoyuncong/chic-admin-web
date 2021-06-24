<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px" :inline="true">
        <el-col :span="5">
          <el-input v-model="keyword" placeholder="关键字" clearable />
        </el-col>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="tagName" label="姓名" width="120" />
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">
              移除
            </el-button>
          </template>
        </el-table>
      </el-main>
    </el-container>
    <el-aside width="40%" style="background-color: rgb(238, 241, 246)" />
  </el-container>
</template>

<script>
import { getList } from '@/api/tag'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      keyword: '',
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.tableData = response.data
        console.log(this.tableData)
        this.listLoading = false
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
