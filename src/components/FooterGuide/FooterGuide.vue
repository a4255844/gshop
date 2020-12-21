<template>
  <div class="footer-guide">
    <spen
      class="guide-item"
      :class="{ on: $route.path === '/msite' }"
      @click="goto('/msite')"
    >
      <spen>
        <i class="iconfont iconhome"></i>
      </spen>
      <spen>首页</spen>
    </spen>
    <spen
      class="guide-item"
      :class="{ on: $route.path === '/search' }"
      @click="goto('/search')"
    >
      <spen>
        <i class="iconfont iconsearch"></i>
      </spen>
      <spen>搜索</spen>
    </spen>
    <spen
      class="guide-item"
      :class="{ on: $route.path === '/order' }"
      @click="goto('/order')"
    >
      <spen>
        <i class="iconfont icondingdan"></i>
      </spen>
      <spen>订单</spen>
    </spen>
    <spen
      class="guide-item"
      :class="{ on: $route.path === '/profile' }"
      @click="goto('/profile')"
    >
      <spen>
        <i class="iconfont iconuser1"></i>
      </spen>
      <spen>我的</spen>
    </spen>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name : "FooterGuide",
  methods:{
    goto(path) { //编程式路由跳转
      this.$router.replace(path)
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
 .footer-guide
    display flex
    top-border-1px($green)
    position fixed
    left 0
    bottom 0
    width 100%
    height 50px
    .guide-item
      display flex
      flex 1
      flex-direction column
      justify-content center
      align-items center
      font-size 12px
      &.on
        color: $green
      .iconfont
        font-size 22px
</style>
