import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
  mutations,
  getters,
  actions,
  modules: { //分别管理每个对应模块的数据
    msite,
    shop,
    user
  }
})