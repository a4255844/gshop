import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN' //提示信心本地化需要引入

Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  //设置属性对应的中文
  attributes: {
    phone: '手机号',
    code: '验证码',
    pwd: '密码',
    userName: '用户名/邮箱/手机号',
    captcha: '验证码',
  },
})

VeeValidate.Validator.extend('phone', {
  validate: (value) => {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
      value
    )
  },
  getMessage: (field) => field + '必须是11位手机号码',
})

VeeValidate.Validator.extend('code', {
  validate: (value) => {
    return /^\d{4,6}$/.test(value)
  },
  getMessage: (field) => field + '必须是4-6位数字',
})
