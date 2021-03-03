<template>
  <div>
    <h1>MyInput组件</h1>
    <input type="text" :value="value" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['value']
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
