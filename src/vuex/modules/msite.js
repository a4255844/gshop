/* 
  首页模块相关数据管理
*/
import {
  reqAddress,
  reqCategorys,
  reqShops,
} from '@/api'
import {
  RECEIVE_ADDRES,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutations_type'
export default {
  state: () => ({
    latitude: 38.46667, // 纬度
    longitude: 106.26667, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
  }),
  mutations: {
    /* 
     局部的模块内的state访问的是当前模块的state
     但是commit是先局部找，然后在全局找
     */
    [RECEIVE_ADDRES](state, address) {
      state.address = address
    },
    [RECEIVE_CATEGORYS](state, categorys) {
      state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, shops) {
      state.shops = shops
    },
  },
  actions: {
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
  },
  getters: {}
}