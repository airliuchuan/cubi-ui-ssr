import {_localStorage} from '@/util'

export default {
  // 登录
  doLogin (state, user) {
    state.user = user
    _localStorage.setItem('localUser', JSON.stringify(user))
  },
  // 登出
  doLoginOut (state) {
    state.user = null
    localStorage.removeItem('localUser')
  },
  // 购物车选中总数
  doSettleCount (state, num) {
    state.settleCount = num
  },
  // 显示loading
  startLoading (state) {
    state.isLoadingShow = true
  },
  // 不显示loading
  endLoading (state) {
    state.isLoadingShow = false
  }
}
