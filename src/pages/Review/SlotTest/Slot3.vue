<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.name">
        <slot :todo="todo" name="default">
          <span>{{todo.name}}</span>
        </slot>
        <slot name="other" :todo="todo">
          <span></span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      todos: [
        { name: '吃饭', isComplete: false },
        { name: '吃饭2', isComplete: true },
        { name: '吃饭3', isComplete: false }
      ],
      msg: 'atguigu'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

 
</style>
