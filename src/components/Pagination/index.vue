<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    // 数据总个数
    total: {
      required: true,
      type: Number
    },
    // 当前页码
    current: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    size: {
      type: Number,
      default: 10
    },
    // 组件布局，子组件名用逗号分隔
    layout: {
      type: String,
      default: 'total, prev, pager, next, jumper'
    },
    // 是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true
    },
    // 搜索关键字
    keyword: {
      type: String,
      default: ''
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.current
      },
      set(val) {
        this.$emit('update:current', val)
      }
    },
    pageSize: {
      get() {
        return this.size
      },
      set(val) {
        this.$emit('update:size', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { keyword: this.keyword, current: this.currentPage, size: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { keyword: this.keyword, current: val, size: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 30px 15px;
  float: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
