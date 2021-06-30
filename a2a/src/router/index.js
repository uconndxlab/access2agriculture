import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Map',
    component: Map
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
  },
  {
    path: '/filter',
    name: 'Filter',
    component: () => import(/* webpackChunkName: "map-item" */ '../views/Filter.vue')
  },
  {
    path: '/map-list',
    name: 'Map List',
    component: () => import(/* webpackChunkName: "map-item" */ '../views/Maplist.vue')
  },
  {
    path: '/map-item/:id',
    name: 'Map Item By Id',
    component: () => import(/* webpackChunkName: "map-item-id" */ '../views/MapItem.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
