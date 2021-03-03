<template>
  <section class="msite">
    <!-- msite头部 -->
    <Header :title="address.name || '定位中...'">
      <!-- vue插槽solt，自动传递给组件内的left 和 right插槽 -->
      <div class="header-left" slot="left">
        <i class="iconfont iconsearch"></i>
      </div>
      <div class="header-right" slot="right">
        <span>登录|注册</span>
      </div>
    </Header>

    <!-- msite头部 -->
    <!-- nav导航 -->
    <nav class="msite-nav">
      <div ref="sc1" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs, index) in categorysArr" :key="index">
            <div class="link_to_food" v-for="(c, index) in cs" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + c.image_url" />
              </div>
              <span>{{ c.title }}</span>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!-- nav导航 -->
    <!-- 附近商家 -->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont iconliebiao"></i>
        <span>附近商家</span>
      </div>
      <div class="shop_container">
        <ul class="shop_list" v-if="shops.length > 0">
          <li class="shop_li" v-for="shop in shops" :key="shop.id" @click="$router.push(`/shop/${shop.id}`)">
            <!--  
                  配置对象，指定name/params跳转失败
                   @click="$router.push({
                    name:'shop',
                    params:{
                      id:shop.id
                    }
                  })"
            -->
            <div class="shop_left">
              <img :src="'https://fuss10.elemecdn.com' + shop.image_path" />
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
                <ul class="shop_detail_ul">
                  <li class="supports" v-for="(support, index) in shop.supports" :key="index">
                    {{ support.icon_name }}
                  </li>
                </ul>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <!-- stars组件 -->
                  <Stars :rating="shop.rating" />
                  <div class="rating_section">{{ shop.rating }}</div>
                  <div class="star_section">
                    月售{{ shop.recent_order_num }}单
                  </div>
                </section>
                <section class="shop_rating_order_right">
                  <span class="delivery_style delivery_right">{{
                    shop.delivery_mode.text
                  }}</span>
                </section>
              </section>
              <section class="shop_distance">
                <p class="shop_delivery_msg">
                  <span>￥{{ shop.float_minimum_order_amount }}起送</span>
                  <span class="segmentation">/</span>
                  <span>{{ shop.piecewise_agent_fee.tips }}</span>
                </p>
              </section>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li>
            <img src="./images/shop_back.svg" alt="loding" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loding" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loding" />
          </li>
          <li>
            <img src="./images/shop_back.svg" alt="loding" />
          </li>
        </ul>
      </div>
    </div>

    <!-- 附近商家 -->
  </section>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import { mapState } from 'vuex'
