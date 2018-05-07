<template>
  <div>
    <div class="home-search" v-show="searchShow">
      <div class="search-mask" ref="searchMask"></div>
      <div class="search-scan">
        <span class="iconfont icon-scan1"></span>
      </div>
      <div class="search-input">
        <input type="text" @click="searcHandle" placeholder="闺蜜颜值新品">
      </div>
      <div class="search-message">
        <span class="iconfont icon-messagexinxi"></span>
      </div>
    </div>
    <div class="scroll-wrap">
      <cube-scroll
        ref="scroll"
        :data="items"
        :options="options"
        :listenScroll="true"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        @scroll="onScroll"
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
        <product-list :data="items" @pushTo="toDetail"></product-list>
      </cube-scroll>
    </div>
    <transition mode="out-in" name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import ProductList from '@/components/product-list/product-list.vue'
export default {
  name: 'home-page',
  components: {
    ProductList
  },
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
          price: 268,
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 2,
          title: 'Q+时焕青春抚痕精华液2',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: 268,
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 3,
          title: 'Q+时焕青春抚痕精华液3',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: 268,
          image: 'http://p5vssvuk7.bkt.clouddn.com/product.jpg'
        },
        {
          id: 4,
          title: 'Q+时焕青春抚痕精华液4',
          summary: '预售4月30日发货】皱纹的小熨斗 青春的防腐剂',
          price: 268,
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
      searchShow: true
    }
  },
  methods: {
    searcHandle () {
      this.$router.push('/home/search')
    },
    onScroll (pox) {
      let searchOpa = Math.abs(pox.y / 50)
      if ((pox.y / 50) > 0) {
        this.searchShow = false
        return
      } else {
        this.searchShow = true
      }
      if (searchOpa >= 1) {
        searchOpa = 1
      }
      this.$refs.searchMask.style.opacity = searchOpa
    },
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
.home-search
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 50px
  display: flex
  align-items: center
  justify-content: space-between
  z-index: 1
  .search-mask
    position: absolute
    width: 100%
    height: 100%
    background: #f1f1f1
    z-index: -1
    opacity: 0
  span
    font-size: 20px
    margin: 0 5px
  .search-input
    width: 100%
    height: 25px
    border-radius: 5px
    overflow: hidden
    opacity: 0.7
    input
      background-color: #ccc
      width: 100%
      height: 100%
      text-align: center
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
.rotate:after
  content: '松开刷新'
.pull:after
  content: '下拉刷新'
</style>
