<template>
  <div class="cartcontrol" v-if="food">
    <transition name="move">
      <div class="iconfont iconyichu" v-if="food.count" @click.stop="addCount(false)"></div>
    </transition>
    <div class="cart-count">{{food.count}}</div>
    <div class="iconfont icontianjia1" @click.stop="addCount(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
// import throttle from 'lodash/throttle'
export default {
  props: {
    food: Object
  },
  methods: {
    /* 
      不能直接更新不属于这个组件的数据，数据属于谁就找谁更新 
      我们需要在每个food上添加一个count属性，来记录当前食物的数量
      food属于vuex的数据，所以有需要找vuex来更新
    */
    addCount(isAdd) {
      //派发action来更新vuex内的数据,接收的数据为true：增加  false:减少
      this.food && this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    },
    // addCount: throttle(function (isAdd) {
    //   //派发action来更新vuex内的数据,接收的数据为true：增加  false:减少
    //   this.food && this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    // }, 1000, { trailing: false }) //在1s内多次点击，只响应第一次点击
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
.cartcontrol
  font-size 0  
  .iconyichu
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: 20px
    color $green
    &.move-enter-active,&.move-leave-active
      transition all .8s
    &.move-enter,&.move-leave-to
      opacity 0
      transform translateX(20px) rotate(180deg)
  .cart-count
    display inline-block
    width 12px
    font-size 12px
    color #93999f
    line-height 24px
    padding-top 6px
    vertical-align top
  .icontianjia1
    display inline-block
    padding 6px
    font-size 20px
    line-height 24px
    color $green
</style>
