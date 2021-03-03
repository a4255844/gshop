import Vue from 'vue'
import 'lib-flexible' //rem适配
import { Button } from 'mint-ui';
import App from './App.vue'
import router from './router'
import './vee-validate'
import VueLazyload from 'vue-lazyload' //懒加载

import * as API from '@/api' //引入所有的发请求方法
import Header from '@/components/Header/Header'
import CartControl from '@/components/CartControl/CartControl'
import store from './vuex/store'
import i18n from './i18n'
import '@/mock/mock-sever.js'
import loading from '@/assets/images/loading.gif'
//把所有的发送请求的方法，保存在vm的原型上
Vue.prototype.$API = API
Vue.config.productionTip = false
//注册全剧组件
Vue.component('Header', Header)
Vue.component(Button.name, Button);
Vue.component('CartControl', CartControl)
//声明使用插件
Vue.use(VueLazyload, {
  loading   // 在要显示的图片没有加载到前显示
})    // 内部定义一个全局指令: lazy
new Vue({
  render: (h) => h(App),
  // 配置路由：所有组件内都有 $route & $router  <router-link> 和 <router-view>
  router,
  i18n,
  //所有组件都能开到store
  store
}).$mount('#app')
