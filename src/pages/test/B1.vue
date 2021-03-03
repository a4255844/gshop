<template>
  <div>
    B1组件
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  mounted() {
    // this.interTimeId = setInterval(() => {
    //   console.log('做些事情');
    // }, 1000)
  },
  /* 如果组件被缓存，那么beforeDestroy将会失效 */
  // beforeDestroy() {
  //   clearInterval(this.interTimeId)
  // }
  /* 可以使用组件内路由守卫解决缓存问题 */
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.interTimeId)
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(comp => {
      comp.interTimeId = setInterval(() => {
        console.log('做些事情');
      }, 1000)
      next()
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

 
</style>
