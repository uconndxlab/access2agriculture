import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/geo',
    name: 'geo',
    component: () => import(/* webpackChunkName: "geo" */ '../views/Geo.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

// Creates a base router object
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Implements a router guard, which will check for authentication meta properties and handle routing accordingly
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if ( requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
