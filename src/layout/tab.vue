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
    </router-link>
    <router-link class="tab-item" to="/user">
      <span class="iconfont icon-weibiaoti2fuzhi12"></span>
      <p>我的</p>
    </router-link>
  </div>
</div>
</template>
<script>
export default {

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
    flex: 1
    text-align: center
    color: #505050
    display: flex
    flex-direction: column
    justify-content: center
    span
      font-size: 25px
    p
      font-size: 13px
      margin-top: 3px
  .router-link-active
    color: rgb(189, 28, 33)
</style>
