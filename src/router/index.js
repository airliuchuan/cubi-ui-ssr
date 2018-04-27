import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/dist/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue'),
      children: [
        {
          path: 'protocol',
          name: 'protocol',
          component: () => import('@/views/login/protocol.vue')
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/signup/signup.vue')
    },
    {
      path: '/',
      component: () => import('@/layout/tab.vue'),
      children: [
        {path: '', redirect: '/home'},
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home-page/home-page.vue'),
          children: [
            {
              path: 'introduce',
              name: 'introduce',
              component: () => import('@/views/home-page/mall-introduce/mall-introduce.vue')
            },
            {
              path: 'owner',
              name: 'owner',
              component: () => import('@/views/home-page/mall-owner/mall-owner.vue')
            },
            {
              path: 'welfare',
              name: 'welfare',
              component: () => import('@/views/home-page/mall-welfare/mall-welfare.vue')
            },
            {
              path: 'service',
              name: 'service',
              component: () => import('@/views/home-page/mall-service/mall-service.vue')
            },
            {
              path: 'detail/:id',
              name: 'product-detail',
              props: true,
              component: () => import('@/views/home-page/product-detail/product-detail.vue')
            }
          ]
        },
        {
          path: 'discover',
          name: 'discover',
          component: () => import('@/views/discover-page/discover-page.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/cart-page/cart-page.vue'),
          beforeEnter (to, from, next) {
            let user
            if (user) {
              next()
            } else {
              next({path: '/login'})
            }
          }
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/user-page/user-page.vue')
        }
      ]
    }
  ]
})
