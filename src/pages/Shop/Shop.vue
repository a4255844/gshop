<template>
  <div>
    <ShopHeader />
    <div class="tab">
      <div class="tab-item">
        <router-link :to="`/shop/${id}/goods`">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/ratings`">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="`/shop/${id}/info`">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import ShopHeader from '@/components/shopHeader/ShopHeader'
import { saveCartCount } from '@/utils'
export default {
  components: {
    ShopHeader
  },
  props: ['id'],
  mounted() {
    // this.$store.dispatch('getGoods')
    // this.$store.dispatch('getInfo')
    // this.$store.dispatch('getRatings')
    console.log(this.id)
    /* 页面初始化后，根据id请求对应的商家数据 */
    this.$store.dispatch('getShop', this.id)
    // 给窗口绑定一个卸载的监听(刷新)
    // window.onunload = () => { }
    window.addEventListener('unload', () => {
      const { shop: { id }, cartFoods } = this.shop  //多层解构
      //将当前商家的购物车数据保存
      saveCartCount(id, cartFoods)
    })
  },
  computed: {
    ...mapState({
      shop: state => state.shop
    })
  },
  // beforeDestroy() {
  //   /* 组件卸载前，保存当前商家的购物车数据到sessionStorage */
  //   const { shop: { id }, cartFoods } = this.shop  //多层解构
  //   saveCartCount(id, cartFoods)
  // },
  beforeRouteEnter(to, from, next) {
    next(comp => {
      console.log(comp.id)
      /* 页面初始化后，根据id请求对应的商家数据 */
      comp.$store.dispatch('getShop', comp.id)
      // 给窗口绑定一个卸载的监听(刷新)
      // window.onunload = () => { }
      window.addEventListener('unload', () => {
        const { shop: { id }, cartFoods } = comp.shop  //多层解构
        //将当前商家的购物车数据保存
        saveCartCount(id, cartFoods)
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    const { shop: { id }, cartFoods } = this.shop  //多层解构
    saveCartCount(id, cartFoods)
    next()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'

.tab
  display flex
  height 40px
  text-align center
  line-height 40px
  font-size 14px
  bottom-border-1px(#ccc)
  .tab-item
    flex 1
    color #4d555d
    a
      display block
      position relative
      &.router-link-active
        color $green
        &::after
          content ''
          height 4px
          width 40px
          transform translateX(-50%) scaleY(.5)
          background $green
          position absolute
          left 50%
          bottom 0
          // margin-left -20px
          
          
</style>
