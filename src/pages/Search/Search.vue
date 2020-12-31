<template>
  <section class="search">
    <Header title="搜 索"></Header>
    <form class="search_form" action="#">
      <input
        class="search_input"
        type="search"
        name="search"
        placeholder="请输入美食名称或商家"
      />
      <input class="search_submit" type="submit" name="submit" />
    </form>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
.search_form
  margin-top 45px
  padding 12px 8px
  background #fff
  height 59px
  box-sizing border-box
  .search_input
    float left
    width 79%
    border 4px solid #f2f2f2
    height 35px
    font-size 14px
    color #333
    background #f2f2f2
    outline none
    font-weight 700
  .search_submit
    float right
    width 18%
    border 1px solid #02a774
    color #ffffff
    background #02a774
    height 35px
    border-radius 4px
    font-size 16px
    font-weight 700
</style>
