/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
// import router from './router'

Vue.use(Vuex)

const initialState = () => {
  return {
    products: [],
    waypoints: [],
    assistanceOptions: [],
    businessTypes: [
      { name: 'Community Garden' },
      { name: 'Farm' },
      { name: 'Farm Training Program' },
      { name: 'General Food Access' },
      { name: 'Market' }
    ],
    filter: {
      businessTypes: [],
      distance: 0.0,
      assistanceOptions: [],
      products: []
    }
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
    SET_FILTER(state, val) {
      state.filter = val
    },
    RESET_FILTER(state) {
      state.filter = initialState().filter
    }
  },
  getters: {
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
    productObjects(state) {
      return state.products
    },
    assistanceOptionsObjects(state) {
      return state.assistanceOptions
    },
    businessTypeObjects(state) {
      return state.businessTypes
    },
    filterObject(state) {
      return state.filter
    },
    initialFilter() {
      return initialState().filter
    },
    waypointObjectsByFilter(state) {
      return state.waypoints.filter(x => {
        let has_products = true
        let has_business_type = true
        let has_assistance_options = true

        if ( state.filter.products && state.filter.products.length > 0 ) {
          has_products = state.filter.products.every(y => {
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

        return has_products && has_business_type && has_assistance_options
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
    async fetchWaypoints({ commit }) {
      const waypoints = await fb.waypointsCollection.get()
      const waypoints_extracted = waypoints.docs.map(waypoint => {
        let waypoint_obj = waypoint.data()
        waypoint_obj.id = waypoint.id
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