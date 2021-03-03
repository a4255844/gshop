/* 
  用户模块相关数据管理
*/
import {
  reqAutoLogin,
} from '@/api'
import {
  RECEIVE_TOKEN,
  RECEIVE_USER,
  RESET_LOGOUT,
} from '../mutations_type'
export default {
  state: () => ({
    user: {},  //用户对象信息
    token: localStorage.getItem('token_key') || '',  //当前用户登录的标记

  }),
  mutations: {
    [RECEIVE_USER](state, { user }) {
      state.user = user
    },
    [RECEIVE_TOKEN](state, token) {
      state.token = token
    },
    [RESET_LOGOUT](state) {
      state.user = {}
      state.token = ''
    },
  },
  actions: {
    //获取用户信息
    getUserInfo({ commit }, user) {
      //保存token信息到state
      commit(RECEIVE_TOKEN, user.token)
      //保存token信息到localstorage
      localStorage.setItem('token_key', user.token)
      delete user.token //删除对象内的token,因为已经保存过了
      //保存其他用户信息
      commit(RECEIVE_USER, { user })
    },
    //自动登录的异步action
    async autoLogin({ commit, state }) {
      if (state.token && !state.user._id) { //如果有token且没有user._id，发送自动登录请求 
        const result = await reqAutoLogin()
        if (result.code === 0) {     //请求成功保存数据到state
          const user = result.data
          commit(RECEIVE_USER, { user })
        }
      }
    },
    //退出登录
    logout({ commit }) {
      localStorage.removeItem('token_key') //清除localStorage内储存的token
      commit(RESET_LOGOUT)  //清除用户信息
    },
  },
  getters: {}
}