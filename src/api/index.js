/* 
包含n个请求函数的模块
*/
import ajax from './ajax'
// 1、根据经纬度获取位置详情 param参数需要分先后顺序
export const reqAddress = (longitude, latitude) =>
  ajax(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => ajax('/index_category', { headers: { needToken: true } })

// 3、根据经纬度获取商铺列表 注意：参数对象不用分先后顺序
export const reqShops = ({ longitude, latitude }) => ajax('/shops', { params: { latitude, longitude }, headers: { needToken: true } })

//发送短信验证码
export const reqSendCode = (phone) => ajax(`/sendcode?phone=${phone}`)

//用户名密码登陆
export const reqUserWithLogin = ({ userName, pwd, captcha }) => ajax.post('/login_pwd', { name: userName, pwd, captcha })

//手机号验证登录
export const reqPhoneWithLogin = ({ phone, code }) => ajax.post('/login_sms', { phone, code })

//使用本地token自动登录
export const reqAutoLogin = () => ajax('/auto_login', { headers: { needToken: true } })