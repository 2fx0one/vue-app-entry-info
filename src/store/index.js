import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  state: {
    location: {lng: 115.89, lat: 20.68},
  },
  mutations: {
    SET_LOCATION: (state, location) => {
      state.location = location
      sessionStorage.setItem('location', JSON.stringify(location))
    }
  },
  actions: {
    updateLocation({ commit }, location) {
      commit('SET_LOCATION', location)
    }
  }
})

export default store
