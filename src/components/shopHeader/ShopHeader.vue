<template>
  <div class="shop-header">
    <nav class="shop-nav" :style="{backgroundImage: `url(${info.bgImg})`}">
      <a href="javascript:;" class="back" @click="$router.replace('/msite')">
        <i class="iconfont iconhtmal5icon37"></i>
      </a>
    </nav>
    <div class="shop-content">
      <img :src="info.avatar" class="content-image">
      <div class="header-content">
        <h2 class="content-title" @click="isShowBulletin=true">
          <span class="content-tag">
            <span class="mini-tag">品牌</span>
          </span>
          <span class="content-name">{{info.name}}</span>
          <i class="iconfont iconjiantou1"></i>
        </h2>
        <div class="shop-message">
          <span>{{info.score}}</span>
          <span>月售{{info.sellCount}}单</span>
          <span>{{info.description}}</span>
          <span>约{{info.deliveryTime}}分钟</span>
          <span>距离{{info.distance}}</span>
        </div>
        <p class="shop-notice ellipsis">
          {{info.bulletin}}
        </p>
      </div>
    </div>

    <!-- 
      初始显示异常：Cannot read property 'xxx' of undefined
      原因：初始数据是一个空对象，但表达式 a.b.c(三层)
      解决：
          正确：v-if  在没有数据时比解析/编译这块模板
          错误：v-show  在没有数据是也会解析/编译这块模板 ==>它控制的是样式来显示隐藏
     -->
    <div class="shop-header-discounts" v-if="info.supports" @click="isShowSupports=true">
      <div class="discounts-left">
        <span class="activity" :class="supportsClasses[info.supports[0].type]">
          <span class="content-tag">
            <span>{{info.supports[0].name}}</span>
          </span>
        </span>
        <span class="activity-content ellipsis">
          {{info.supports[0].content}}
        </span>
      </div>
      <div class="discounts-right">
        {{info.supports.length}}个优惠
      </div>
    </div>
    <transition name="fade">
      <div class="shop-brief-modal" v-show="isShowBulletin">
        <div class="brief-modal-content">
          <h2 class="content-title">
            <span class="content-tag">
              <span class="mini-tag">品牌</span>
            </span>
            <span class="content-name">
              {{info.name}}
            </span>
          </h2>
          <ul class="brief-modal-msg">
            <li>
              <h3>{{info.score}}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{info.sellCount}}单</h3>
              <p>月售</p>
            </li>
            <li>
              <h3>{{info.description}}</h3>
              <p>约{{info.deliveryTime}}分钟</p>
            </li>
            <li>
              <h3>{{info.deliveryPrice}}元</h3>
              <p>配送费用</p>
            </li>
            <li>
              <h3>{{info.distance}}</h3>
              <p>距离</p>
            </li>
          </ul>
          <h3 class="brief-modal-title">
            <span>公告</span>
          </h3>
          <div class="brief-modal-notice">
            {{info.bulletin}}
          </div>
          <div class="mask-footer" @click="isShowBulletin=false">
            <span class="iconfont iconicon_close"></span>
          </div>
        </div>
        <div class="brief-modal-cover" @click="isShowBulletin=false"></div>
      </div>
    </transition>
    <transition name="move">
      <div class="activity-sheet" v-show="isShowSupports">
        <transition name="move1">
          <div class="activity-sheet-content" v-show="isShowSupports">
            <h2 class="activity-sheet-title">优惠活动</h2>
            <ul class="list">
              <li class="activity-item" :class="supportsClasses[support.type]" v-for="(support,index) in info.supports" :key="index">
                <span class="content-tag">
                  <span class="mini-tag">{{support.name}}</span>
                </span>
                <span class="activity-content">
                  {{support.content}}
                </span>
              </li>
            </ul>
            <div class="activity-sheet-close" @click="isShowSupports=false">
              <span class="iconfont iconicon_close"></span>
            </div>
          </div>
        </transition>
        <div class="activity-sheet-cover" @click="isShowSupports=false"></div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
