<template>
  <div>
    <span>{{a}}</span> <br>
    <span>{{b}}</span> <br>
    <span>{{length}}</span> <br>
    <span>{{test}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import { myMixin } from './mixins'
export default {
  mixins: [myMixin],
  data() {
    return {
      b: 'bbbbbb'
    }
  },
  computed: {
    test() {
      return 'test'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
