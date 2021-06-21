import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout/components'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

const createRouter = () => new Router({
  // 在 vue 项目中，如果前一个页面有滚动条的滚动，当路由跳转后发现滚动条的位置还保持在原来的位置，这个就带来了困扰
  // 使用 scrollBehavior 这种方法可以在每次路由跳转后手动使滚动条回到头部位置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
