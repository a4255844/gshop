/* 
用来直接更新状态的方法(回调函数)的模块
*/
import {
  RECEIVE_ADDRES,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT
} from './mutations_type'
export default {
  [RECEIVE_ADDRES](state, address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  [RECEIVE_USER](state, { user }) {
    console.log(user);
    state.user = user
  },
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  [LOGOUT](state) {
    state.user = {}
    state.token = ''
  }
}
