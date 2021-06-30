<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px" :inline="true">
        <el-col :span="5">
          <el-input v-model="pageQuery.keyword" clearable />
        </el-col>
        <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column align="center" label="分类名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>{{ scope.row.description }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.categoryName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="alias" label="别名" />
          <el-table-column align="center" prop="createTime" label="创建时间">
            <template slot-scope="scope">
              <span v-if="scope.row.createTime != null">{{ scope.row.createTime | formatDate(scope.row.createTime, 'yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editDialog(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination v-show="total>0" :total="total" :current.sync="pageQuery.current" :size.sync="pageQuery.size" :keyword.sync="pageQuery.keyword" @pagination="fetchData" />
      </el-main>
    </el-container>
    <el-aside style="width: 30%; font-size: 18px;">
      <TreeCategory />
    </el-aside>
    <!-- 新增/编辑标签 -->
    <addEditDialog :visible.sync="addEditVisible" :dialog-type="dialogType" :row-info="rowInfo" @reload="fetchData" />
  </el-container>
</template>

<script>
import { pageCategory } from '@/api/category'
import { formatDate } from '@/utils/formatDate'
import Pagination from '@/components/Pagination'
import addEditDialog from '@/components/Category/AddEditDialog'
import TreeCategory from '@/components/Category/TreeCategory'

export default {
  name: 'ArticleList',
  components: {
    Pagination,
    addEditDialog,
    TreeCategory
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
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
      // 页面显示数据
      tableData: null,
      // 添加/编辑标签弹框标识
      addEditVisible: false,
      dialogType: 'add',
      // 行数据
      rowInfo: {},
      // 搜索/分页关键字
      pageQuery: {
        keyword: '',
        current: 1,
        size: 10
      },
      // 总条数
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 添加分类弹框控制
    addDialog() {
      this.dialogType = 'add'
      this.addEditVisible = true
    },
    // 编辑分类弹窗控制
    editDialog(row) {
      this.dialogType = 'edit'
      this.addEditVisible = true
      this.rowInfo = row
    },
    // 分类列表
    fetchData() {
      pageCategory(this.pageQuery).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    // 点击搜索，重置页码为 1
    searchData() {
      this.pageQuery.current = 1
      pageCategory(this.pageQuery).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    handleDelete(index, row) {

    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  width:  30%
}
.svg-container {
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  display: inline-block;
  margin-right: 10px;
}
.searchBtn {
  margin-left: 10px;
}
</style>
