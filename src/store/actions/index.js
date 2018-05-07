import model from '@/model'
import {handleError} from '@/util'

export default {
  login ({commit}, {mobile, code}) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model.login(mobile, code).then(data => {
        console.log(data, 'actions - 7')
        commit('doLogin', data)
        commit('endLoading')
        resolve()
      }).catch(err => {
        commit('endLoading')
        handleError(err)
        reject(err)
      })
    })
  }
}
