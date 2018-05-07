import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  CheckboxGroup,
  Radio,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Loading,
  Tip,
  Popup,
  Toast,
  Picker,
  CascadePicker,
  TimePicker,
  Dialog,
  ActionSheet,
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Upload,
  createApi
} from 'cube-ui'

import App from './App'
import router from './router'
import store from './store'

import './assets/stylus/index.styl'
import Mock from './mock'

// cube-ui弹出层
createApi(Vue, Toast, [], true)

Vue.use(Button)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Validator)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
Vue.use(Upload)

Vue.config.productionTip = false

// 价格的过滤器 => 过滤规则: 1. 必须是number格式2. 不能小于0
Vue.filter('price', value => {
  if (value < 0 || typeof value !== 'number') return
  value = value.toString()
  return `¥ ${value}.00`
})

// 登录拦截
router.beforeEach((to, from, next) => {
  console.log(store.state.user, '--store-user')
  if (to.meta.requireLogin && !store.getters.getLocalUser) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})

// MockAdatper初始化
Mock.bootstrap()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
