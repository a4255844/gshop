<template>
  <transition name="move">
    <div class="food" v-show="isShow">
      <div class="food-content">
        <div class="image-header">
          <img v-lazy="food.image" v-if="isShow">
          <p class="foodpanel-desc">{{food.info}}</p>
          <div class="back" @click="toggleFood">
            <i class="iconfont iconhtmal5icon37"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CartControl :food="food" />
          </div>
        </div>
      </div>
      <div class="food-cover" @click="toggleFood"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import throttle from 'lodash/throttle'
export default {
  data() {
    return {
      isShow: false
    }
  },
  props: {
    food: Object,
  },
  methods: {
    toggleFood: throttle(function () {
      this.isShow = !this.isShow
    }, 300, { trailing: false })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.food
  position fixed
  top 0
  left 0
  bottom 48px
  width 100%
  z-index 101
  &.move-enter-active, &.move-leave-active
    transition opacity .5s
  &.move-enter,&.move-leave-to
    opacity 0
  .food-content
    width 80%
    height 65%
    position absolute
    top 50%
    left 50%
    z-index 66
    background #fff
    transform translate(-50%,-50%)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      >img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .foodpanel-desc
        font-size 12px
        color #dddddd
        padding 0 10px 10px
        position absolute
        left 0
        bottom 0
      .back
        position absolute
        top 10px
        left 0px
        .iconhtmal5icon37
          display block
          font-size 25px
          color #ffffff
          padding 10px
    .content
      position relative 
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color #07111b
        font-weight 700
        margin-bottom 8px
      .detail
        height 10px
        line-height 10px
        margin-bottom 18px
        color #93999f
        font-style 12px
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
  .food-cover
    position fixed
    top 0
    left 0
    right 0
    bottom 48px
    background rgba(0,0,0,0.5)
    z-index 55
    
     

 
</style>
