<template>
  <div>
    <div class="goods">
      <div class="goods-left" ref="goodsLeft">
        <ul class="menu-wrapper" ref="leftUl">
          <!-- current -->
          <li class="menu-item" v-for="(good,index) in goods" :key="good.name" :class="{current:currentIndex===index}" @click="currentItem(index)">
            <span class="text">
              <img :src="good.icon" class="icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-right" ref="goodsRight">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good) in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item" v-for="(food,index) in good.foods" :key="index" @click="isShowFood(true,food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food" />
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

import ShopCart from '@/components/ShopCart/ShopCart'
import Food from '@/components/Food/Food'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      scrollY: 0,  //获取当前滚动的坐标
      tops: [],     //储存每个列表的总高度
      food: {},  //储存当前点击的食物对象
    }
  },
  components: {
    ShopCart,
    Food
  },
  mounted() {
    /* 解决第一次显示页面没有绑定better-scroll */
    if (this.goods.length > 0) {
      console.log('mounted goods');
      this._initScrollY()
      this._initTops()
    }
  },
  methods: {
    /* 
      初始化滑动
      区分methods非事件方法，在方法前加_，这是一种良好的编码风格
      确保BScroll对象只new一次：单例
      如果已经创建，重新计算BScroll大小
     */
    _initScrollY() {
      if (!this.leftScroll) {
        console.log('创建BScroll实例');
        this.leftScroll = new BScroll(this.$refs.goodsLeft, {
          click: true
        })
        this.rightScroll = new BScroll(this.$refs.goodsRight, {
          click: true,
          probeType: 1 //非实时派发DOM事件 / 触摸滑动 => 性能高
          // probeType: 2  //实时 / 触摸   => 性能过低
          // probeType: 3  //实时 / 触摸 / 惯性 / 编码  => 性能过低
        })
        /* 给右侧列表添加绑定事件scrollEnd */
        this.rightScroll.on('scrollEnd', ({ y }) => {
          this.scrollY = Math.abs(y)
        })
      } else {
        this.leftScroll.refresh()
        this.rightScroll.refresh()
      }
    },
    /* 统计右侧所有分类li的top的数组 */
    _initTops() {
      let lis = this.$refs.rightUl.children  //获取右侧ul的所有子元素的伪数组
      // let lis = Array.from(lis)  //伪数组转换真数组es6
      lis = Array.prototype.slice.call(lis)  //伪数组转换真数组 es5
      const tops = []
      let top = 0
      tops.push(top)
      lis.forEach(li => {
        top += li.clientHeight  //得到每个li的高度并相加
        tops.push(top)
      });
      this.tops = tops //更新tops数组
    },
    /*点击左侧的分类，显示对应的列表 */
    currentItem(index) {
      const top = this.tops[index]  //取出对应列表的高度值
      /* 立即改变scrollY的值，让其立即进入选中状态 */
      this.scrollY = top
      this.rightScroll && this.rightScroll.scrollTo(0, -top, 500) //控制better-scroll移动到对应坐标的方法
    },
    /* 点击食物将当前食物信息保存到data */
    isShowFood(isShow, food) {
      this.food = food
      /* 
        子组件可以使用父组件的方法
          父组件需要把对应的方法通过props传递给子组件
        父级组件也可以直接使用子组件内的方法
          需要通过ref来标记子组件
      */
      this.$refs.food.toggleFood()
    },

  },
  watch: {
    goods() {
      console.log('watch goods');
      this.$nextTick(() => {
        this._initScrollY()
        this._initTops()
      })
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.shop.goods || {}
    }),
    currentIndex() {
      const { tops, scrollY } = this
      /* 如果当前目标的top <= scrollY 并且  scrollY小于下一个top的高度，则表示当前当前列表被选中  */
      const index = tops.findIndex((top, index) => top <= scrollY && tops[index + 1] > scrollY)
      /* 判断index是否发生改变 */
      let preIndex = null
      if (index !== preIndex && this.leftScroll) {
        /* 如果变化了，就移动到目标元素*/
        preIndex = index //保存新的index
        const li = this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li, 500)
      }
      return index
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins.styl'
.goods
  display flex
  overflow hidden
  /* calc可以动态计算高度，宽度 */
  height calc(100vh - 269px)
  /* vh  vw 视口单位 1vh = 1%的视口高度 */
  // 定位解决切换设备高度不一致的问题
  // position absolute
  // bottom 0
  // top 221px
  .goods-left
    width 80px
    background #f3f5f7
    height 100%
    overflow hidden
    .menu-wrapper
      .menu-item
        box-sizing border-box
        position relative
        height 54px
        width 100%
        line-height 14px
        text-align left
        font-size 12px
        color #000
        display table
        padding 0 12px
        &:after
          content ''
          height 1px
          width 80%
          background rgba(7,17,27,0.1)
          position absolute
          bottom 0
          left 10%
        &.current
          background #fff
          color $green
          font-weight 700
        .text
          display table-cell
          vertical-align: middle
          width 55px        
        .icon
          display inline-block
          vertical-align: top
          width 12px
          height 12px
          margin-right 2px
          background-size: 12px 12px
          background-repeat: no-repeat
  .goods-right
    flex 1 
    height 100%
    .food-list-hook
      .title
        padding-left 14px
        border-left 2px solid #d9dde1;
        font-size 12px
        background #f3f5f7
        color #93999f
        height 26px
        line-height 26px
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom: 0
        .icon
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            color #07111b
            margin 2px 0 8px
          .desc
            font-size 12px
            color #93999f
            line-height 12px
            margin-bottom 8px
          .extra
            font-size 12px
            color #93999f
            .count
              margin-right 12px
          .price
            height 24px
            line-height 24px
            .now
              font-size 14px
              color #f01414
              margin-right 8px
            .old
              font-size 12px
              text-decoration line-through
              color rgb(147, 153, 159)
          .cartcontrol-wrapper
            position absolute
            bottom 12px 
            right 0
            
</style>
