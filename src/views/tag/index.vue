<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px" :inline="true">
        <el-col :span="5">
          <el-input v-model="keyword" clearable />
        </el-col>
        <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        <svg-icon class="plusIcon" icon-class="plus" @click="addDialog" />
      </el-header>
      <el-main>
        <el-table :data="tableData" height="578px">
          <el-table-column align="center" prop="tagName" label="标签名称" />
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
      </el-main>
    </el-container>
    <el-aside width="40%" style="background-color: rgb(238, 241, 246)">
      <el-button v-for="item in tableData" :key="item.tagId" class="tagButton" size="small" :type="btnType()" round>
        {{ item.tagName }}
      </el-button>
    </el-aside>
    <!-- 新增/编辑标签 -->
    <addEditDialog :visible.sync="addEditVisible" :dialog-type="dialogType" :row-info="rowInfo" @reload="fetchData" />
  </el-container>
</template>

<script>
import { getTagList, deleteTag } from '@/api/tag'
import addEditDialog from '@/components/Tag'
import { formatDate } from '@/utils/formatDate'

export default {
  name: 'Tag',
  components: {
    addEditDialog
  },
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
      // 页面显示数据
      tableData: null,
      // 查询关键字
      keyword: '',
      // 添加/编辑标签弹框标识
      addEditVisible: false,
      dialogType: 'add',
      // 行数据
      rowInfo: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 按钮随机类型，类型不同颜色不同
    btnType() {
      return ['primary', 'success', 'warning', 'danger', 'info'][Math.floor((Math.random() * 4))]
    },
    // 添加标签弹框控制
    addDialog() {
      this.dialogType = 'add'
      this.addEditVisible = true
    },
    // 编辑标签弹窗控制
    editDialog(row) {
      this.dialogType = 'edit'
      this.addEditVisible = true
      this.rowInfo = row
    },
    // 标签列表
    fetchData() {
      getTagList({
        keyword: this.keyword
      }).then(response => {
        this.tableData = response.data
      })
    },
    // 删除标签
    handleDelete(index, row) {
      this.$confirm('此操作将永久标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTag({
          tagIds: [row.tagId]
        }).then(response => {
          this.deleteTagDialogVisible = false
          this.fetchData()
        })
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
.tagButton {
  margin-top:10px;
  margin-left:10px;
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
