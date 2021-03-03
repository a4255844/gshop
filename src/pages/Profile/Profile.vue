<template>
  <section class="profile">
    <Header title="我 的" />
    <section class="profile-number">
      <!-- 如果user._id已经存在，则不跳转登录界面 -->
      <a href="javascript:" class="profile-link" @click="user._id || $router.push('/login')">
        <div class="profile_image">
          <i class="iconfont iconxxhdpiShape"></i>
        </div>
        <div class="user-info">
          <p v-show="!user.phone" class="user-info-top">
            {{user.name? user.name : '注册/登录'}}
          </p>
          <p v-show="!user.name">
            <span class="user-icon">
              <i class="iconfont iconshouji"></i>
            </span>
            <span class="icon-mobile-number">{{user.phone? user.phone:'未绑定手机'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont iconarrow"></i>
        </span>
      </a>
    </section>
    <section class="profile_info_data">
      <ul class="info_data_list">
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"> <span>0.00</span>元 </span>
          <span class="info_data_bottom">
            我的余额
          </span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"> <span>0</span>个 </span>
          <span class="info_data_bottom">
            我的优惠
          </span>
        </a>
        <a href="javascript:" class="info_data_link">
          <span class="info_data_top"> <span>0</span>分 </span>
          <span class="info_data_bottom">
            我的积分
          </span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order">
      <a href="javascript:" class="my_order">
        <span class="left-icon">
          <i class="iconfont icondingdan1"></i>
        </span>
        <div class="my_order_div">
          <span>
            我的订单
          </span>
          <span class="my_order_icon">
            <i class="iconfont iconarrow"></i>
          </span>
        </div>
      </a>
      <a href="javascript:" class="my_order">
        <span class="left-icon">
          <i class="iconfont icontubiao309"></i>
        </span>
        <div class="my_order_div">
          <span>
            积分商城
          </span>
          <span class="my_order_icon">
            <i class="iconfont iconarrow"></i>
          </span>
        </div>
      </a>
      <a href="javascript:" class="my_order">
        <span class="left-icon">
          <i class="iconfont iconviptehuishiduan"></i>
        </span>
        <div class="my_order_div">
          <span>
            硅谷外卖会员卡
          </span>
          <span class="my_order_icon">
            <i class="iconfont iconarrow"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order">
      <a href="javascript:" class="my_order">
        <span class="left-icon2">
          <i class="iconfont iconloufang"></i>
        </span>
        <div class="my_order_div">
          <span>
            服务中心
          </span>
          <span class="my_order_icon">
            <i class="iconfont iconarrow"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order">
      <mt-button @click="logout" size="large" type="danger" v-if="user._id">退出登录</mt-button>
      <mt-button @click="$router.replace('/login')" size="large" style="background:#02a774; color:#fff" v-else>去登陆</mt-button>
    </section>
    <section>
      <router-link to="/a">AAA</router-link>
      &nbsp;&nbsp;
      <router-link to="/b">BBB</router-link>
      &nbsp;&nbsp;
      <router-link to="/login">去登陆</router-link>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui';
export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    logout() {
      MessageBox.confirm('确定退出吗？').then(
        action => {
          //清除数据
          this.$store.dispatch('logout')
          action
        }
      )
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl'
.profile
  width 100%
  overflow hidden
  .profile-number
    margin-top 45px
    background $green
    .profile-link
      clearFix()
      position relative
      display block
      padding 20px 10px
      color #fff
      .profile_image
        float left
        width 60px
        height 60px
        >i
          font-size 60px
      .user-info
        float left
        margin 8px 0 0 15px
        .user-info-top
          font-size 18px
          font-weight 700
          padding-bottom 10px
      .icon-mobile-number
        font-size 14px
      .arrow
        position absolute
        width 12px
        height 12px
        right 15px
        top 50%
        transform translate(0,-50%)
  .profile_info_data
    bottom-border-1px(#e4e4e4)
    width 100%
    overflow hidden
    background #fff
    .info_data_list
      display flex
      .info_data_link
        flex 1
        display flex
        height  81px
        flex-direction column
        justify-content: space-between
        align-items: center
        border-right 1px solid #f1f1f1
        .info_data_top
          font-size 14px
          color #333
          padding-top 15px
          span
            font-size 30px
            color #f90
            font-weight 700
        .info_data_bottom
          font-size 14px
          color #666
          padding-bottom 10px
      .info_data_link:nth-of-type(2)
        .info_data_top
          span
            color #ff5f3e
      .info_data_link:nth-of-type(3)
        .info_data_top
          span
            color #6ac20b
  .profile_my_order
    margin-top 10px
    background #fff
    .my_order
      display flex
      align-items center
      span
        >.iconfont
          margin 0 10px
          font-size 16px
      .my_order_div
        display flex
        flex 1
        padding 18px 10px 18px 0
        font-size 16px
        color #333
        justify-content space-between
        border-bottom 1px solid #f1f1f1
        .my_order_icon
          >.iconfont
            padding 0
            color #bbbbbb
    .my_order:nth-of-type(1)
      .left-icon
        color green
    .my_order:nth-of-type(2)
      .left-icon
        color red
    .my_order:nth-of-type(3)
      .left-icon
        color #f90
    .left-icon2
      color #02a774
</style>
