<template>
  <div>
    <!-- 一个插槽，传入标签结构，会显示传入的内容，
    如果不传，则显示默认插槽的默认内容，没有内容则不显示 -->
    <h1>1. 普通插槽</h1>
    <Solt1>
      <p>abc</p>
    </Solt1>
    <!-- 
       多个插槽，每个插槽有对应的name属性,再传入标签结构时，
       需指定template模板 指定v-slot:插槽name,把需要传入的标签写在模板内
       v-slot可以缩写：#插槽name
     -->
    <h1>2. 命名插槽(named solt)</h1>
    <Solt2>
      <template v-slot:two>
        <h3>{{msg}}</h3>
      </template>
      <template v-slot:one>
        <h2>{{msg}}</h2>
        <p>one</p>
      </template>
      <p>tow</p>

    </Solt2>
    <hr>
    <Solt2>
      <template #two>
        <h3>{{msg}}</h3>
      </template>
      <template #one>
        <h2>{{msg}}</h2>
      </template>
    </Solt2>
    <!-- 
      接收子组件传递的数据v-slot:default="slotProps" 数据存在slotProps中
      如果只有一个插槽v-slot:default=""可简写 v-slot=""
      如果有多个slot插槽则不能简写
      使用作用域slot?
          1). 数据在子组件
          2). 子组件要显示的部分界面由父组件决定
          3). 父组件指定界面结构，需要知道子组件的数据
          子 ==> 父 : 传递数据
          父 ==> 子 : 标签
          标签由数据决定
    一般的slot
          父组件需要传递的标签由自己的数据就可以决定
     -->
    <h1>3. 作用域插槽(scoped slots)</h1>
    <Solt3>
      <template v-slot="slotProps">
        <span style="font-size:20px" v-if="slotProps.todo.isComplete"> {{ slotProps.todo.name }}</span>
      </template>
    </Solt3>

    <Solt3>
      <template v-slot:default="slotProps">
        <span style="color:red" v-if="slotProps.todo.isComplete"> {{ slotProps.todo.name }}</span>
      </template>
      <template v-slot:other="slotProps2">
        <span v-if="slotProps2.todo.isComplete">{{slotProps2.todo.isComplete}}</span>
      </template>
    </Solt3>
  </div>
</template>

<script type="text/ecmascript-6">
import Solt1 from './Slot1'
import Solt2 from './Slot2'
import Solt3 from './Slot3'
export default {
  name: 'SlotTest',
  data() {
    return {
      msg: 'atguigu'
    }
  },
  components: {
    Solt1,
    Solt2,
    Solt3
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">

 
</style>
