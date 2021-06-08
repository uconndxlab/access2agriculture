/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebase'
import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
    // Set base state needed throughout app.
    state: {
        user: {}
    },

    // Set explicit mutations for changing the state.
    mutations: {
        setUser(state, val) {
            state.user = val
        }
    },

    // Async methods that require interaction with API or Firebase
    actions: {
        async login({ dispatch }, form) {
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
            
            dispatch('fetchUser', user)
        },
        async fetchUser({ commit }, user) {
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            commit('setUser', userProfile.data())

            router.push('/dashboard')
        },
        async logout({ commit }) {
            await fb.auth.signOut()
            commit('setUser', {})
            router.push('/')
        }
    }
})

export default store