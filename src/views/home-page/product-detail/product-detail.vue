<template>
  <div class="full-page">
    商品详情页, 商品id是: {{id}}
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
