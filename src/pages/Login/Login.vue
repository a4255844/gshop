<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: isShowMsm }" @click="isShowMsm = true">短信登录</a>
          <a href="javascript:;" :class="{ on: !isShowMsm }" @click="isShowMsm = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <!-- 手机验证登录 -->
          <div :class="{ on: isShowMsm }">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" name="phone" v-validate="'required|phone'" />
              <span style="color: red" v-show="errors.has('phone')">{{errors.first("phone")}}</span>
              <button :disabled="!isRightPhone || countDownTime > 0" class="get_verification" :class="{ right_phone_number: isRightPhone }"
                @click.prevent="sendCode">
                {{countDownTime ? `短信已发送(${countDownTime})` : "获取验证码"}}
              </button>
            </section>
            <section class="login_verification">
              <input v-model="code" type="tel" maxlength="8" placeholder="验证码" name="code" v-validate="'required|code'" />
              <span style="color: red" v-show="errors.has('code')">{{errors.first("code")}}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 用户名/密码登录 -->
          <div :class="{ on: !isShowMsm }">
            <section>
              <section class="login_message">
                <input v-model="userName" type="tel" maxlength="11" placeholder="手机/邮箱/用户名" name="userName" v-validate="'required'" />
                <span style="color: red" v-show="errors.has('userName')">{{errors.first("userName")}}</span>
              </section>
              <section class="login_verification">
                <input v-model="pwd" :type="isShowPwd ? 'tel' : 'password'" maxlength="8" placeholder="密码" v-validate="'required'" name="pwd" />
                <span style="color: red" v-show="errors.has('pwd')">{{errors.first("pwd")}}</span>
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{ right: isShowPwd }"></div>
                  <span class="switch_text">{{ isShowPwd ? "abc" : "" }}</span>
                </div>
              </section>
              <section class="login_message">
                <input v-model="captcha" type="text" maxlength="11" placeholder="验证码" v-validate="'required'" name="captcha" />
                <span style="color: red" v-show="errors.has('captcha')">{{errors.first("captcha")}}</span>
                <img src="http://localhost:4000/captcha" class="get_verification" @click="getCaptcha" ref="captchaImg" />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">{{$t('login_login')}}</button>
        </form>
        <a href="javascript:;" class="about_us">{{$t('login_aboutUs')}}</a>
      </div>
      <a href="javascript:;" class="goback" @click="$router.back()">
        <i class="iconfont iconhtmal5icon37"></i>
      </a>
      <button @click="toggleLanguage">切换语言</button>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
