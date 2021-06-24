import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局 css 文件
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

// icon
import '@/icons'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
