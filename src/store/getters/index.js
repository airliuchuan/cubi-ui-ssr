import {_localStorage} from '@/util'

export default {
  getLocalUser (state) {
    // 如果state有就返回state里的, 没有就返回localStorage里的, 获取user信息使用此getters
    if (state.user) {
      return state.user
    } else {
      return JSON.parse(_localStorage.getItem('localUser'))
    }
  }
}
