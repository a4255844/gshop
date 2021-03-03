<template>
  <div>
    <div class="shop-info" ref="info">
      <div class="info-content">
        <section class="section">
          <h1 class="section-title">配送信息</h1>
          <div class="delivery">
            <div>
              <span class="delivery-icon">{{info.description}}</span>
              <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
            </div>
            <div class="delivery-money">
              配送费￥{{info.deliveryPrice}}
            </div>
          </div>
        </section>
        <section class="section">
          <h1 class="section-title">活动与服务</h1>
          <div class="activity">
            <div class="activity-item" :class="supportClasses[support.type]" v-for="(support,index) in info.supports" :key="index">
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </div>
          </div>
        </section>
        <section class="section">
          <h1 class="section-title">商家实景</h1>
          <div class="pic-wrapper" ref="pics">
            <ul class="pic-list" ref="picsUl">
              <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
                <img width="120" height="90" :src="pic">
              </li>
            </ul>
          </div>
        </section>
        <section class="section">
          <h1 class="section-title">商家信息</h1>
          <ul class="detail">
            <li>
              <span class="bold">品类</span>
              <span>{{info.category}}</span>
            </li>
            <li>
              <span class="bold">商家电话</span>
              <span>{{info.phone}}</span>
            </li>
            <li>
              <span class="bold">地址</span>
              <span>{{info.address}}</span>
            </li>
            <li>
              <span class="bold">营业时间</span>
              <span>{{info.workTime}}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
export default {
  computed: {
    ...mapState({
      info: state => state.shop.shop.info || {}
    }),
    supportClasses() {
      return ['activity-green', 'activity-red', 'activity-orange']
    }
  },
  mounted() {
    if (this.info.name) {
      this._initBScroll()
    }
  },
  methods: {
    _initBScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.info, {
          click: true
        })
        //给ul指定宽度
        const ul = this.$refs.picsUl
        const liWidth = 120
        const space = 6
        const liCount = this.info.pics.length
        ul.style.width = ((liWidth + space) * liCount - space) + 'px'
        this.picsScroll = new BScroll(this.$refs.pics, {
          click: true,
          scrollX: true
        })
      }
    },

  },
  watch: {
    info() {
      this.$nextTick(() => {
        this._initBScroll()
      })
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins.styl'
.shop-info
  width 100%
  height calc(100vh - 221px)
  background #fff
  overflow hidden
  .section
    padding 16px 14px 14px 14px
    color #666
    border-bottom 1px solid #eee
    position relative
    .section-title
      color #000
      font-weight 700
      font-size 16px
    .delivery
      margin-top 16px
      line-height 18px
      font-size 13px
      .delivery-icon
        width 55px
        font-size 11px
        margin-right 10px
        display inline-block
        text-align center
        color #fff
        background-color #0097ff
        padding 1px 0
        border-radius 4px
      .delivery-money
        margin-top 5px
    .activity
      margin-top 16px
      .activity-item
        margin-bottom 12px
        display flex
        font-size 13px
        align-items center
        &.activity-green
          .content-tag
            background $green
        &.activity-red
          .content-tag
            background rgb(240, 115, 115)
        &.activity-orange
          .content-tag
            background rgb(241, 136, 79)  
        .content-tag
          display inline-block
          border-radius 2px
          width 36px
          height: 18px
          margin-right 10px
          color #fff
          font-style normal
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
    
    .pic-wrapper
      width 100%
      overflow hidden
      margin-top 16px
      white-space nowrap
      .pic-list
        .pic-item
          display inline-block
          margin-right 6px
          width 120px
          height 90px
          &:last-child
            margin 0
    .detail
      >li
        padding 16px 12px 16px 0
        display flex
        justify-content space-between
        align-items center 
        font-size 13px
        line-height 16px
        bottom-border-1px(#ddd)
        .bold
          font-weight 700
          color #333     
            
        
    
 
</style>
