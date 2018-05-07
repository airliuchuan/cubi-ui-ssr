import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import * as mockData from './data/data'

export default {
  bootstrap () {
    let mock = new MockAdapter(axios, {delayResponse: 1000})

    mock.onPost('/api/login').reply(config => {
      let {mobile, code} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        let user = null
        setTimeout(() => {
          // console.log(mockData.user, 'mock-api')
          let hasUser = mockData.user.some(u => {
            if (u.mobile === mobile && u.code === code) {
              console.log(u, 'mock-api.js-18')
              user = u
              user.code = null
              return true
            } else {
              return false
            }
          })
          if (hasUser) {
            resolve([200, {succ: true, msg: '登录成功', data: user}])
          } else {
            resolve([200, {succ: false, msg: '账号和密码错误'}])
          }
        }, 100)
      })
    })
  }
}
