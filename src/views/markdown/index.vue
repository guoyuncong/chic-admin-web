<template>
  <div class="editor-container">
    <markdown-editor ref="markdownEditor" v-model="content" />
    <div class="footer">
      <el-button type="danger" @click="updateStatus">保存草稿</el-button>
      <el-button type="primary" @click="publishPost">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import { detailPost, editPost, updateStatus } from '@/api/post'

import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'Markdown',
  components: { MarkdownEditor },
  data() {
    return {
      title: '',
      content: '',
      postId: '',
      html: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  created() {
    this.postId = this.$route.query.postId
    console.log(this.postId)
    this.fetchData(this.postId)
  },
  methods: {
    // 获取文章详情
    fetchData(postId) {
      detailPost({
        postId: postId
      }).then(response => {
        this.content = response.data.originContent
        this.title = response.data.title
      })
    },
    // 发布文章
    publishPost() {
      editPost({
        postId: this.postId,
        originContent: this.$refs.markdownEditor.getValue(),
        formatContent: this.$refs.markdownEditor.getHtml()
      }).then(response => {
        this.$router.push({
          path: '/posts/post'
        })
      })
    },
    // 更改文章状态
    updateStatus() {
      updateStatus({
        postId: this.postId,
        status: 2
      }).then(response => {
        this.$router.push({
          path: '/posts/post'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  width: 100%;
  margin-bottom: 30px;
  &::v-deep .tui-editor .te-preview-style-vertical .te-md-splitter {
    width: 100%;
  }
}
.footer {
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  bottom: 20px;
  justify-content: flex-end;
}
.el-button {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 16px;
}
</style>
