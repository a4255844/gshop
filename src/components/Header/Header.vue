<template>
  <header class="header">
    <slot name="left"></slot>
    <div>
      <div class="header-middle ellipsis">
        <span> {{ title }}</span>
      </div>
    </div>
    <slot name="right"></slot>
  </header>
</template>

<script type="text/ecmascript-6">
export default {
  // props : ['title']
  props: {
    title: String
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
.header
  position fixed !important
  display flex
  left 0
  top 0
  z-index 100
  background #02a774
  height 45px
  width 100%
  color #fff
  line-height 45px
  bottom-border-1px(#fff)
  .header-left
    position absolute
    left 15px
    top 50%
    transform translateY(-50%)
  .header-middle
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    width 50%
    color #fff
    font-size 20px
    text-align center
  .header-right
    font-size 14px
    color #fff
    position absolute
    right 15px
    top 50%
    transform translateY(-50%)
    .login
      border-right 1px solid #fff
</style>
