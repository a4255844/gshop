/* 
用来间接更新状态的方法的模块
可以处理逻辑判断,和异步任务 
*/

export default {
  //外部的action内的state是总的state，如果一个操作需要修改多个模块的数据
  //那么这个数据尽量设计在总的state内
  // yyy({ commit, state }) {
  //   commit('xxx')  //commit内部会查找所有匹配的mutation(中的和每个模块的)
  // }
}
