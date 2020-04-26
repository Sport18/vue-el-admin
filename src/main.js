import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
import store from "./store"

// 引入全局配置文件
import $conf from "./common/config/config.js"
Vue.prototype.$conf = $conf

// 引入拖拽排序
import VueDND from 'awe-dnd'
Vue.use(VueDND)

// 防止跳转相同路由出现报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