// import { RECEIVE_INFO } from '@/vuex/mutations_type.js'
export default {
  data() {
    return {
      supportsClasses: ['activity-green', 'activity-red', 'activity-orange'],
      isShowBulletin: false,
      isShowSupports: false

    }
  },
  computed: {
    ...mapState({
      info: state => state.shop.shop.info || {}
    })
  },
  methods: {
    showDetail(event) {
      this.isShow = true
      console.log(event);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shop-header
  height 100%
  overflow hidden
  .shop-nav
    height 50px
    position relative
    background-size cover
    background-repeat no-repeat
    .back
      color #fff
      >i
        position absolute
        top 50%
        transform translateY(-50%)
        left 6px
        font-size 26px
  .shop-content
    padding 30px 20px 5px
    display flex
    text-align center
    .content-image
      width 66px
      height 66px
      background #fff
      position absolute
      left 50%
      top 10px
      transform translateX(-50%)
      box-shadow 0 0 0.4vw 0 rgba(0,0,0,0.2)
    .header-content
      flex 1
      width 72%
      .content-title
        display flex
        align-content center
        justify-content center
        .content-tag
          width 36px
          height 18px
          text-align center
          background-image linear-gradient(90deg, #fff100, pink);
          margin-right 10px
          border-radius 3px
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            font-weight 600
            transform scale(.5)
            transform-origin 0 0
            display flex
            justify-content center
            align-items center
        .content-name
          font-weight 700
          font-size 20px 
        >i
          font-size 21px
      .shop-message
        height 12px
        margin-top 8px
        >span 
          margin-right 8px
      .shop-notice
        width 63%
        margin 8px auto 10px
        color #999
  .shop-header-discounts
    display flex
    margin 0 30px
    padding 5px 7px
    border 1px solid #eee
    align-items center
    font-size 12px
    color #666
    .discounts-left
      flex 1
      display flex
      overflow hidden
      .activity
        display flex
        align-items center
        .content-tag
          border-radius 1px
          width 25px
          height 13px
          margin-right 5px
          color #fff
          font-style normal
          font-weight 700
          position relative
          background-color rgb(112, 188, 70)
          >span
            position: absolute;
            left: 0;
            top: 0;
            right: -100%;
            bottom: -100%;
            font-size: 0.48rem;
            font-weight: 600;
            transform: scale(0.5);
            transform-origin: 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
    .discounts-right
      width 50px
      position relative
      padding-right 10px
      text-align right 
      &::after
        content ""
        display block
        border-style solid
        border-width 4px 4px 0
        border-color rgba(0, 0, 0, .57) transparent transparent
        position absolute
        top 50%
        transform translateY(-50%)
        right 0
  .shop-brief-modal
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 56
    display flex
    justify-content center
    align-items center
    flex-direction column
    color #333
    &.fade-enter-active,&.fade-leave-active
      transition opacity .5s
    &.fade-enter,&.fade-leave-to
      opacity 0
    .brief-modal-content
      position relative
      width 80%
      padding 25px 20px
      border-radius 10px
      background #fff
      z-index 99
      .content-title
        font-size 20px
        display flex
        align-items center
        justify-content center
        .content-tag
          width 36px
          height 18px
          margin-right 10px
          color #6a3709
          background-image linear-gradient(90deg, #fff100, pink)
          border-radius 2px
          position relative
          .mini-tag
            position absolute
            left 0
            top 0
            right -100%
            bottom -100%
            font-size 24px
            transform scale(.5)
            transform-origin 0 0
            display flex
            align-items center
            justify-content center
        .content-name
          font-weight 700
      .brief-modal-msg
        display flex
        margin 20px -10px 0 
        li
          flex 1
          text-align center
          >h3
            font-size 15px
            font-weight 700
            color #333   
            margin-bottom 8px
          >p
            color #999
            font-size 12px
      .brief-modal-title
        margin 15px auto 
        text-align center
        width 80px
        background-image linear-gradient(90deg, #fff, #333 50%, #fff)
        background-size 100% 1px
        background-repeat no-repeat
        background-position 50%
        >span
          font-size 12px
          padding 0 6px
          color #999
          background-color #fff
      .brief-modal-notice
        font-size 13px
        line-height 1.54
        color #333
        overflow-y auto
      .mask-footer
        position absolute
        left 50%
        bottom -60px
        transform translateX(-50%)
        border-radius 50%
        padding 6px
        border 1px solid rgba(255, 255, 255, .7)
        >span 
          color rgba(255, 255, 255, .7)
    .brief-modal-cover
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background rgba(0,0,0,0.5)    
      z-index 1
  .activity-sheet
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 99
    &.move-enter-active,&.move-leave-active
      transition opacity .5s
    &.move-enter,&.move-leave-to
      opacity 0
    .activity-sheet-content
      position absolute
      background #f5f5f5  
      left 0
      bottom 0
      right 0
      padding 20px 30px
      box-shadow 0 -1px 5px 0 rgba(0, 0, 0, .4)
      z-index 100
      will-change transform
      color #333
      transform translateY(0)
      &.move1-enter-active,&.move1-leave-active
        transition all .5s
      &.move1-enter,&.move1-leave-to
        transform translateY(100%)
      .activity-sheet-title
        text-align center
        font-size 20px
        font-weight 700
        margin-bottom 20px
      .list
        overflow-y hidden
        height 160px
        font-size 13px 
        .activity-item
          margin-bottom 12px
          display flex
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            width 36px
            height 18px
            margin-right 10px
            border-radius 2px
            color #ffffff
            position relative
            .mini-tag
              position absolute
              top 0
              left 0
              bottom -100%
              right -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              justify-content center
              align-items center
      .activity-sheet-close
        position absolute
        right 1px
        top 8px
        width 25px
        height 25px
    .activity-sheet-cover
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index 99
      opacity: 1
      background rgba(0,0,0,0.5)
      // &.move-enter-active, &.move-leave-active
      //   transition: opacity .5s
      // &.move-enter, &.move-leave-to
      //   opacity: 0
      
              
                

                

        
            
            
        
      
      
          
          
               
        
        
      
      
        
    
 
</style>
