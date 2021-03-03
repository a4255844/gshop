/* 
使用mockjs提供mock接口数据,无需暴露此模块，只要代码运行即可访问模拟的接口
引入到入口文件，打包时自动运行文件
*/
import Mock from 'mockjs'
import data from './data.json'  //得到js对象，自动将JSON转换成js对象
import shops from './shops.json'

/* 模拟接口地址，并返回数据 */
Mock.mock('/api/goods', { code: 0, data: data.goods })
Mock.mock('/api/info', { code: 0, data: data.info })
Mock.mock('/api/ratings', { code: 0, data: data.ratings })

// 根据请求在id参数返回对应的商家数据
Mock.mock(/^\/api\/shop\/\d+$/, function (options) { // /api/shop/12
  // 得到请求params参数id
  const id = options.url.substring(10)
  // 找到对应shops
  const shop = shops.find(shop => shop.id == id)
  // console.log('/api/shop', options, shop || shops[0])
  // 返回一个动态数据
  return Mock.mock({ code: 0, data: shop || shops[0] })
}) // 
// console.log('mockjs');