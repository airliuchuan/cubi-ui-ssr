<template>
  <div class="goods-list">
    <ul>
      <li class="good-item" v-for="(item,index) in data" :key="index" @click="toDetail(item.id)">
        <div class="good-banner">
          <img :src="item.image" alt="">
        </div>
        <div class="good-desc">
          <div class="good-desc-top">
            <h3>{{item.title}}</h3>
            <span>{{item.price | price}}</span>
          </div>
          <div class="good-desc-bottom">
            <span>{{item.summary}}</span>
            <cube-button :inline="true">立即剁手</cube-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    toDetail (id) {
      this.$emit('pushTo', id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.goods-list
    width: 100%
    .good-item
      margin-bottom: 10px
      background: #f8f8f8
      .good-desc
        padding: 10px 15px
        .good-desc-top
          display: flex
          justify-content: space-between
          margin-bottom: 5px
          &>span
            font-size: 15px
            color: #bd1d21
            font-weight: 900
          h3
            font-size: 18px
            color: #000
            font-weight: 900
        .good-desc-bottom
          display: flex
          justify-content: space-between
          align-items: center
          flex-wrap: nowrap
          &>span
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: 13px
          .cube-btn
            background: #bd1d21
      .good-banner
        width: 100%
        img
          width: 100%
</style>
