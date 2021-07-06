<template>
  <div class="post-container">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-container>
        <el-header style="font-size: 12px" :inline="true">
          <el-col :span="5">
            <el-input v-model="pageQuery.keyword" clearable />
          </el-col>
          <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
          <svg-icon class="plusIcon" icon-class="plus" @click="addDialog" />
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column align="center" prop="title" label="标题" />
            <el-table-column align="center" prop="abbr" label="别名" />
            <el-table-column align="center" prop="status" label="状态" />
            <el-table-column align="center" prop="visitNum" label="访问次数" />
            <el-table-column align="center" prop="updateNum" label="修改次数" />
            <el-table-column align="center" prop="publishTime" label="发布时间">
              <template slot-scope="scope">
                <span>{{ scope.row.publishTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作">
              <template slot-scope="scope">
                <div style="display: flex; width:100px">
                  <el-button size="mini" @click="writePost(scope.row.abbr)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">回收站</el-button>
                  <el-button size="mini" @click="setPost(scope.row.postId)">设置</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <pagination v-show="total>0" :total="total" :current.sync="pageQuery.current" :size.sync="pageQuery.size" :keyword.sync="pageQuery.keyword" @pagination="fetchData" />
          <!-- 新增/编辑文章 -->
          <add-edit-dialog :visible.sync="addEditVisible" :dialog-type="dialogType" :post-id="postId" @reload="fetchData" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { pagePost } from '@/api/post'
import Pagination from '@/components/Pagination'
import addEditDialog from '@/components/Post'

export default {
  name: 'Posts',
  components: {
    Pagination,
    addEditDialog
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
        current: 1,
        size: 10
      },
      // 总条数
      total: 0,
      // 新增/编辑文章标识
      addEditVisible: false,
      dialogType: 'add',
      // 选中行文章ID
      postId: '',
      direction: 'rtl'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 添加标签弹框控制
    addDialog() {
      this.dialogType = 'add'
      this.addEditVisible = true
    },
    // 分类列表
    fetchData() {
      pagePost(this.pageQuery).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    // 点击搜索，重置页码为 1
    searchData() {
      this.pageQuery.current = 1
      pagePost(this.pageQuery).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    // 编辑文章内容
    writePost(abbr) {
      this.$router.push({
        path: '/posts/write',
        query: { abbr: abbr }
      })
    },
    // 设置文章属性
    setPost(postId) {
      this.addEditVisible = true
      this.dialogType = 'edit'
      this.postId = postId
    },
    handleDelete(row) {

    }
  }
}
</script>

<style scoped>
.post-container {
  background-color: white;
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
.plusIcon {
  font-size: 40px;
  float:right;
  margin-top:10px;
}
</style>
