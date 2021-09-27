<template>
  <div class="picture-container">
    <div class="query-container">
      <el-form ref="form" :inline="true">
        <el-form-item label="关键字">
          <el-input v-model="pageQuery.keyword" />
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="pageQuery.mediaType" clearable placeholder="请选择文件类型">
            <el-option
              v-for="item in fileType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="primary" class="upload-btn" @click="uploadFile">上传<i class="el-icon-upload el-icon--right" /></el-button>
      </el-form>
      <upload-image :visible.sync="uploadVisible" @reload="fetchData" />
    </div>
    <div class="table-container">
      <el-row :gutter="20">
        <el-col v-for="item in tableData" :key="item.attachmentId" :span="4" class="card">
          <el-card :body-style="{ padding: '0px'}">
            <img :src="item.path" class="image">
            <div style="padding: 14px;" @click="editDialog(item)">
              <span> {{ item.attachmentName }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="page-container">
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :current.sync="pageQuery.current" :size.sync="pageQuery.size" :keyword.sync="pageQuery.keyword" @pagination="fetchData" />
    </div>
    <!-- 编辑图片 -->
    <edit-dialg :visible.sync="editVisible" :attachment-id="attachmentId" @reload="fetchData" />
  </div>
</template>

<script>
import { pageAttachment } from '@/api/attachment'
import UploadImage from '@/components/Upload/UploadImage.vue'
import Pagination from '@/components/Pagination'
import EditDialg from '@/components/Attachment'

export default {
  name: 'Attachment',
  components: {
    UploadImage,
    Pagination,
    EditDialg
  },
  data() {
    return {
      // 上传文件弹框标识
      uploadVisible: false,
      // 编辑图片标识
      editVisible: false,
      // 选中的图片
      attachmentId: '',
      // 文件类型：
      fileType: [
        {
          value: 'image/gif',
          label: 'image/gif'
        }, {
          value: 'image/jpeg',
          label: 'image/jpeg'
        }, {
          value: 'image/png',
          label: 'image/png'
        }
      ],
      // 分页查询参数
      pageQuery: {
        current: 1,
        size: 18,
        keyword: '',
        mediaType: ''
      },
      total: 0,
      // 列表数据
      tableData: null,
      // 大图预览
      srcList: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 上传文件组件
    uploadFile() {
      this.uploadVisible = true
    },
    // 编辑图片组件
    editDialog(item) {
      this.editVisible = true
      this.attachmentId = item.attachmentId
    },
    // 附件分页列表
    fetchData() {
      pageAttachment(this.pageQuery).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.srcList = response.data.records.map(item => {
          return item.path
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.query-container {
  // 上 右 下 左
  padding: 15px 13px 3px;
  border-radius: 16px;
  align-items: center;
  background-color: #FFF;
}
.table-container {
  margin-top: 20px;
  padding: 20px 20px 15px 20px;
  border-radius: 16px;
  background-color: #FFF;
  overflow: hidden;
}
.page-container {
  background-color: #FFF;
  overflow: hidden
}
.picture-container {
  // 上 右 下 左
  padding: 15px 20px 15px 20px;
}
.card {
  margin-top: 20px;
}
.upload-btn {
  float: right;
}
.image {
  height: 150px;
  width: 300px;
  display: block;
  object-fit: fill;
}
</style>
