import Vue from 'vue'
import Vuex from 'vuex'

import defaultState from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const isDev = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  strict: isDev,
  state: defaultState,
  mutations,
  actions,
  getters
})
