s<template>
  <div class="star" :class="'star-'+ size">
    <span class="star-item" :class="star" v-for="(star, index) in starsClasses" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    rating: {
      type: Number,
      required: false,
      default: 5,
    },
    size: {
      type: Number,
      required: false,
      default: 24
    }
  },
  computed: {
    /* 定义一个生成stars类名的数组
             满星：on  半星：half  空星：off
          */
    starsClasses() {
      const starsArr = [];
      //rating值向下取整，就是当前满星的个数
      let rating = Math.floor(this.rating);
      for (let index = 0; index < rating; index++) {
        starsArr.push("on"); //遍历并添加on
      }
      //如果有小数，则有一个半星
      this.rating - rating > 0 && starsArr.push("half");
      //如果当前数组长度不为5,则用空星补满
      while (starsArr.length < 5) {
        starsArr.push("off");
      }
      return starsArr;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.hal
          bg-image('./images/stars/star48_half')
        &.of
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
