import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局 css 文件
import '@/styles/index.scss'

import App from './App'
import router from './router'

import '@/icons' // icon

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
