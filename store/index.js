//Set up Vuex store in store/index.js:
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    status: ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token) {
      state.status = 'success';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    async login({ commit }, user) {
      commit('auth_request');
      try {
        const response = await axios.post('http://localhost:3000/auth/login', user);
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        commit('auth_success', token);
      } catch (error) {
        commit('auth_error');
        localStorage.removeItem('token');
        throw error;
      }
    },
    async signup({ commit }, user) {
      commit('auth_request');
      try {
        await axios.post('http://localhost:3000/auth/signup', user);
      } catch (error) {
        commit('auth_error');
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
});
