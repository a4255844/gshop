/* 
  //静态引入，打包时自动引入： import Search from '@/pages/Search/Search'
  //动态引入, 打包时分隔代码块: const Search = () => import('@/pages/Search/Search')
  commonJS也属于动态引入
  区别：静态引入：把所有文件打包到一个总模块内，需要写在文件首部
        路由组件懒加载：
           1). 在打包时路由组件会被单独打包(代码分隔：code split)
           2). 默认不请求加载路由组件打包文件，当请求需要路由组件时才请求加载
        动态引入：把对应的文件单独打包(代码分隔：code split)，可以写在文件的任何位置
                  配置的路由组件是函数(返回动态加载的路由组件模块)
                      函数开始是不执行的(开始不请求加载单独打包的路由组件模块)
                      当请求对应路径需要显示组件界面时,去加载路由组件打包文件
             作用：减少首屏需要加载的js文件 ==>显示更快
*/

// import Search from '@/pages/Search/Search'
// import MSite from '@/pages/MSite/MSite'
// import Order from '@/pages/Order/Order'
// import Profile from '@/pages/Profile/Profile'

const Search = () => import('@/pages/Search/Search')
// const MSite = () => import('@/pages/MSite/MSite')
const Order = () => import('@/pages/Order/Order')
const Profile = () => import('@/pages/Profile/Profile')


import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop'
import Goods from '@/pages/Shop/Goods/Goods'
import Info from '@/pages/Shop/Info/Info'
import Ratings from '@/pages/Shop/Ratings/Ratings'
import A from '@/pages/test/A'
import B from '@/pages/test/B'
import B1 from '@/pages/test/B1'
import B2 from '@/pages/test/B2'

import Review from '@/pages/Review/Review'
import SlotTest from '@/pages/Review/SlotTest/SlotTest'
import ReactiveTest from '@/pages/Review/ReactiveTest/ReactiveTest'
import ModelTest from '@/pages/Review/ModelTest/ModelTest'
import MixinTest from '@/pages/Review/MixinTest/MixinTest'
import LifeTest from '@/pages/Review/LifeTest/LifeTest'
import EventTest from '@/pages/Review/EventTest/EventTest'
import ComponentTest from '@/pages/Review/ComponentTest/ComponentTest'

export default [
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/msite',
    component: () => import('@/pages/MSite/MSite'),
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    },
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop/:id',
    props: true, // 将所有params参数转换成标签属性传递给子路由组件
    // props: toRoute => ({id: toRoute.params.id})
    component: Shop,
    children: [
      {
        path: 'goods',
        component: Goods
      },
      {
        path: 'ratings',  //简写路径
        component: Ratings
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
  },
  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B,
    children: [
      {
        path: 'b1',
        component: B1
      },
      {
        path: 'b2',
        component: B2
      }
    ]
  },
  {
    path: '/review',
    component: Review,
    children: [
      {
        path: '/review/slot',
        component: SlotTest
      },
      {
        path: '/review/mixin',
        component: MixinTest
      },
      {
        path: '/review/component',
        component: ComponentTest
      },
      {
        path: '/review/event',
        component: EventTest
      },
      {
        path: '/review/model',
        component: ModelTest
      },
      {
        path: '/review/reactive',
        component: ReactiveTest
      },
      {
        path: '/review/life',
        component: LifeTest
      },
    ]
  },

  {
    path: '/',
    redirect: '/msite'
  }
]