import chunk from 'lodash/chunk' //按需引入，只引入我当前需要用到的函数
import 'swiper/css/swiper.min.css'
import Stars from '@/components/Stars/Stars'
export default {
  components: {
    Stars
  },
  /* 缓存后无法使用mounted获取数据 */
  async activated() {
    this.$store.dispatch('getShops')
    await this.$store.dispatch('getCategorys') // dispatch()返回的promise在状态更新且界面更新后才成功
    // 创建Swiper对象的时机: 必须在列表数据显示之后
    new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    })

  },
  /*  async mounted() {
     this.$store.dispatch('getShops')
     // 异步获取分类列表到vuex的state
     // this.$store.dispatch('getCategorys', () => {// categorys状态数据更新了
     //   // 在此次数据变化导致界面更新后执行
     //   // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
     //   this.$nextTick(() => {
     //     // 创建Swiper对象的时机: 必须在列表数据显示之后
     //     new Swiper('.swiper-container', {
     //       loop: true, // 循环模式选项
     //       // 如果需要分页器
     //       pagination: {
     //         el: '.swiper-pagination',
     //       },
     //     })
     //   })
     // })
     await this.$store.dispatch('getCategorys') // dispatch()返回的promise在状态更新且界面更新后才成功
     // 创建Swiper对象的时机: 必须在列表数据显示之后
     new Swiper('.swiper-container', {
       loop: true, // 循环模式选项
       // 如果需要分页器
       pagination: {
         el: '.swiper-pagination',
       },
     })
   }, */
  /*
   问题：swiper在异步请求获取数据之后，不能写在mounted内，原因是：swiper运行在获取数据重构页面之前
   解决方案：
       1.使用watch和Vue自带的nextTick方法
       2.使用dispatch的第二个数据参数(callback) + nextTick
       3.使用dispatch返回的Promise
  */
  computed: {
    ...mapState({
      /* 统一管理vuex数据时所有的数据都在总state内 */
      // address: 'address',
      // categorys: 'categorys',
      // shops: 'shops'
      /* 分别管理vuex数据时，总state内的数据管理对应的模块，对应的模块内储存数据 */
      address: state => state.msite.address,
      categorys: state => state.msite.categorys,
      shops: state => state.msite.shops,
    }),

    /*
    将categorys一维数组，转换成二维数组
    */
    categorysArr() {
      const { categorys } = this
      const bigArr = []  //外层大数组，需包含smallArr
      let smallArr = []  //内层小数组
      categorys.forEach(category => {
        //当smallArr.length为0时，把smallArr添加到bigArr中
        !smallArr.length && bigArr.push(smallArr)
        smallArr.push(category)    //在smallArr中添加元素
        if (smallArr.length === 8) smallArr = []  //如果长度为8，则重新定义为空数组
      });
      return bigArr
    },
    /*
    使用lodash工具库实现合并二维数组
    */
    categorysArr2() {
      return chunk(this.categorys, 8)
    }
  },
  //  watch : {
  //  1.使用watch和Vue自带的nextTick方法
  /*
   watch 监视数据执行顺序
     1.更新数据
     2.立即同步调用监视的回调函数
     3.异步更新界面
     所以此时还不能满足swiper的运行条件
     nextTick方法: 可以将回调延迟到下次DOM更新循环之后执行，在修改数据后立即使用它，然后后等待DOM更新
  */
  /* categorys() {
      this.$nextTick(
      new Swiper (this.$refs.sc1, {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })
   )
  } */

  //  }



}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixins.styl'
   .msite-nav
     bottom-border-1px(#e4e4e4)
     height 200px
     margin-top 45px
     overflow hidden
     color #fff
     background #fff
    .swiper-slide
      display flex
      flex-wrap: wrap
      .link_to_food
       height 73px
       flex 25%
       text-align center
       padding-bottom 25px
       .food_container
         height 60px
         display block
         img
           width 50px
           height 50px
           padding-bottom 10px
       span
         height 13px
         color #666
   .msite_shop_list
     background #fff
     margin-top 10px
     .shop_header
       padding 10px 10px 0
       >span
         color #999
         font-size 14px
         margin-left 6px
     .shop_container
       margin-bottom 50px
       .shop_li
         height 105px
         padding 15px 8px
         box-sizing border-box
         bottom-border-1px(#ccc)
         .shop_left
           float left
           box-sizing border-box
           width 23%
           height 75px
           padding-right 10px
           >img
             display block
             width 100%
             height 100%
         .shop_right
           float right
           width 77%
           .shop_detail_header
             clearFix()
             .shop_title
               float left
               width 200px
               color #333
               font-size 16px
               font-weight 700
               &::before
                 content "品牌"
                 font-size 11px
                 color #333333
                 background #ffd930
                 margin-right 5px
                 border-radius 3px
                 padding 2px
             .shop_detail_ul
               float right
               display flex
               .supports
                 flex:1
                 font-size 10px
                 color #999999
                 border 1px solid #f1f1f1
                 padding 2px
                 border-radius 2px
           .shop_rating_order
             clearFix()
             width 100%
             margin-top 18px
             margin-bottom 8px
             .shop_rating_order_left
               float left
               color #ff9a0d
               .rating_section
                 float left
                 font-size 10px
                 margin-left 4px
               .star_section
                 float left
                 color #666666
                 font-size 10px
                 transform scale(0.8)
             .shop_rating_order_right
               float right
               .delivery_style
                 transform-origin 35px 0
                 font-size 12px
                 transform scale(.7)
                 display inline-block
                 padding 1px
                 border-radius 2px
               .delivery_right
                 border 1px solid #02a774
                 color #02a774
           .shop_distance
             width 100%
             font-size 12px
             .shop_delivery_msg
               transform-origin 0
               transform scale(.9)
               color #666
               .segmentation
                 margin 0 5px
                 color #ccc
</style>
