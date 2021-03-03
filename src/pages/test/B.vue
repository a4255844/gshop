<template>
  <div>
    <h2>B组件----必须登录</h2>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/b/b1">b1</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/b/b2">b2</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

 
</style>
