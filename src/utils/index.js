/* 
  定义各种工具函数
*/
import Vue from 'vue'
//保存foods中所有count>0的食物到sessionStorage 使用对象结构储存
// shopId_key:{foodId1:count1,foodId2:count2}
// array.reduce(): 累计累加生成一个数值/数组/对象
export function saveCartCount(id, cartFoods) {
  const cartCounts = cartFoods.reduce((pre, food) => {
    if (food.count > 0) {
      // 向pre中添加属性
      pre[food.id] = food.count
    }
    // 返回pre
    return pre
  }, {})
  sessionStorage.setItem(id + '_key', JSON.stringify(cartCounts))
}
//根据商家id读取sessionStorage内对应的数据，并根据数据生成对应的cartFoods数组
export function readCartCount(shop) {
  const { goods, id } = shop
  const cartCounts = JSON.parse(sessionStorage.getItem(id + '_key'))
  if (!cartCounts) {
    return
  } else {
    const cartFoods = []
    //遍历查出所有需要指定count的food
    goods.forEach(good => {
      good.foods.forEach(food => {
        // 读取food在cartCounts中对应的值(有可能没有)，并做对比
        if (cartCounts[food.id] > 0) {
          //给vue中的food添加响应式属性
          Vue.set(food, 'count', cartCounts[food.id])
          //向cartFoods中添加此food
          cartFoods.push(food)
        }
      })
    })
    return cartFoods
  }
}