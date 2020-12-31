/* 
对axios进行二次封装
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/
import axios from "axios"
import qs from "qs" //webpack自带的把json参数转换为urlencode的格式的库，
import { Indicator } from "mint-ui" //按需引入mint-ui

import router from '@/router'
import store from '@/vuex/store'

const instance = axios.create({
  // baseURL:'http://localhost:4000',  报错：跨域请求
  baseURL: "/api", //配置代理服务器解决跨域
  // 4. 配置请求超时的时间
  timeout: 20000,
})

//请求拦截器
instance.interceptors.request.use((config) => {
  Indicator.open() // mint-ui提示框，在请求时显示
  // config中包含当前请求的所有请求信息: method,url,data
  // 3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
  const data = config.data
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }
  //携带token的方式：1、cookie  2、请求参数 3、请求头[authorization]
  // 请求头是目前比较流行的携带token的方式
  const token = store.state.token //从vuex内取出token
  if (token) {          //进行判断，如果有，保存到请求头authorization属性中
    config.headers['authorization'] = token
  } else {            //如果没有
    if (config.headers.needToken) { //判断当前请求是否需要token，如果需要直接抛异常
      throw new Error('没有token,请重新登陆')
    }
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  // 2.异步请求成功的数据不是response, 而是response.data
  (response) => {
    Indicator.close() //mint-ui提示框，在响应时关闭
    return response.data
  },
  // 1. 统一处理请求异常
  (error) => {
    Indicator.close() //mint-ui提示框，在响应时关闭
    alert("请求出错" + error.message)
    if (!error.response) {//如果不是服务器响应的报错
      if (router.currentRoute.path !== '/login') {
        router.replace('/login') //直接跳转到login
      }
    } else if (error.response.status === 401) {
      alert('token已过期，重新登陆')
      if (router.currentRoute.path !== '/login') {
        router.replace('/login') //直接跳转到login
      }
    } else if (error.response.status === 404) {
      alert('请求资源未找到')
    } else {
      alert('请求出错')
    }
    return new Promise(() => { }) //返回一个pending状态的promise,中断promise链
  }
)
export default instance
