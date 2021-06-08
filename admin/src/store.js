/*eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebase'
// import router from './router'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {},
    actions: {
        
        async login({ dispatch }, form) {
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
            
            return user
        }
    }
})

export default store