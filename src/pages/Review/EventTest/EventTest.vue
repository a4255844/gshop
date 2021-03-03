<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 
       原生事件： 
           1). 原生标签绑定的原生事件
           2). 自定义标签绑定的原生事件.native
       自定义事件：自定义标签绑定的事件,不带.native，事件名字任意
     -->
    <button @click="test1">测试原生事件</button>
    <Event1 @click.native="test2" />
    <Event2 @click="test3" @xxx="test4" />
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {

  methods: {
    test1() {
      alert('test1()')
    },
    test2(event) {
      alert('test2()')
    },

    test3(data) {
      alert('click test3()  ' + data)
    },
    test4(data) {
      alert('xxx test4()  ' + data)
    }
  },

  components: {
    Event1,
    Event2,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
