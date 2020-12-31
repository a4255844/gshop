/* 
用来间接更新状态的方法的模块
可以处理逻辑判断,和异步任务 
*/
import { reqAddress, reqCategorys, reqShops, reqAutoLogin } from '@/api'
import {
  RECEIVE_ADDRES,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_TOKEN,
  RECEIVE_USER,
  LOGOUT
} from './mutations_type'
export default {
  //异步获取用户当前所在位置的方法
  async getAddress({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqAddress(longitude, latitude)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRES, address)
    }
  },
  //异步获取食物分类列表
  async getCategorys({ commit }, callback) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys) //同步执行mutation
      //  在更新数据之后调用回调函数,调用前先判断是否有回调函数传入
      typeof callback === 'function' && callback()
    }
  },
  //异步获取商家列表
  async getShops({ commit, state }) {
    const { latitude, longitude } = state
    const result = await reqShops({ latitude, longitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
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
    commit(LOGOUT)  //清除用户信息
  }
}
