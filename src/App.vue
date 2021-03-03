<template>
  <div>
    <!-- 缓存组件，并排除(exclude)对应组件
         在它管理的组件之间切换，组件不会死亡
     -->
    <keep-alive exclude="Search">
      <router-view></router-view>
    </keep-alive>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from '@/components/FooterGuide/FooterGuide'
// import {reqAutoLogin} from '@/api'
export default {
  async mounted() {
    this.$store.dispatch('getAddress') //分发地址的action
    //尝试自动登录
    this.$store.dispatch('autoLogin')

  },
  components: {
    FooterGuide
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
