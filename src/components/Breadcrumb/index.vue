<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in menuItemList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==menuItemList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      menuItemList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getMenuItem()
  },
  methods: {
    // 获取导航栏列表
    getMenuItem() {
      // 只展示携带 title 的路由
      let matchList = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matchList[0]
      if (!this.isDashboard(first)) {
        matchList = [{
          path: '/dashboard',
          meta: {
            title: 'Dashboard'
          }
        }].concat(matchList)
      }
      this.menuItemList = matchList.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    // 判断第一个是否为 Dashboard
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

