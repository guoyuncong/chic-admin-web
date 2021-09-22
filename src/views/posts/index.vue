<template>
  <div class="post-container">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-container>
        <el-header style="font-size: 12px" :inline="true">
          <el-row :gutter="18">
            <el-col :span="4">
              <el-input v-model="pageQuery.keyword" clearable placeholder="文章名称/别名/关键字" />
            </el-col>
            <el-col :span="4">
              <el-select v-model="pageQuery.tagIds" multiple clearable :collapse-tags="true" placeholder="标签">
                <el-option
                  v-for="item in tagsData"
                  :key="item.tagId"
                  :label="item.tagName"
                  :value="item.tagId"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="pageQuery.status" clearable placeholder="文章状态">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-cascader
                ref="category-cascader"
                :options="categoriesData"
                :props="categoryProps"
                :collapse-tags="true"
                clearable
                @change="handleChange"
              />
            </el-col>
            <el-button class="searchBtn" type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
            <svg-icon class="plusIcon" icon-class="plus" @click="addDialog" />
          </el-row>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column align="center" prop="title" label="标题" />
            <el-table-column align="center" prop="abbr" label="别名" />
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-button class="tagButton" size="mini" :type="btnType()" round>
                  {{ scope.row.statusTrans }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="分类">
              <template slot-scope="scope">
                <el-button v-for="item in scope.row.categories" :key="item.categoryId" class="tagButton" size="mini" :type="btnType()" round>
                  {{ item.categoryName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="标签">
              <template slot-scope="scope">
                <el-button v-for="item in scope.row.tags" :key="item.tagId" class="tagButton" size="mini" :type="btnType()" round>
                  {{ item.tagName }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="visitNum" label="访问" />
            <el-table-column align="center" prop="updateNum" label="修改" />
            <el-table-column align="center" prop="publishTime" label="发布时间">
              <template slot-scope="scope">
                <span>{{ scope.row.publishTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="240px">
              <template slot-scope="scope">
                <div style="display: flex;">
                  <el-button size="mini" @click="writePost(scope.row.abbr)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="updateStatus(scope.row)">回收站</el-button>
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
import { pagePost, updateStatus } from '@/api/post'
import { getTagList } from '@/api/tag'
import { treeCategory } from '@/api/category'
import { joint } from '@/utils/str'
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
      status: [{
        value: '1',
        label: '已发布'
      }, {
        value: '2',
        label: '草稿中'
      }, {
        value: '3',
        label: '回收站'
      }],
      // 搜索/分页关键字
      pageQuery: {
        tagIds: [],
        categoryIds: [],
        status: null,
        keyword: '',
        current: 1,
        size: 10
      },
      // 标签选择框
      tagsData: null,
      // 分类树形结构数据
      categoriesData: null,
      // 页面显示数据
      tableData: null,
      // 总条数
      total: 0,
      // 新增/编辑文章标识
      addEditVisible: false,
      dialogType: 'add',
      // 选中行文章ID
      postId: '',
      // 使用 Cascader 级联选择器后台返回的数据和要求的不一致时，映射
      categoryProps: {
        // value 映射返回值 categoryId
        value: 'categoryId',
        // label 映射返回值 categoryName
        label: 'categoryName',
        // children 映射返回值 child 数组
        children: 'child',
        // 是否严格的遵守父子节点不互相关联
        checkStrictly: true,
        // 允许多选
        multiple: true
      }
    }
  },
  created() {
    this.fetchData()
    this.tagList()
    this.categoryList()
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
    // 获取文章列表
    fetchData() {
      pagePost({
        keyword: this.pageQuery.keyword,
        current: this.pageQuery.current,
        size: this.pageQuery.size
      }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    // 分类列表数据
    categoryList() {
      treeCategory().then(response => {
        this.categoriesData = response.data
      })
    },
    // 获取分类列表选中内容
    handleChange() {
      var checkedCategory = this.$refs['category-cascader'].getCheckedNodes()
      this.pageQuery.categoryIds = checkedCategory.map(item => item.data.categoryId)
    },
    // 标签列表
    tagList() {
      getTagList().then(response => {
        this.tagsData = response.data
      })
    },
    // 点击搜索，重置页码为 1
    searchData() {
      pagePost({
        tagIds: joint(this.pageQuery.tagIds),
        categoryIds: joint(this.pageQuery.categoryIds),
        keyword: this.pageQuery.keyword,
        current: this.pageQuery.current,
        size: this.pageQuery.size
      }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
      })
    },
    // 编辑文章内容
    writePost(postId) {
      this.$router.push({
        path: '/posts/write',
        query: { postId: postId }
      })
    },
    // 设置文章属性
    setPost(postId) {
      this.addEditVisible = true
      this.dialogType = 'edit'
      this.postId = postId
    },
    // 更改文章状态
    updateStatus(row) {
      updateStatus({
        postId: row.postId,
        status: 3
      })
    }
  }
}
</script>

<style scoped >
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
.pageQueryCategory {
  margin-top: 15px;
  margin-left: 10px;
  font-size: 16px;
}
.tagButton {
  margin-top:10px;
  margin-left:10px;
}
</style>
