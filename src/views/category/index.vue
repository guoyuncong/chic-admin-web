<template>
  <el-row :gutter="5">
    <el-col :span="9">
      <div class="category-aside">
        <tree-category @reload="fetchData" />
      </div>
    </el-col>
    <el-col :span="15">
      <div class="category-container">
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
                <el-table-column align="center" prop="categoryName" label="分类名称" />
                <el-table-column align="center" prop="alias" label="别名" />
                <el-table-column align="center" prop="description" label="描述" />
                <el-table-column align="center" prop="createTime" label="创建时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-main>
          </el-container>
        </el-container>
        <!-- 分页 -->
        <pagination v-show="total>0" :total="total" :current.sync="pageQuery.current" :size.sync="pageQuery.size" :keyword.sync="pageQuery.keyword" @pagination="fetchData" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { pageCategory } from '@/api/category'
import Pagination from '@/components/Pagination'
import TreeCategory from '@/components/Category/TreeCategory'

export default {
  name: 'Category',
  components: {
    Pagination,
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
    }
  },
  data() {
    return {
      // 页面显示数据
      tableData: null,
      // 搜索/分页关键字
      pageQuery: {
        keyword: '',
        categoryId: '',
        tagIds: [],
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
    }
  }
}
</script>

<style scoped>
.category-container {
 /* 上 右 下 左 */
  margin: 15px 0px 5px 20px;
  /*50 = navbar  */
  min-height: calc(100vh - 50px - 40px);
  background-color: white;
  border-radius: 10px;
}
.category-aside {
  /* 上 右 下 左 */
  margin: 15px 20px 5px 30px;
  /*50 = navbar  */
  min-height: calc(100vh - 50px - 40px);
  background-color: white;
  border-radius: 10px;
}
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
