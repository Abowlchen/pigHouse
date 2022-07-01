import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/views/Home')
    }, {
      path: 'find',
      component: () => import('@/views/Find')
    }, {
      path: 'info',
      component: () => import('@/views/Info')
    }, {
      path: 'my',
      component: () => import('@/views/My')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/city',
    component: () => import('@/views/City')
  },
  {
    path: '/release',
    component: () => import('@/views/Release')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/homeinfo',
    component: () => import('@/views/HoneInfo')
  }

]

const router = new VueRouter({
  routes
})

export default router
