import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/map',
    name: 'Map',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import(/* webpackChunkName: "notifications" */ '../views/Notifications.vue')
  },
  {
    path: '/liked',
    name: 'Liked',
    component: () => import(/* webpackChunkName: "liked" */ '../views/Liked.vue')
  },
  {
    path: '/map-item',
    name: 'Map Item',
    component: () => import(/* webpackChunkName: "map-item" */ '../views/MapItem.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
