<template>
  <el-drawer
    title="文章设置"
    :visible.sync="addEditVisible"
    direction="rtl"
    :before-close="handleClose"
  >
    <div class="post-drawer__content">
      <el-form :model="formData">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="formData.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="别名" label-width="100px">
          <el-input v-model="formData.abbr" autocomplete="off" />
        </el-form-item>
        <el-form-item label="发表时间" label-width="100px">
          <el-col :span="11">
            <el-date-picker v-model="formData.publishTime" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="开启评论" label-width="100px">
          <el-radio v-model="formData.commentFlag" label="true">开启</el-radio>
          <el-radio v-model="formData.commentFlag" label="false">关闭</el-radio>
        </el-form-item>
        <el-form-item label="是否置顶" label-width="100px">
          <el-radio v-model="formData.topFlag" label="true">是</el-radio>
          <el-radio v-model="formData.topFlag" label="false">否</el-radio>
        </el-form-item>
        <el-form-item label="分类目录" label-width="100px">
          <el-tree
            ref="tree"
            :data="categoryTreeData"
            :props="defaultProps"
            node-key="categoryId"
            default-expand-all
            highlight-current
            show-checkbox
            draggable
          >
            <span slot-scope="{ node }" class="custom-tree-node">
              <span>{{ node.label }}</span>
            </span></el-tree>
        </el-form-item>
        <el-form-item label="选择标签" label-width="100px">
          <el-select v-model="tagIds" multiple clearable placeholder="请选择">
            <el-option
              v-for="item in tagListDate"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" label-width="100px">
          <el-input
            v-model="formData.digest"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="关键字" label-width="100px">
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
import { addPost, updatePost } from '@/api/post'

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
    rowInfo: {
      type: Object,
      default: () => { }
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
        keywords: ''
      },
      // 选中的标签
      tagIds: [],
      // 选中的分类
      categoryIds: [],
      // 分类树形结构数据
      categoryTreeData: null,
      defaultProps: {
        children: 'child',
        label: 'categoryName'
      },
      // 标签列表
      tagListDate: null
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.addEditVisible = val
        if (val && this.dialogType === 'edit') {
          this.formData = JSON.parse(JSON.stringify(this.rowInfo))
        }
      }
    }
  },
  created() {
    this.categoryTree()
    this.tagList()
  },
  methods: {
    // 关闭抽屉
    handleClose() {
      this.addEditVisible = false
      this.$emit('update:visible', this.addEditVisible)
    },
    // 取消按钮
    cancelForm() {
      this.addEditVisible = false
      this.$emit('update:visible', this.addEditVisible)
    },
    // 分类树形数据
    categoryTree() {
      treeCategory().then(response => {
        this.categoryTreeData = response.data
      })
    },
    // 标签列表
    tagList() {
      getTagList().then(response => {
        this.tagListDate = response.data
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
          categoryIds: this.$refs.tree.getCheckedKeys()
        }).then(() => {
          this.addEditVisible = false
          this.$emit('reload')
        })
      } else {
        updatePost(this.formData).then(() => {
          this.addEditVisible = false
          this.$emit('reload')
        })
      }
    }

  }
}
</script>

<style scoped>
.post-drawer__content {
  margin-right: 10px;
}
.el-button {
  float: right;
  margin-left: 10px;
}
</style>
