<template>
  <div>
    <span>{{a}}</span> <br>
    <span>{{c}}</span> <br>
    <span>{{length}}</span> <br>
  </div>
</template>

<script type="text/ecmascript-6">
import { myMixin } from './mixins'
export default {
  mixins: [myMixin],
  data() {
    return {
      c: 'cccccc'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
