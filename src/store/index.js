// src/store/index.js
// import {createApp} from 'vue';
import Vuex from 'vuex';

// createApp(use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    clearUser({ commit }) {
      commit('clearUser');
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    }
  }
});
