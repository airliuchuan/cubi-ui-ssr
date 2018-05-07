<template>
<transition name="left" mode="out-in">
  <div class="login-wrap full-page">
    <div class="login-logo">
      <img src="@/assets/images/login-logo.png" alt="">
    </div>
    <div class="login-form">
      <div class="login-form-item">
        <input type="text" v-model="mobile" placeholder="请输入手机号" autofocus>
        <cube-validator v-model="mobileValid" :model="mobile" :rules="mobileRules" :messages="mobileMessages"></cube-validator>
      </div>
      <div class="login-form-item">
        <input type="text" v-model="code" placeholder="请输验证码" autofocus>
        <cube-validator v-model="codeValid" :model="code" :rules="pwdRules" :messages="pwdMessages"></cube-validator>
      </div>
      <div class="protocol">
        <div class="protocol-checkox" @click="onChecked">
          <input type="checkbox" v-model="checked">
          <span>阅读并同意</span>
        </div>
        <router-link to="/login/protocol" tag="span" class="protocol-user">《用户协议》</router-link>
      </div>
      <div class="login-btn">
        <button @click="_login">登录</button>
      </div>
      <router-link to="/signup" replace tag="div" class="toSignup">
        <span>注&nbsp;&nbsp;册 ></span>
      </router-link>
      <div class="login-wechat">
        <a href="#">
          <p>微信授权登录</p>
          <img src="@/assets/images/weixin_logo.png" alt="">
        </a>
      </div>
    </div>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</transition>
</template>
<script>
import {
  mapActions,
  mapMutations
} from 'vuex'
export default {
  data () {
    return {
      checked: true,
      mobile: '',
      mobileValid: undefined,
      mobileRules: {
        required: true,
        type: 'tel',
        // pattern: /didi.com$/, // 自定义正则规则
        custom: (val) => {
          return val.length === 11 // 自定义规则
        }
      },
      mobileMessages: {
        // pattern: '以didi.com为后缀',
        custom: '手机号为11位'
      },
      code: '',
      codeValid: undefined,
      pwdRules: {
        require: true,
        type: 'number',
        custom: (val) => {
          return val.length === 4
        }
      },
      pwdMessages: {
        custom: '请输入4个数字'
      }
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['login']),
    onChecked () {
      this.checked = !this.checked
    },
    ...mapMutations(['doSettleCount']),
    _login () {
      let userinfo = {
        mobile: this.mobile,
        code: this.code
      }
      this.login(userinfo).then((val) => {
        this.doSettleCount(val.settleCount)
        // 账号密码正确resolved
        if (this.$route.query.redirect) {
          console.log(this.$route.query.redirect)
          this.$router.replace(this.$route.query.redirect)
        } else {
          this.$router.replace('/')
        }
      }, () => {
        // 账号密码错误, rejected
        const toast = this.$createToast({
          time: 1000,
          type: 'error',
          txt: '账号密码错误'
        })
        toast.show()
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login-wrap
  width: 100%
  .login-wechat
    text-align: center
    position: absolute
    width: 100%
    bottom: 10px
    left: 0
    p
      font-size: 15px
      color: #888888
      font-weight: 900
    img
      width: 18%
      height: 18%
  .toSignup
    text-align: center
    span
      font-size: 12px
      color: #505050
  .login-btn
    padding: 0 15px
    margin: 16px 0 26px
    button
      width: 100%
      border-radius: 20px
      font-size: 17px
      color: #333
      border: 1px solid #b9b9b9
      background: 0
      height: 40px
  .protocol
    display: flex
    align-items: center
    .protocol-user
      color: #333333
      font-size:14px
    .protocol-checkox
      display: flex
      align-items: center
      input
        position: relative
        background-color: #ffffff;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        font-size: 0;
        height: 16px;
        outline: 0 none;
        vertical-align: 0;
        width: 16px;
        appearance: none
        &:checked:before
          color: #09bb07;
          content: "\EA08";
          display: inline-block;
          font-family: "weui";
          font-size: 16px;
          font-style: normal;
          font-variant: normal;
          font-weight: normal;
          left: 50%;
          position: absolute;
          text-align: center;
          text-decoration: inherit;
          text-transform: none;
          top: 50%;
          transform: translate(-50%, -48%) scale(0.73);
          vertical-align: middle;
      span
        font-size: 14px
        color: #888
        margin-left: 3px
  .login-logo
    width: 80%
    margin:22% auto 5%
    img
      width: 100%
  .login-form
    padding: 0 35px
    .login-form-item
      height: 44px
      margin-bottom: 5%
      border-bottom: 1px solid #d4d4d4
      input
        width: 100%
        height: 44px
        padding: 0 5px
        outline: none
        border: none
.left-enter-active, .left-leave-active
  transition: all 0.3s
.left-enter, .left-leave-to
  transform: translate3d(-100%, 0, 0)
</style>
