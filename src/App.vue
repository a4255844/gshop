<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
import FooterGuide from '@/components/FooterGuide/FooterGuide'
// import {reqAutoLogin} from '@/api'
import { RECEIVE_TOKEN } from '@/vuex/mutations_type.js'
export default {
  async mounted() {
    this.$store.dispatch('getAddress') //分发地址的action
    //组件初始化完毕后,尝试保存本地token到vuex
    const token = localStorage.getItem('token_key')
    token && this.$store.commit(RECEIVE_TOKEN, token)
    //尝试自动登录
    this.$store.dispatch('autoLogin')
    // const result = await this.$API.reqAutoLogin() //自动登录的请求
    // this.$store.commit(RECEIVE_USER, result.data) //登陆成功，保存信息到vuex
  },
  components: {
    FooterGuide
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>
