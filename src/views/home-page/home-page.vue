<template>
  <div>
    <div class="scroll-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
      <template slot="pulldown" slot-scope="props">
        <div
          v-if="props.pullDownRefresh"
          class="cube-pulldown-wrapper"
          :style="props.pullDownStyle">
          <div
            v-if="props.beforePullDown"
            class="before-trigger"
            :style="{paddingTop: props.bubbleY + 'px'}">
            <span :class="[props.bubbleY > 20 ? 'rotate' : 'pull']"></span>
          </div>
          <div class="after-trigger" v-else>
            <div v-if="props.isPullingDown" class="loading">
              <cube-loading></cube-loading>
            </div>
            <div v-else><span>刷新成功</span></div>
          </div>
        </div>
      </template>
        <div class="slide-wrap">
          <cube-slide ref="slide" :data="slides">
            <cube-slide-item v-for="(item, index) in slides" :key="index" @click.native="clickHandler(item, index)">
              <a :href="item.url">
                <img :src="item.image">
              </a>
            </cube-slide-item>
            <template class="dots" slot="dots" slot-scope="props">
              <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots">{{index + 1}}</span>
            </template>
          </cube-slide>
        </div>
        <div class="home-tab">
          <router-link class="home-tab-item" to="/home/introduce">
            <img src="@/assets/images/home/mo1.png" alt="商城介绍">
            <p>商城介绍</p>
          </router-link>
          <router-link class="home-tab-item" to="/home/owner">
            <img src="@/assets/images/home/mo2.png" alt="成为店主">
            <p>成为店主</p>
          </router-link>
          <router-link class="home-tab-item" to="/home/welfare">
            <img src="@/assets/images/home/mo3.png" alt="店主福利">
            <p>店主福利</p>
          </router-link>
          <router-link class="home-tab-item" to="/home/service">
            <img src="@/assets/images/home/mo7.png" alt="店主服务">
            <p>店主服务</p>
          </router-link>
        </div>
        <div class="topic">
          <router-link to="/home" class="topic-item" tag="div">
            <img src="@/assets/images/home/left.jpg" alt="">
          </router-link>
          <router-link to="/home" class="topic-item" tag="div">
            <img src="@/assets/images/home/right.jpg" alt="">
          </router-link>
        </div>
        <div class="topic-queen">
          <h3>颜值Queen</h3>
        </div>
        <div class="queen-goods-list">
          <ul>
            <li class="good-item" v-for="(item,index) in items" :key="index" @click="toDetail(item.id)">
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
      </cube-scroll>
    </div>
    <transition mode="out-in" name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'home-page',
  data () {
    return {
      slides: [
        {
          url: 'http://www.guimimall.com',
          image: 'http://p5vssvuk7.bkt.clouddn.com/slider1.jpg'
        },
        {
          url: 'http://www.guimimall.com',
          image: 'http://p5vssvuk7.bkt.clouddn.com/slider2.jpg'
        },
        {
          url: 'http://www.guimimall.com',
          image: 'http://p5vssvuk7.bkt.clouddn.com/slider3.jpg'
        }
      ],
      items: [
        {
          id: 1,
          title: 'Q+时焕青春抚痕精华液1',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: '268',
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 2,
          title: 'Q+时焕青春抚痕精华液2',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: '268',
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 3,
          title: 'Q+时焕青春抚痕精华液3',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: '268',
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 4,
          title: 'Q+时焕青春抚痕精华液4',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: '268',
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        }
      ],
      options: {
        pullDownRefresh: {
          threshold: 70,
          stop: 50,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多'
          }
        }
      },
      num: 0
    }
  },
  methods: {
    onPullingDown () {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.items.unshift({
            id: 1,
            title: 'Q+时焕青春抚痕精华液new',
            summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
            price: '268',
            image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
          })
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onPullingUp () {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          this.items.push({
            id: 1,
            title: 'Q+时焕青春抚痕精华液last',
            summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
            price: '268',
            image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
          })
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    toDetail (id) {
      this.$router.push(`/home/detail/${id}`)
    }
  }
}
</script>
<style lang="stylus" scoped>
.scroll-wrap
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 50px
  .slide-wrap
    width: 100%;
    overflow: hidden
    .cube-slide-dots
      bottom: 10px
      .my-dot
        display: inline-block
        width: 12px
        height: 4px
        background: #fdf599
        margin-left: 2px
        margin-right: 2px
      .active
        width: 6px
        height: 6px
        background: #ffffff
        border-radius: 50%
        vertical-align: bottom
    img
      width: 100%
  .home-tab
    display: flex
    justify-content: space-around
    background: #f8f8f8
    .home-tab-item
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      flex: 1
      height: 140px
      p
        margin-top: 10px
        font-weight: bolder
        font-size: 16px
        color: #000
      img
        width: 50px
        height: 50px
  .topic
    width: 100%
    display: flex
    justify-content: space-between
    .topic-item
      width: 49%
      img
        width: 100%
  .topic-queen
    width: 100%
    height: 45px
    background: #f8f8f8
    text-align: center
    line-height: 45px
    margin: 10px 0
    &>h3
      color: #9f9f9f
      font-weight: 700
      font-size: 16px
  .queen-goods-list
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
.slide-enter-active, .slide-leave-active
    transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.rotate:after
  content: '松开刷新'
.pull:after
  content: '下拉刷新'
</style>
