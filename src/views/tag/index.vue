<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="font-size: 12px" :inline="true">
        <el-col :span="5">
          <el-input v-model="keyword" clearable />
        </el-col>
        <el-button class="searchBtn" type="primary" icon="el-icon-search">搜索</el-button>
        <svg-icon class="plusIcon" icon-class="plus" @click="dialogFormVisible = true" />
      </el-header>
      <el-main>
        <el-table :data="tableData" height="578px">
          <el-table-column align="center" prop="tagName" label="标签名称" />
          <el-table-column align="center" prop="abbr" label="标签简称" />
          <el-table-column align="center" prop="createTime" label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDate(scope.row.createTime, 'yyyy-MM-dd') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="updateTagFormDialogVisible = true">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteTagDialogVisible = true">删除</el-button>
              <el-dialog title="提示" :visible.sync="deleteTagDialogVisible" width="30%" :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteTagDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确 定</el-button>
                </span>
              </el-dialog>
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
    <!-- 弹框：添加标签-->
    <el-dialog title="添加标签" :visible.sync="addTagFormDialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="标签名称" label-width="100px">
          <el-input v-model="form.name" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标签简称" label-width="100px">
          <el-input v-model="form.abbr" size="small" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTagFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹框：更新标签-->
    <el-dialog title="更新标签" :visible.sync="updateTagFormDialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="标签名称" label-width="100px">
          <el-input v-model="form.name" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标签简称" label-width="100px">
          <el-input v-model="form.abbr" size="small" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateTagFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import { getTagList, addTag, deleteTag } from '@/api/tag'

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
      // 页面显示数据
      tableData: null,
      // 查询关键字
      keyword: '',
      // 添加标签弹框
      addTagFormDialogVisible: false,
      // 删除标签弹框
      deleteTagDialogVisible: false,
      // 更新标签弹框
      updateTagFormDialogVisible: false,
      form: {
        tagName: '',
        abbr: '',
        tagId: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    btnType() {
      return ['primary', 'success', 'warning', 'danger', 'info'][Math.floor((Math.random() * 4))]
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    fetchData() {
      getTagList().then(response => {
        this.tableData = response.data
      })
    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {
      deleteTag({
        tagIds: [row.tagId]
      }).then(response => {
        this.deleteTagDialogVisible = false
      })
    },
    handleAdd() {
      if (this.form.name != null) {
        addTag({
          tagName: this.form.name,
          abbr: this.form.abbr
        }).then(response => {
          this.addTagFormDialogVisible = false
        })
      }
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
