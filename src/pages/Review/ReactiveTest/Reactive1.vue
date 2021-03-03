<template>
  <div>
    <h2>Reactive1组件</h2>
    <!-- 使用的数据a属于父组件，当父组件a发生变化，这里也会变 -->
    <p>a==={{a}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['a']
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
