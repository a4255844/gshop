<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalFoods>0}">
              <i class="iconfont icongouwuchekong"></i>
            </div>
            <div class="num" v-if="totalFoods>0">{{totalFoods}}</div>
          </div>
          <div class="price" :class="{highlight:totalFoods}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{enough:totalPrice>=info.minPrice}">
            {{payEnough}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearFoods">清空</span>
          </div>
          <div class="list-content" ref="foodList">
            <ul>
              <li class="food" v-for="(food) in cartFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import { MessageBox } from 'mint-ui'

import { CLEAR_FOODS } from '@/vuex/mutations_type'
export default {
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    ...mapState({
      info: state => state.shop.shop.info || {},
      cartFoods: state => state.shop.cartFoods
    }),
    // ...mapGetters(['cartFoods']), 此方法效率低
    /* 计算选中食物的总和 */
    totalFoods() {
      return this.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    /* 计算选种食物的总价 */
    totalPrice() {
      return this.cartFoods.reduce((pre, food) => pre + food.price * food.count, 0)
    },
    /* 计算起送价格区域内显示的内容 */
    payEnough() {
      const { totalPrice } = this
      const { minPrice } = this.info
      if (!totalPrice) {
        return `￥${minPrice}元起送`
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`
      } else {
        return '去结算'
      }
    },
    /* 
      控制选中food列表展示的方法
        1.当totalFoods为0时,直接隐藏，并修改isShow的值为false
        2.默认返回isShow
        3.当点击购物车展示时，如果totalFoods的值不为0时,在修改isShow为true
    */
    listShow() {
      if (this.totalFoods === 0) {
        return false
      }
      /* 
        当即将显示选中食物列表时，对其添加BScroll
          注意：此时还未真正返回结果，所以需要用到nextTick
                当我们每次切换显示和隐藏foodList时，都会创建一个BScroll实例，影响性能
                解决思路：单一实例==>创建前先判断实例是否存在，创建后保存当前实例
       */
      if (this.isShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            // console.log('------');
            this.scroll = new BScroll(this.$refs.foodList, {
              click: true
            })
          } else {
            this.scroll.refresh() //重新计算betterScroll的大小，如果DOM结构发生变化了务必调用
          }
        })
      }
      return this.isShow
    }
  },
  watch: {
    listShow() {
      this.isShow = this.listShow
    }
  },
  methods: {
    toggleShow() {
      if (this.totalFoods) {
        this.isShow = !this.isShow
      }
    },
    clearFoods() {
      MessageBox.confirm('确定清空吗?').then(
        () => {
          this.$store.commit(CLEAR_FOODS)
        },
        () => { }
      )

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
.shop-cart
  position fixed
  left 0
  bottom 0
  z-index 50
  height 48px
  width 100%
  .content
    display flex
    background #141d27
    color rgba(255,255,255,0.4)
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        margin 0 12px
        height 44px
        width 44px
        position relative
        top -10px
        border-radius 50%
        background #141d27
        text-align center
        padding 6px
        .logo
          width 100%
          height 100%
          background #2b343c
          border-radius 50%
          &.highlight
            background $green
            color #fff
          .icongouwuchekong
            line-height 44px
            font-size 24px
          .icongouwucheman
            line-height 44px
            font-size 24px
            color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          background #f01414
          font-size 12px
          color #fff
          border-radius 16px
          font-weight 700
      .price
        display inline-block
        font-size 16px
        margin 12px 0 0
        padding-right 12px
        border-right 1px solid rgba(255,255,255,0.1)
        font-weight 700
        vertical-align top
        line-height 24px
        &.highlight
          color #fff
      .desc
        display inline-block
        margin 12px 0 0 12px
        line-height 24px
        font-size 10px
        vertical-align top
            
    
    
    .content-right
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        background #2b333b
        font-weight 700
        &.enough
          background $green
          color #fff
        &.not-enough
          background #2b333b
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    z-index -1
    transform translateY(-100%)
    &.move-enter-active,&.move-leave-active
      transition all .5s
    &.move-enter,&.move-leave-to
      opacity 0
      transform translateY(0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background #f3f5f7
      bottom-border-1px(rgba(7,17,27,0.1))
      .title
        float left
        font-size 14px
        color #07111b
      .empty
        float right
        color #00a0dc
        font-size 12px
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .name
          font-size 14px
          color #07111b
          line-height 24px
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          color rgb(240, 20, 20)
          font-weight 700
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  background: rgba(7, 17, 27, 0.6)
  backdrop-filter: blur(10px)
  &.fade-enter-active,&.fade-leave-active
    transition opacity .5s
  &.fade-enter,&.fade-leave-to
    opacity 0
</style>
