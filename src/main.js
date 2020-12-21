import Vue from 'vue'
import 'lib-flexible'  //rem适配
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router   // 配置路由：所有组件内都有 $route & $router  <router-link> 和 <router-view>
}).$mount('#app')
