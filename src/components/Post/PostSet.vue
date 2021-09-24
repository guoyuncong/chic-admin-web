<!-- 文章设置页面 -->
<template>
  <el-drawer
    title="文章设置"
    direction="rtl"
    :visible.sync="addEditVisible"
    :before-close="handleClose"
  >
    <div class="post-drawer__content">
      <el-form ref="form" :model="formData">
        <el-form-item label="标题" label-width="100px" prop="title">
          <el-input v-model="formData.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="100px" prop="abbr">
          <el-input v-model="formData.abbr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发表时间" label-width="100px" prop="publishTime">
          <el-col :span="11">
            <el-date-picker v-model="formData.publishTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" />
          </el-col>
        </el-form-item>
        <el-form-item label="开启评论" label-width="100px" prop="commentFlag">
          <el-radio v-model="formData.commentFlag" :label="true">开启</el-radio>
          <el-radio v-model="formData.commentFlag" :label="false">关闭</el-radio>
        </el-form-item>
        <el-form-item label="是否置顶" label-width="100px" prop="topFlag">
          <el-radio v-model="formData.topFlag" :label="true">是</el-radio>
          <el-radio v-model="formData.topFlag" :label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="分类目录" label-width="100px">
          <!-- 文章分类选择框 -->
          <el-col :span="12">
            <el-cascader
              ref="category-cascader"
              placeholder="请选择分类"
              :options="categoriesData"
              :props="categoryProps"
              :collapse-tags="true"
              clearable
              @change="handleChange"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="选择标签" label-width="100px">
          <el-select v-model="tagIds" multiple clearable :collapse-tags="true" placeholder="请选择标签">
            <el-option
              v-for="item in tagsData"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" label-width="100px" prop="digest">
          <el-input
            v-model="formData.digest"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="关键字" label-width="100px" prop="keywords">
          <el-input v-model="formData.keywords" placeholder="文章搜索" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div class="post-drawer__footer">
        <el-button type="primary" @click="handleAddEdit()">确定</el-button>
        <el-button @click="cancelForm">取 消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { treeCategory } from '@/api/category'
import { getTagList } from '@/api/tag'
import { addPost, setPost, detailPost } from '@/api/post'

export default {
  name: 'AddEditDialog',
  props: {
    // 新增/编辑可见标识
    visible: {
      type: Boolean,
      default: false
    },
    // 表单类型：新增/编辑
    dialogType: {
      type: String,
      default: 'add'
    },
    // 表格行数据
    postId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 新增/编辑弹框标识
      addEditVisible: false,
      // 数据
      formData: {
        title: '',
        abbr: '',
        publishTime: '',
        commentFlag: '',
        topFlag: '',
        digest: '',
        keywords: '',
        categories: {
          categoryId: '',
          categoryName: '',
          child: []
        },
        tags: {
          tagId: '',
          tagName: ''
        }
      },
      // 选中的标签
      tagIds: [],
      // 选中的分类
      categoryIds: [],
      // 分类列表数据
      categoriesData: null,
      // 标签列表数据
      tagsData: null,
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
  watch: {
    visible: {
      handler(val) {
        this.addEditVisible = val
        if (val && this.dialogType === 'edit') {
          detailPost({
            postId: this.postId
          }).then((response) => {
            this.formData = response.data
            this.tagIds = this.formData.tags.map(item => {
              return item.tagId
            })
          })
        }
      }
    }
  },
  created() {
    this.categoryList()
    this.tagList()
  },
  methods: {
    // 关闭抽屉
    handleClose() {
      this.addEditVisible = false
      this.$refs.form.resetFields()
      this.$emit('update:visible', this.addEditVisible)
    },
    // 取消按钮
    cancelForm() {
      this.addEditVisible = false
      this.$refs.form.resetFields()
      this.$emit('update:visible', this.addEditVisible)
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
      console.log(checkedCategory)
      this.categoryIds = checkedCategory.map(item => item.data.categoryId)
    },
    // 标签列表
    tagList() {
      getTagList().then(response => {
        this.tagsData = response.data
      })
    },
    // 新增/编辑文章
    handleAddEdit() {
      if (this.dialogType === 'add') {
        addPost({
          title: this.formData.title,
          abbr: this.formData.abbr,
          publishTime: this.formData.publishTime,
          commentFlag: this.formData.commentFlag,
          topFlag: this.formData.topFlag,
          digest: this.formData.digest,
          keywords: this.formData.keywords,
          tagIds: this.tagIds,
          categoryIds: this.categoryIds
        }).then(() => {
          this.addEditVisible = false
          this.$emit('reload')
          this.$emit('update:visible', this.addEditVisible)
          this.$refs.form.resetFields()
        })
      } else {
        setPost({
          postId: this.formData.postId,
          title: this.formData.title,
          abbr: this.formData.abbr,
          publishTime: this.formData.publishTime,
          commentFlag: this.formData.commentFlag,
          topFlag: this.formData.topFlag,
          digest: this.formData.digest,
          keywords: this.formData.keywords,
          tagIds: this.tagIds,
          categoryIds: this.categoryIds
        }).then(() => {
          this.addEditVisible = false
          this.$emit('update:visible', this.addEditVisible)
          this.$emit('reload')
          this.$refs.form.resetFields()
        })
      }
    }

  }
}
</script>

<style scoped>
.treeCategory {
  align-items: center;
  margin-top: 9px;
}
.post-drawer__content {
  margin-right: 10px;
}
.el-button {
  float: right;
  margin-left: 10px;
}
</style>
