<template>
  <div>
    <!-- 在原生标签上使用v-model -->
    <h1>原生标签使用v-model</h1>
    <input type="text" v-model="name"> <span>{{name}}</span>
    <!-- 
      v-model的原理
        先指定读取属性:value="name" 
        在绑定@input监听事件，然后每次发生变化后吧最新的值赋值给name
     -->
    <input type="text" :value="name" @input="name=$event.target.value"> <span>{{name}}</span> <!-- 直接赋值 -->
    <input type="text" :value="name" @input="handelInput"> <span>{{name}}</span> <!-- 使用回调函数 -->
    <!-- 
      给自定义组件绑定v-model 
        1). 相当于把name2的值通过props传递给MyInput组件==>  :value="name2"
        2). 然后给组件自定义了一个input监听
      我们需要手动在组件内部的input标签上读取传递过去的value
      然后绑定原生@input事件，并分发一个自定义input事件，并指定input最新的值
    -->
    <MyInput v-model="name2" /> <span>{{name2}}</span>
    <!-- $event是固定的，vue在外部包了一层函数形参叫$event -->
    <MyInput :value="name3" @input="name3=$event" /> <span>{{name3}}</span>
    <MyInput :value="name3" @input="handelInput2" /> <span>{{name3}}</span> <!-- 使用自定的回调函数 -->

  </div>
</template>

<script type="text/ecmascript-6">
import MyInput from './MyInput.vue'
export default {
  components: {
    MyInput,
  },
  data() {
    return {
      name: 'zhangsan',
      name2: 'lisi',
      name3: 'wangwu'
    }
  },
  methods: {
    handelInput(event) { //浏览器 分发事件时，指定的数据是event对象
      this.name = event.target.value
    },
    handelInput2(value) { //自定义事件监听，接收什么数据是分发自定义事件指定的
      this.name3 = value
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
