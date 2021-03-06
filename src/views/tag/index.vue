<template>
  <el-row :gutter="5">
    <el-col :span="12">
      <div class="tag-container">
        <el-container>
          <el-container>
            <el-header style="font-size: 12px" :inline="true">
              <el-col :span="5">
                <el-input v-model="keyword" clearable />
              </el-col>
              <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
              <svg-icon class="plusIcon" icon-class="plus" @click="addDialog" />
            </el-header>
            <el-main>
              <el-table height="calc(100vh - 50px - 40px - 110px)" :data="tableData">
                <el-table-column align="center" prop="tagName" label="标签名称" />
                <el-table-column align="center" prop="createTime" label="创建时间">
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
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
        </el-container>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="tag-aside">
        <el-button v-for="item in tableData" :key="item.tagId" class="tagButton" size="mini" :type="btnType()" round>
          {{ item.tagName }}
        </el-button>
      </div>
    </el-col>
    <!-- 新增/编辑标签 -->
    <add-edit-dialog :visible.sync="addEditVisible" :dialog-type="dialogType" :row-info="rowInfo" @reload="fetchData" />
  </el-row>
</template>

<script>
import { getTagList, deleteTag } from '@/api/tag'
import AddEditDialog from '@/components/Tag'

export default {
  name: 'Tag',
  components: {
    AddEditDialog
  },
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
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style scoped>
.tag-container  {
  /* 上 右 下 左 */
  margin: 15px 0px 5px 20px;
  /*50 = navbar  */
  min-height: calc(100vh - 50px - 40px);
  background-color: white;
  border-radius: 10px;
}
.tag-aside {
  /* 上 右 下 左 */
  margin: 15px 10px 5px 10px;
  /*50 = navbar  */
  min-height: calc(100vh - 50px - 40px);
  background-color: white;
  border-radius: 10px;
}
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
.el-col {
    border-radius: 4px;
  }
</style>
