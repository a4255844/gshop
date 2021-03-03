import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/vuex/store'
//声明使用vue插件
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',  //路径中没有#
  //项目中的所有路由
  routes
})
/* 功能：进入a/b必须登录，如果没有登陆自动跳转到登录 */
const paths = ['/a', '/b'] //所有需要进行登录验证的路由路径数组
//定义全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('global beforeEach()')
  const path = to.path //将要跳转到的目标路由的路径
  if (paths.indexOf(path) !== -1) {
    if (!store.state.user.token) { //如果当前未登录
      return next('/login')  //跳转到login页面,并return
    }
  }
  next() //放行
})
export default router