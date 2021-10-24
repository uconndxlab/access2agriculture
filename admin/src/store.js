/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from './firebase'
import router from './router'

Vue.use(Vuex)

const initialState = {
    user: {},
    products: [],
    waypoints: [],
    assistance_options: [],
    business_types: [
        'Community Garden',
        'Farm',
        'Farm Training Program',
        'General Food Access',
        'Market'
    ]
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
        setAssistanceOptions(state, val) {
            state.assistance_options = val
        },
        setUpdatedWaypoint(state, val) {
            let index = state.waypoints.findIndex( wp => {
                return wp.id == val.id
            })
            if ( index != -1 ) {
                // Need to use this to trigger reactivity
                Vue.set(state.waypoints, index, val);
            }
        },
        setUpdatedProduct(state, val) {
            let index = state.products.findIndex( prod => {
                return prod.id == val.id
            })
            if ( index != -1 ) {
                // Need to use this to trigger reactivity
                Vue.set(state.products, index, val);
            }
        },
        prependWaypoint(state, val) {
            let new_state_waypoints = state.waypoints.slice()
            new_state_waypoints.unshift(val)
            state.waypoints = new_state_waypoints
        },
        prependProduct(state, val) {
            let new_state_products = state.products.slice()
            new_state_products.unshift(val)
            state.products = new_state_products
        }
    },

    getters: {
        isLoggedIn(state) {
            return state.user !== null && Object.prototype.hasOwnProperty.call(state.user, 'name');
        },
        waypointObjects(state) {
            return state.waypoints
        },
        productObjects(state) {
            return state.products
        },
        businessTypes(state) {
            return state.business_types
        },
        assistanceOptionsObjects(state) {
            return state.assistance_options
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
        async fetchAssistanceOptions({ commit }) {
            const assist_options = await fb.assistanceOptionsCollection.get()
            const assist_options_extracted = assist_options.docs.map( option => {
                let option_obj = option.data()
                option_obj.id = option.id
                return option_obj
            })

            commit('setAssistanceOptions', assist_options_extracted)
        },
        async fetchProducts({ commit }) {
            const products = await fb.productsCollection.get()
            const products_extracted = products.docs.map( product => {
                let product_obj = product.data()
                product_obj.id = product.id
                return product_obj
            })

            commit('setProducts', products_extracted)
        },
        async addProduct({ commit }, product) {
            const product_with_name = await fb.productsCollection
                .where('name', '==', product.name)
                .get()
            let product_exists = product_with_name && product_with_name.docs && product_with_name.docs.length > 0

            if ( product_exists ) {
                throw new Error('Product Already Exists')
            } else {
                const product_create = await fb.productsCollection
                    .add(product)

                if ( product_create && product_create.id ) {
                    const read_product = await fb.productsCollection.doc(product_create.id).get()

                    if ( read_product ) {
                        let new_product_obj = read_product.data()
                        new_product_obj.id = read_product.id
                        commit('prependProduct', new_product_obj)
                    }
                }
            }
        },
        async editProduct({ commit }, product) {
            console.log('Edit Product', product)

            const product_id = product.id
            delete product.id

            const product_with_name = await fb.productsCollection
                .where('name', '==', product.name)
                .get()
            let product_exists = product_with_name && product_with_name.docs && product_with_name.docs.length > 0 && product_id != product_with_name.docs[0].id

            console.log('Does Product Exist?', product_exists)

            if ( product_exists ) {
                throw new Error('Product Already Exists with Name')
            } else {
                const product_commit = fb.productsCollection.doc(product_id).update(product)

                product.id = product_id
                commit('setUpdatedProduct', product)
            }

            
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
        async editWaypoint({ commit }, waypoint) {
            console.log('Edit Waypoint', waypoint)

            // Save reference to ID as it is unnecessary for update function.
            const waypoint_id = waypoint.id
            delete waypoint.id

            // First we need to verify that we don't have another record with the same name.  This should be moved to CloudFunctions to centralize validation.
            const waypoint_with_name = await fb.waypointsCollection
                .where('name', '==', waypoint.name)
                .get()
            let waypoint_exists = waypoint_with_name && waypoint_with_name.docs && waypoint_with_name.docs.length > 0 && waypoint_id != waypoint_with_name.docs[0].id

            if ( waypoint_exists ) {
                throw new Error('Waypoint already exists with this name')
            } else {
                // Blindly update all properties.  Can split this out if we want.
                const waypoint_commit = await fb.waypointsCollection.doc(waypoint_id).update(waypoint)

                // Reassign id.
                waypoint.id = waypoint_id

                // Recommit the waypoint to the state, at last index.
                commit('setUpdatedWaypoint', waypoint)
            }
        },
        async addWaypoint({ commit }, waypoint) {
            console.log('Add Waypoint', waypoint)

            // First we need to verify that we don't have another record with the same name.  This should be moved to CloudFunctions to centralize validation.
            const waypoint_with_name = await fb.waypointsCollection
                .where('name', '==', waypoint.name)
                .get()
            let waypoint_exists = waypoint_with_name && waypoint_with_name.docs && waypoint_with_name.docs.length > 0
            
            
            if ( waypoint_exists ) {
                console.log('Waypoint Already Exists')
                throw new Error('Waypoint Already Exists')
            } else {
                console.log('Waypoint Does Not Exist')
                // Create the waypoint.  Since this is not cloudfunc, it will provide simple response.
                waypoint.coordinates = new fb.firestore.GeoPoint(waypoint.coordinates._lat, waypoint.coordinates._long)
                const waypoint_create = await fb.waypointsCollection
                    .add(waypoint)

                // Prepare the object for injection to the UI.
                // This could be avoided altogether if we use the input object.
                // However, it's set up this way so we can transfer to CloudFunctions where we might need to read separately from the "create" response.
                if ( waypoint_create && waypoint_create.id ) {
                    const read_waypoint = await fb.waypointsCollection.doc(waypoint_create.id).get()

                    if ( read_waypoint ) {
                        let new_waypoint_obj = read_waypoint.data()
                        new_waypoint_obj.id = read_waypoint.id
                        commit('prependWaypoint', new_waypoint_obj)
                    }
                }

                return waypoint_create
            }
        },
        async uploadWaypointImage({ commit }, { waypoint, imageURL }) {
            console.log('Upload Waypoint Image', waypoint, imageURL)

            // const waypoint_id = waypoint.id
            // delete waypoint.id
            const waypoint_in_collection_ref = fb.waypointsCollection.doc(waypoint.id)
            const waypoint_in_collection = await waypoint_in_collection_ref.get()

            if ( waypoint_in_collection.exists ) {
                await waypoint_in_collection_ref.set({
                    image: imageURL
                }, { merge: true })
                const final_wp_object = {
                    ...waypoint,
                    image: imageURL
                }
                commit('setUpdatedWaypoint', final_wp_object)
                return true
            }

            return false
        },
        async waypointExists({ commit }, waypoint) {
            const waypoint_in_collection_ref = fb.waypointsCollection.doc(waypoint.id)
            const waypoint_in_collection = await waypoint_in_collection_ref.get()
            return waypoint_in_collection.exists
        }
    }
})

export default store