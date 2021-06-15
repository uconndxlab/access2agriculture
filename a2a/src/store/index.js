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
      snap_ebt: false,
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
    productObjects(state) {
      return state.products
    },
    businessTypeObjects(state) {
      return state.businessTypes
    },
    filterObject(state) {
      return state.filter
    },
    initialFilter() {
      return initialState().filter
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
    async fetchWaypoints({ commit }) {
      const waypoints = await fb.waypointsCollection.get()
      const waypoints_extracted = waypoints.docs.map(waypoint => {
        let waypoint_obj = waypoint.data()
        waypoint_obj.id = waypoint.id
        return waypoint_obj
      })

      commit('SET_WAYPOINTS', waypoints_extracted)
    }
  }
})

export default store