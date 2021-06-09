/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebase'
import router from './router'

Vue.use(Vuex)

const initialState = {
    user: {},
    products: [],
    waypoints: []
}

const store = new Vuex.Store({
    // Set base state needed throughout app.
    state: initialState,

    // Set explicit mutations for changing the state.
    mutations: {
        setUser(state, val) {
            state.user = val
        },
        setProducts(state, val) {
            state.products = val
        },
        setWaypoints(state, val) {
            state.waypoints = val
        },
        setUpdatedWaypoint(state, val) {
            let index = state.waypoints.findIndex( wp => {
                return wp.id == val.id
            })
            if ( index != -1 ) {
                state.waypoints[index] = val
            }
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.user !== null && Object.prototype.hasOwnProperty.call(state.user, 'name');
        }
    },

    // Async methods that require interaction with API or Firebase
    actions: {
        async login({ dispatch }, form) {
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
            
            await dispatch('fetchUser', user)
            if ( router.currentRoute.path !== '/dashboard' ) {
                router.push('/dashboard')
            }
        },
        async fetchUser({ commit }, user) {
            const userProfile = await fb.usersCollection.doc(user.uid).get()
            const userProfileData = userProfile.data();
            userProfileData.email = user.toJSON().email

            commit('setUser', userProfileData)
        },
        async logout({ commit }) {
            await fb.auth.signOut()
            commit('setUser', {})
            router.push('/')
        },
        async authAction({ commit }) {
            fb.auth.onAuthStateChanged( user => {
                if ( user ) {
                    this.dispatch('fetchUser', user)
                } else {
                    commit('setUser', {})
                }
            })
        },
        async fetchProducts({ commit }) {
            const products = await fb.productsCollection.get()
            const products_extracted = products.docs.map( product => {
                return product.data()
            })

            commit('setProducts', products_extracted)
        },
        async fetchWaypoints({ commit }) {
            const waypoints = await fb.waypointsCollection.get()
            const waypoints_extracted = waypoints.docs.map( waypoint => {
                let waypoint_obj = waypoint.data()
                waypoint_obj.id = waypoint.id
                return waypoint_obj
            })

            commit('setWaypoints', waypoints_extracted)
        },
        async editWaypoint({ commit, dispatch }, waypoint) {
            console.log('Edit Waypoint', waypoint)

            // Save reference to ID as it is unnecessary for update function.
            const waypoint_id = waypoint.id
            delete waypoint.id

            // Blindly update all properties.  Can split this out if we want.
            const waypoint_commit = await fb.waypointsCollection.doc(waypoint_id).update(waypoint)

            // Reassign id.
            waypoint.id = waypoint_id

            // Recommit the waypoint to the state, at last index.
            commit('setUpdatedWaypoint', waypoint)
        }
    }
})

export default store