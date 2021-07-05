<template>
  <div class="editor-container">
    <markdown-editor v-model="content" />
    <div class="footer">
      <el-button type="danger">保存草稿</el-button>
      <el-button type="primary">发布文章</el-button>
    </div>
  </div>
</template>

<script>
import { detailPost } from '@/api/post'

import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**This is test**
* vue
* element
* webpack
`
export default {
  name: 'Markdown',
  components: { MarkdownEditor },
  data() {
    return {
      title: '',
      content: content,
      abbr: '',
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
    this.abbr = this.$route.query.abbr
    this.fetchData(this.abbr)
  },
  methods: {
    // 获取文章详情
    fetchData(abbr) {
      detailPost({
        abbr: abbr
      }).then(response => {
        this.content = response.data.originContent
        this.title = response.data.title
      })
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
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
  bottom: 0;
  justify-content: flex-end;
}
.el-button {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 16px;
}
</style>
