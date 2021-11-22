/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import * as geofire from 'geofire-common'
import * as strings from '../strings'
// import router from './router'

Vue.use(Vuex)

const initialState = () => {
    return {
        version: '0.1.0-beta',
        products: [],
        waypoints: [],
        assistanceOptions: [],
        routes: [],
        businessTypes: [
            { name: 'Community Garden', color: 'black' },
            { name: 'Farm', color: 'green' },
            { name: 'Farm Training Program', color: 'orange' },
            { name: 'General Food Access', color: 'blue' },
            { name: 'Market', color: 'pink' }
        ],
        colors: {
            black: '#000000',
            green: '#56a744',
            orange: '#FF5733',
            blue: '#428EF4',
            pink: '#F142F4'
        },
        filter: {
            businessTypes: [],
            distance: 0.0,
            assistanceOptions: [],
            products: [],
            routes: []
        },
        userLocation: {
            coords: {
                lat: 41.765804,
                long: -72.673370
            },
            hasBeenSet: false
        },
        bookmarks: ( localStorage.getItem('a2a_bookmarks') ) ? JSON.parse(localStorage.getItem('a2a_bookmarks')) : [],
        strings: strings,
        showNoWaypointsInView: false
    }
}

const store = new Vuex.Store({
    state: initialState(),
    mutations: {
        SET_WAYPOINTS(state, val) {
            state.waypoints = val
        },
        SET_PRODUCTS(state, val) {
            state.products = val
        },
        SET_ASSISTANCE_OPTIONS(state, val) {
            state.assistanceOptions = val
        },
        SET_ROUTES(state, val) {
            state.routes = val
        },
        SET_FILTER(state, val) {
            state.filter = {
                businessTypes: val.businessTypes,
                distance: val.distance,
                assistanceOptions: val.assistanceOptions,
                products: val.products,
                routes: val.routes
            }
        },
        SET_FILTER_LOCATION_DISTANCE(state, val) {
            state.filter.distance = val
        },
        REMOVE_SINGLE_ASSISTANCE_OPTION_FILTER(state, val) {
            if ( val && val.id ) {
                const i = state.filter.assistanceOptions.findIndex(a => a == val.id)
                if ( i > -1 ) {
                    state.filter.assistanceOptions.splice(i, 1)
                }
            }
        },
        REMOVE_SINGLE_BUSINESS_TYPE_FILTER(state, val) {
            const i = state.filter.businessTypes.findIndex(a => a == val)
            if ( i > -1 ) {
                state.filter.businessTypes.splice(i, 1)
            }
        },
        REMOVE_SINGLE_PRODUCT_FILTER(state, val) {
            if ( val && val.id ) {
                const i = state.filter.products.findIndex(a => a == val.id)
                if ( i > -1 ) {
                    state.filter.products.splice(i, 1)
                }
            }
        },
        REMOVE_SINGLE_ROUTE_FILTER(state, val) {
            if ( val && val.id ) {
                const i = state.filter.routes.findIndex(a => a == val.id)
                if ( i > -1 ) {
                    state.filter.routes.splice(i, 1)
                }
            }
        },
        RESET_FILTER(state) {
            state.filter = initialState().filter
        },
        SET_USER_COORDINATES(state, val) {
            if ( val.lat && val.long ) {
                state.userLocation.coords = val
                state.userLocation.hasBeenSet = true
            }
        },
        SET_BOOKMARK(state, val) {
            if ( state.bookmarks.indexOf(val) === -1 ) {
                state.bookmarks.push(val)
                const wp_index = state.waypoints.map(wp => wp.id).indexOf(val)
                if ( wp_index > -1 ) {
                    state.waypoints[wp_index].bookmarked = true
                }
                localStorage.setItem('a2a_bookmarks', JSON.stringify(state.bookmarks))
            }
        },
        UNSET_BOOKMARK(state, val) {
            const index = state.bookmarks.indexOf(val)
            if ( index !== -1 ) {
                state.bookmarks.splice(index, 1)
                const wp_index = state.waypoints.map(wp => wp.id).indexOf(val)
                if ( wp_index > -1 ) {
                    state.waypoints[wp_index].bookmarked = false
                }
                localStorage.setItem('a2a_bookmarks', JSON.stringify(state.bookmarks))
            }
        },
        CLOSE_NO_WAYPOINTS_IN_VIEW(state) {
            state.showNoWaypointsInView = false
        },
        SHOW_NO_WAYPOINTS_IN_VIEW(state) {
            state.showNoWaypointsInView = true
        },
        NUKE(state) {
            localStorage.removeItem('a2a_bookmarks')
            Object.assign(state, initialState())
        }
    },
    getters: {
        version(state) {
            return state.version
        },
        showNoWaypointsInView(state) {
            return state.showNoWaypointsInView
        },
        waypointObjects(state) {
            return state.waypoints
        },
        waypointById: (state) => (id) => {
            let waypoint_arr = state.waypoints.filter(x => x.id == id)
            if ( Array.isArray(waypoint_arr) && waypoint_arr.length > 0 ) {
                return waypoint_arr[0]
            }
            return {}
        },
        string: (state) => (key) => {
            if ( key in state.strings ) {
                return state.strings[key]
            }
            return ''
        },
        colorLookup: (state) => (color) => {
            if ( color in state.colors ) {
                return state.colors[color]
            }
            return '#000000'
        },
        productObjects(state) {
            return state.products
        },
        productsFromFilter(state) {
            if ( state.filter.products.length > 0 && state.products.length > 0 ) {
                return state.products.filter( (p) => {
                    return state.filter.products.includes(p.id)
                })
            }
            return []
        },
        assistanceOptionsObjects(state) {
            return state.assistanceOptions
        },
        assistanceOptionsFromFilter(state) {
            if ( state.filter.assistanceOptions.length > 0 && state.assistanceOptions.length > 0 ) {
                return state.assistanceOptions.filter( (op) => {
                    return state.filter.assistanceOptions.includes(op.id)
                })
            }
            return []
        },
        businessTypeObjects(state) {
            return state.businessTypes
        },
        businessTypeObjectsFromFilter(state) {
            if ( state.filter.businessTypes.length > 0 && state.businessTypes.length > 0 ) {
                return state.businessTypes.filter( (bt) => {
                    return state.filter.businessTypes.includes(bt.name)
                })
            }
            return []
        },
        filterObject(state) {
            return state.filter
        },
        initialFilter() {
            return initialState().filter
        },
        userLocation(state) {
            return state.userLocation.coords
        },
        userLocationSet(state) {
            return state.userLocation.hasBeenSet
        },
        bookmarkedWaypoints(state) {
            return state.waypoints.filter(x => {
                return state.bookmarks.includes(x.id)
            })
        },
        routeObjects(state) {
            return state.routes
        },
        routesFromFilter(state) {
            if ( state.filter.routes.length > 0 && state.routes.length > 0 ) {
                return state.routes.filter( (route) => {
                    return state.filter.routes.includes(route.id)
                })
            }
            return []
        },
        waypointObjectsByFilter(state, getters) {
            let wps = state.waypoints.filter(x => {
                let has_products = true
                let has_business_type = true
                let has_assistance_options = true
                let is_within_distance = true

                if ( state.filter.products && state.filter.products.length > 0 ) {
                    has_products = state.filter.products.every(y => {
                        if ( !x.products ) {
                            return false
                        }
                        return x.products.includes(y)
                    })
                }

                if ( state.filter.businessTypes && state.filter.businessTypes.length > 0 ) {
                    has_business_type = state.filter.businessTypes.some(y => {
                        return x.type === y
                    })
                }

                if ( state.filter.assistanceOptions && state.filter.assistanceOptions.length > 0 ) {
                    if ( !x.assistance_options ) {
                        has_assistance_options = false
                    } else {
                        has_assistance_options = state.filter.assistanceOptions.some(y => {
                            return x.assistance_options.includes(y)
                        })
                    }
                }

                if ( state.filter.distance && state.userLocation.coords.lat && state.userLocation.coords.long && state.userLocation.hasBeenSet ) {
                    if ( !x.coordinates ) {
                        is_within_distance = false
                    } else {
                        const distanceInKm = geofire.distanceBetween([x.coordinates._lat, x.coordinates._long], [state.userLocation.coords.lat, state.userLocation.coords.long])
                        const radiusInKm = state.filter.distance * 1.60934
                        is_within_distance = distanceInKm <= radiusInKm
                    }
                }

                return has_products && has_business_type && has_assistance_options && is_within_distance
            })

            return wps.map((wp) => {
                let w = wp
                w.bookmarked = false
                if ( state.bookmarks.includes(w.id) ) {
                    w.bookmarked = true
                }
                return w
            })
        }
    },
    actions: {
        async fetchProducts({ commit }) {
            const products = await fb.productsCollection.get()
            const products_extracted = products.docs.map(product => {
                let product_obj = product.data()
                product_obj.id = product.id
                return product_obj
            })

            commit('SET_PRODUCTS', products_extracted)
        },
        async fetchAssistanceOptions({ commit }) {
            const assistance_options = await fb.assistanceOptionsCollection.get()
            const assistance_options_extracted = assistance_options.docs.map( opt => {
                let option_obj = opt.data()
                option_obj.id = opt.id
                return option_obj
            })

            commit('SET_ASSISTANCE_OPTIONS', assistance_options_extracted)
        },
        async fetchRoutes({ commit }) {
            const routes = await fb.routesCollection.get()
            const routes_extracted = routes.docs.map( route => {
                let route_obj = route.data()
                route_obj.id = route.id
                return route_obj
            })

            commit('SET_ROUTES', routes_extracted)
        },
        async fetchWaypoints({ commit, state }) {
            const waypoints = await fb.waypointsCollection.get()
            const waypoints_extracted = waypoints.docs.map(waypoint => {
                let waypoint_obj = waypoint.data()
                waypoint_obj.id = waypoint.id
                waypoint_obj.bookmarked = false
                if ( state.bookmarks.includes(waypoint_obj.id) ) {
                    waypoint_obj.bookmarked = true
                }
                return waypoint_obj
            })

            commit('SET_WAYPOINTS', waypoints_extracted)
        },
        async fetchWaypointsConditionally({ dispatch, state }) {
            if ( state.waypoints.length > 0 ) {
                return true
            } else {
                await dispatch('fetchWaypoints')
                return true
            }
        }
    }
})

export default store