import Vue from 'vue'
import 'lib-flexible' //rem适配
import { Button } from 'mint-ui';
import App from './App.vue'
import router from './router'
import './vee-validate'

import * as API from '@/api' //引入所有的发请求方法
import Header from '@/components/Header/Header'
import store from './vuex/store'
import i18n from './i18n'
//把所有的发送请求的方法，保存在vm的原型上
Vue.prototype.$API = API
Vue.config.productionTip = false
//注册全剧组件
Vue.component('Header', Header)
Vue.component(Button.name, Button);
new Vue({
  render: (h) => h(App),

  // 配置路由：所有组件内都有 $route & $router  <router-link> 和 <router-view>
  router,

  i18n,

  //所有组件都能开到store
  store
}).$mount('#app')
