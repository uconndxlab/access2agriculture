import Vue from 'vue'
import VueRouter from 'vue-router'
import Map from '../views/Map.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
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
        path: '/map-list',
        name: 'Map List',
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
    }
]

const router = new VueRouter({
    routes
})

export default router
