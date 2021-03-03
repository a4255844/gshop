<template>
  <div class="ratings" ref="allRatings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合得分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Stars :size="36" :rating="info.serviceScore" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评价</span>
            <Stars :size="36" :rating="info.foodScore" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type">
          <span class="block" :class="{active:showRateType===2}" @click=" showRateType=2">
            全部<span class="count">{{ratings.length}}</span>
          </span>
          <span class="block" :class="{active:showRateType===0}" @click="showRateType = 0">
            满意<span class="count">{{positiveTexts.length}}</span>
          </span>
          <span class="block" :class="{active:showRateType===1}" @click="showRateType = 1">
            不满意<span class="count">{{ratings.length - positiveTexts.length}}</span>
          </span>
        </div>
        <div class="switch" :class="{on:showText}" @click="showText =!showText">
          <span class="iconfont iconcheck"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index" v-show="showText ? rating.text:true">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Stars :rating="rating.score" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont" :class="rating.rateType===0?'iconthumbup':'iconthumb-down' "></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime|date}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Stars from '@/components/Stars/Stars'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import dayjs from 'dayjs'
export default {
  components: {
    Stars
  },
  data() {
    return {
      showRateType: 2,  //showRateType = 0 显示好评， =1 显示差评 =2 显示所有
      showText: false   //showText只显示有内容的评价，默认为false
    }
  },
  computed: {
    ...mapState({
      info: state => state.shop.shop.info || {},
      ratings: state => state.shop.shop.ratings || [],
      positiveTexts() {
        return this.ratings.filter(rating => rating.rateType === 0)
      },
      filterRatings() {
        const { showRateType, ratings } = this
        if (showRateType === 2) {
          return ratings
        } else {
          return ratings.filter(rating => rating.rateType === showRateType)
        }
      }

    })
  },
  mounted() {
    if (this.ratings.length > 0) {
      this._initBScroll()
    }
  },
  methods: {
    _initBScroll() {
      this.scroll = new BScroll(this.$refs.allRatings, {
        click: true
      })
    }
  },
  watch: {
    ratings() {
      this.$nextTick(() => {
        this._initBScroll()
      })
    }
  },


  /* 定义格式化购买日期的过滤器 */
  filters: {
    date: function (value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }


}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins.styl'
.ratings
  position absolute
  top 221px
  left 0
  bottom 0
  width 100%
  background #fff
  overflow hidden
  .overview
    display flex
    padding 18px 0 
    .overview-left 
      width 137px
      padding 6px 0
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align center
      .score
        font-size 24px
        margin-bottom 6px
        line-height 28px
        color #f90
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
      .rank
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px  
      .score-wrapper
        margin-bottom 8px
        .title
          display inline-block
          line-height 18px
          color #07111b
          font-size 12px
        .star
          display inline-block
          margin 0 12px
        .score
          font-size 12px
          color #f90
          line-height 18px
          display inline-block
          vertical-align: top
      .delivery-wrapper
        .title
          font-size 12px
          color #07111b
          line-height 18px
        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
  .split
    height 16px
    width 100%
    border-top 1px solid rgba(7,17,27,0.1)    
    border-bottom 1px solid rgba(7,17,27,0.1)   
    background #f3f5f7
  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        font-size 12px
        line-height 16px
        border-radius 2px
        color #4d555d
        background rgba(77,85,93,0.2)
        &.active
          background $green
          color #fff
        .count
          margin-left 2px
          font-size 12px
    .switch
      padding: 12px 18px
      line-height: 24px
      height 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .iconcheck
          color $green
      .iconcheck
        font-size 24px
        display inline-block
        margin-right 4px
        vertical-align top
      .text
        display inline-block
        font-size 12px
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        width 28px
        margin-right 12px
        >img
          width 28px
          height 28px
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          clearFix()
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .iconthumbup,.iconthumb-down,.item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px 
          .iconthumbup
            color $yellow
          .iconthumb-down
            color: rgb(147, 153, 159)
          .item
            padding 0 6px
            margin 0 8px 4px 0
            border 1px solid rgba(7,17,27,0.1)
            border-radius 1px
            color #93999f
            background #fff
            line-height 16px
        .time
          font-size 12px
          position absolute
          top 0
          right 0
          color #93999f
          line-height: 12px

            
        
</style>
