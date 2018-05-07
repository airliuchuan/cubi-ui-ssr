import axios from 'axios'

import {handleRequest} from '@/util'

axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : ''
// 拦截
axios.interceptors.response.use(response => {
  console.log(response)
  return response
}, error => {
  return Promise.reject(error)
})

export default {
  login (mobile, code) {
    return handleRequest(axios.post('/user/login', {mobile, code}))
  },
  userUpdateCount (mobile, settleCount) {
    return handleRequest(axios.post('/user/logincount', {mobile, settleCount}))
  }
}
