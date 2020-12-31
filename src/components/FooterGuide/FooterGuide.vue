<template>
  <div class="footer-guide">
    <span class="guide-item" :class="{ on: $route.path === '/msite' }" @click="goto('/msite')">
      <span>
        <i class="iconfont iconhome"></i>
      </span>
      <span>{{$t('footer_home')}}</span>
    </span>
    <span class="guide-item" :class="{ on: $route.path === '/search' }" @click="goto('/search')">
      <span>
        <i class="iconfont iconsearch"></i>
      </span>
      <span>{{$t('footer_search')}}</span>
    </span>
    <span class="guide-item" :class="{ on: $route.path === '/order' }" @click="goto('/order')">
      <span>
        <i class="iconfont icondingdan"></i>
      </span>
      <span>{{$t('footer_order')}}</span>
    </span>
    <span class="guide-item" :class="{ on: $route.path === '/profile' }" @click="goto('/profile')">
      <span>
        <i class="iconfont iconuser1"></i>
      </span>
      <span>{{$t('footer_own')}}</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "FooterGuide",
  methods: {
    //编程式路由跳转
    //解决重复点击报错的问题
    // 方案1：进行判断，如果点击项不同在进行跳转
    goto(path) {
      if (path !== this.$route.path) {
        this.$router.replace(path)
      } else { //方案2：如果点击项相同，刷新界面
        window.location = path  //发送一般的http请求==>整个界面会刷新显示
      }
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
    background #fff
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