// import { reqSendCode } from '@/api'
import { Toast } from 'mint-ui'
export default {
  name: "Login",
  data() {
    return {
      isShowMsm: true, //true: 显示使用短信验证码登录界面  false: 显示使用用户名密码登录界面
      phone: "", //手机用户输入的手机号
      isShowPwd: false, // 控制是否显示密码值
      countDownTime: 0, //控制发送验证码的倒计时
      userName: '',
      code: '',
      pwd: '',
      captcha: '',
    };
  },
  computed: {
    isRightPhone() {
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone);
    },
  },
  methods: {
    async sendCode() {
      this.countDownTime = 5;
      //如果countDownTime的值为0，清除定时器
      let intervalId = setInterval(() => {
        this.countDownTime--;
        this.countDownTime === 0 && clearInterval(intervalId);
      }, 1000)
      // 向后台发送请求获取验证码，不用共享的数据不需要vuex
      const result = await this.$API.reqSendCode(this.phone)
      console.log(result);
      if (result.code === 0) {
        alert('短信已发送')
      } else {
        alert('短信发送失败')
      }
    },
    getCaptcha() {
      // script img link 的src都可以直接访问在线内容 即发请求
      //直接赋值可能造成不能发送请求的问题，所有需要加时间戳解决此问题
      this.$refs.captchaImg.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
    async login() { //对表单进行验证：前端验证
      const names = this.isShowMsm ? ['phone', 'code'] : ['userName', 'pwd', 'captcha'] //根据当前表单项进行筛选
      //默认对所有表单进行验证,如果传入一个名为names的数组则指定验证
      let success = await this.$validator.validateAll(names)
      let result
      if (success) { //前端验证成功
        const { isShowMsm, phone, code, userName, pwd, captcha } = this
        if (isShowMsm) { //判断用户当前所在页面：手机验证
          result = await this.$API.reqPhoneWithLogin({ phone, code })
          if (result.code === 1) { //如果失败提示验证码错误
            alert('验证码错误！')
          }
        } else {  //用户名密码 登录
          result = await this.$API.reqUserWithLogin({ userName, pwd, captcha })
          console.log(result);
          if (result.code === 1) {
            alert(result.msg) //后端返回 错误提示
            this.getCaptcha()  //更换图片验证码
            this.captcha = ''  //清空表单数据
          }
        }
      }
      //登录成功统一走这里
      if (result.code === 0) {
        Toast({
          message: '登陆成功',
          position: 'top'
        })
        //将用户信息保存至vuex
        this.$store.dispatch('getUserInfo', result.data)
        this.$router.replace('/profile') //跳转路由
      }
    },
    /* 切换语言 */
    toggleLanguage() {
      const locale = this.$i18n.locale === 'zh_CN' ? 'en' : 'zh_CN'
      this.$i18n.locale = locale
      localStorage.setItem('locale_key', locale)
    }
  },

  /* 
    在当前组件对象被创建前调用，不能直接访问this(不是组件对象)
    但可以通过next(component => {}),再回调函数中访问组件对象
  */
  beforeRouteEnter(to, from, next) {
    next(comp => {  //回调函数在组件对象创建后回调执行，并且把当前组件对象传入回调函数
      const token = comp.$store.state.user.token
      //如果已经登录强制跳转到个人中心，没有登陆则放行
      if (token) {
        next('/profile')
      } else {
        next()
      }
    })
  }

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import '../../assets/stylus/mixins.styl'
  .loginContainer
    background #fff
    width 100%
    height 100%
    .loginInner
      padding-top  60px
      width 80%
      margin 0 auto
      .login_logo
        font-size 40px
        color #02a774
        text-align center
        font-weight 700
      .login_header_title
        text-align center
        padding-top 40px
        >a
          font-size 14px
          color #333333
          padding-bottom 4px
          &:first-child
            margin-right 40px
        .on
          border-bottom 2px solid #02a774
          font-weight 700
          color #02a774

  .login_content
    >form
      >div
        display none
        &.on
          display block
  .login_message,.login_verification
    position relative
    margin-top 16px
    height 48px
    font-size 14px
    background #fff
    input
      padding-left 10px
      width 100%
      height 100%
      font-size 14px
      box-sizing border-box
      border 1px solid #dddddd
      outline 0
      border-radius 4px
      &:focus
        border 1px solid #02a774
    .get_verification
      position absolute
      right 10px
      top 50%
      transform translateY(-50%)
      border 0
      color #cccccc
      font-size 14px
      background: transparent
      &.right_phone_number
        color #000
  .login_hint
    margin-top 12px
    font-size 14px
    color #999
    line-height 20px
    a
      color #02a774
  .login_verification
    .switch_button
      font-size 12px
      border 1px solid #ddd
      border-radius 8px
      transition background-color .3s,border-color .3s
      padding 0 6px
      width 30px
      height 16px
      line-height 16px
      color #fff
      position absolute
      top 50%
      right 10px
      transform translateY(-50%)
      &.off
        background #fff
      &.on
        background #02a774
      >.switch_circle
        position absolute
        top -1px
        left -1px
        width 16px
        height 16px
        border 1px solid #ddd
        border-radius 50%
        background #fff
        box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
        transition transform .3s
        &.right
          transform translateX(27px)
  .login_submit
    display block
    width 100%
    height 42px
    margin-top 30px
    border-radius 4px
    background #02a774
    color #fff
    text-align center
    font-size 16px
    line-height 42px
    border 0
  .about_us
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
  .goback
    position absolute
    top 8px
    left 8px
    width 30px
    height 30px
    >i
      font-size 25px
</style>
