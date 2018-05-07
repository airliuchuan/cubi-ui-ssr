<template>
<div>
  <router-view></router-view>
  <div class="nav-wrap">
    <router-link class="tab-item" to="/home">
      <span class="iconfont icon-dianpu"></span>
      <p>首页</p>
    </router-link>
    <router-link class="tab-item" to="/discover">
      <span class="iconfont icon-yanjing-zheng"></span>
      <p>发现</p>
    </router-link>
    <router-link class="tab-item" to="/cart">
      <span class="iconfont icon-shangpingouwudai"></span>
      <p>购物车</p>
      <span class="count" v-show="countShow">{{settleCount}}</span>
    </router-link>
    <router-link class="tab-item" to="/user">
      <span class="iconfont icon-weibiaoti2fuzhi12"></span>
      <p>我的</p>
    </router-link>
  </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'tab',
  computed: {
    ...mapGetters(['getLocalUser']),
    countShow () {
      if (this.getLocalUser) {
        if (this.getLocalUser.settleCount) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    settleCount () {
      if (this.getLocalUser) {
        if (this.getLocalUser.settleCount) {
          return this.getLocalUser.settleCount
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.nav-wrap
  position: fixed
  bottom: 0
  left: 0
  width: 100%;
  height: 50px
  display: flex
  border-top: 1px solid #c1c4cd
  .tab-item
    position: relative
    flex: 1
    text-align: center
    color: #505050
    display: flex
    flex-direction: column
    justify-content: center
    .count
      position: absolute
      border-radius: 50%;
      background: red;
      left: 50%;
      transform: translateX(4px);
      font-size: 14px;
      line-height: 15px
      display: inline-block;
      top: 0;
      width: 15px;
      height: 15px;
      color: #fff;
    span
      font-size: 25px
    p
      font-size: 13px
      margin-top: 3px
  .router-link-active
    color: rgb(189, 28, 33)
</style>
