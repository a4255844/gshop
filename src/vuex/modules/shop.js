/* 
  商家模块相关数据管理
*/
import Vue from 'vue'
import { readCartCount } from '@/utils'
import {
  // reqGoods,
  // reqInfo,
  // reqRatings,
  reqShop
} from '@/api'
import {
  // RECEIVE_GOODS,
  // RECEIVE_INFO,
  // RECEIVE_RATINGS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_FOODS,
  RECEIVE_SHOP
} from '../mutations_type'
export default {
  state: () => ({
    // info: {},
    // goods: [],
    // ratings: [],
    shop: {},
    cartFoods: [] //生成用户已选中的数组列表：非计算
  }),
  mutations: {

    // [RECEIVE_GOODS](state, goods) {
    //   state.goods = goods
    // },
    // [RECEIVE_RATINGS](state, ratings) {
    //   state.ratings = ratings
    // },
    // [RECEIVE_INFO](state, info) {
    //   state.info = info
    // },
    [ADD_FOOD_COUNT](state, food) {
      if (food.count) {
        food.count++
      } else {
        // 如果food中没有count,那么需要给food添加一个属性count：food.count = 1 
        // 注意：
        // 自己添加的属性没有数据绑定，不能更新页面
        // 需要使用vue的set方法来添加一个带数据绑定的属性

        Vue.set(food, 'count', 1)
        //每次给food中添加count时，把它放到cartFoods中
        state.cartFoods.push(food)
      }
    },
    [REDUCE_FOOD_COUNT](state, food) {
      if (food.count > 0) {
        food.count--
        // 当count--结果为0时，把此food在cartFoods中删除
        if (!food.count) {
          state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
      }
    },
    [CLEAR_FOODS](state) {
      /* 将cartFoods中的所有count变为0 */
      state.cartFoods.forEach(food => {
        food.count = 0
      })
      /* 清空cartFoods */
      state.cartFoods = []
    },
    [RECEIVE_SHOP](state, { shop = {}, cartFoods = [] }) {
      state.shop = shop
      state.cartFoods = cartFoods
    }
  },
  actions: {
    /*  //获取goods
     async getGoods({ commit }, callback) {
       const result = await reqGoods()
       if (result.code === 0) {
         const goods = result.data
         commit(RECEIVE_GOODS, goods) //同步执行mutation
         //  在更新数据之后调用回调函数,调用前先判断是否有回调函数传入
         typeof callback === 'function' && callback()
       }
     },
 
     //获取商家信息info
     async getInfo({ commit }, callback) {
       const result = await reqInfo()
       if (result.code === 0) {
         const info = result.data
         commit(RECEIVE_INFO, info) //同步执行mutation
         //  在更新数据之后调用回调函数,调用前先判断是否有回调函数传入
         typeof callback === 'function' && callback()
       }
     },
 
     //获取评论ratings
     async getRatings({ commit }, callback) {
       const result = await reqRatings()
       if (result.code === 0) {
         const ratings = result.data
         commit(RECEIVE_RATINGS, ratings) //同步执行mutation
         //  在更新数据之后调用回调函数,调用前先判断是否有回调函数传入
         typeof callback === 'function' && callback()
       }
     }, */
    async getShop({ commit, state }, id) {
      //如果指定id和原有id相同，不需要发送请求
      if (id * 1 === state.shop.id) {
        return
      }
      //如果是其他商家的id,清空原有数据
      if (state.shop.id) {
        commit(RECEIVE_SHOP, {}) //空容器中不带shop对象
      }
      // console.log('准备发送请求了');
      // 发送请求获取对应商家的数据，并更新数据
      const result = await reqShop(id)
      if (result.code === 0) {
        const shop = result.data
        // console.log(shop);
        //读取shop对象中的cartFoods数组
        const cartFoods = readCartCount(shop)
        commit(RECEIVE_SHOP, { shop, cartFoods })
      }
    },

    //操作增加或减少食物数量的同步action
    updateFoodCount({ commit }, { isAdd, food }) {
      if (isAdd) {
        commit(ADD_FOOD_COUNT, food)
      } else {
        commit(REDUCE_FOOD_COUNT, food)
      }
    },
  },
  /* 
    设计一个储存顾客选中食物的数组：cartFoods
    当food内有count属性时把他保存在cartFoods中
  */
  getters: {
    /* 计算用户已选中的食物的列表的数组 =>计算效率低，每次计算都要重新遍历*/
    // cartFoods(state) {
    //   const cartFoods = []
    //   state.goods.forEach(good => {
    //     good.foods.forEach(food => {
    //       if (food.count > 0) {
    //         cartFoods.push(food)
    //       }
    //     })
    //   });
    //   return cartFoods
    // }
  }
}