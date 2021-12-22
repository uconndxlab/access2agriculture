import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/map',
        name: 'map',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
    },
    {
        path: '/account',
        name: 'account',
        component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
    },
    {
        path: '/liked',
        name: 'liked',
        component: () => import(/* webpackChunkName: "liked" */ '../views/Liked.vue')
    },
    {
        path: '/map-list',
        name: 'maplist',
        component: () => import(/* webpackChunkName: "map-item" */ '../views/MapList.vue')
    },
    {
        path: '/map-item/:id',
        name: 'map-item-by-id',
        component: () => import(/* webpackChunkName: "map-item-id" */ '../views/Map.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
    },
    {
        path: '/routes',
        name: 'routes',
        component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
