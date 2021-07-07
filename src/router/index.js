import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/post',
    name: 'Posts',
    meta: { title: '文章', icon: 'form' },
    children: [
      {
        path: 'post',
        name: 'Posts',
        component: () => import('@/views/posts/index'),
        meta: { title: '文章', icon: 'tree' }
      },
      {
        path: 'write',
        component: () => import('@/views/markdown/index')
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/index'),
        meta: { title: '分类', icon: 'tree' }
      },
      {
        path: 'tag',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签', icon: 'tree' }
      }
    ]
  }, {
    path: '/attachment',
    component: Layout,
    redirect: '/attachment/picture',
    name: 'Posts',
    meta: { title: '附件', icon: 'nested' },
    children: [
      {
        path: 'picture',
        name: 'Picture',
        component: () => import('@/views/attachment/index'),
        meta: { title: '图片', icon: 'tree' }
      },
      {
        path: 'write',
        component: () => import('@/views/markdown/index')
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history',
    // 在 vue 项目中，如果前一个页面有滚动条的滚动，当路由跳转后发现滚动条的位置还保持在原来的位置，这个就带来了困扰
    // 使用 scrollBehavior 这种方法可以在每次路由跳转后手动使滚动条回到头部位置
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
