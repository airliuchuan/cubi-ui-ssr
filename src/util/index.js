const isDev = process.env.NODE_ENV === 'development'
// 创建错误的方法
const createError = (code, msg) => {
  let err = new Error(msg)
  err.code = code
  return err
}

// 处理请求结果的方法
export const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(res => {
      const data = res.data
      console.log(data, 'axios-res.data')
      if (!data) {
        return createError(400, 'no data')
      } else if (!data.succ) {
        console.log('reject')
        return reject(createError(400, data.msg))
      }
      resolve(data.data)
    }).catch(err => {
      console.log(err.response)
    })
  })
}

// 处理错误
export const handleError = (err) => {
  console.log(err, 'util-handleError')
}

// localstorage封装
export const _localStorage = {
  getItem: function (key) {
    let value
    try {
      value = localStorage.getItem(key)
      return value
    } catch (ex) {
          // 开发环境下提示error
      if (isDev) {
        console.log('localStorage.getItem 报错', ex.message)
      }
    }
  },
  setItem: function (key, value) {
    try {
          // ios safari 无痕模式下localstorage.setItem 报错
      localStorage.setItem(key, value)
    } catch (ex) {
          // 开发模式下报错
      if (isDev) {
        console.log('localstorage.setItem 报错', ex.message)
      }
    }
  }
}
