/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import axios from 'axios';

const state = {
  user: {},
};

const mutations = {
  SET_USER(_state, result) {
    _state.user = result;
  },
  CLEAR_USER(_state) {
    _state.user = {};
  },
};

const actions = {
  login({ commit }, loginData) {
    const url = '/auth/login';

    Vue.$log.info('[Store/Auth/Login] URL', url);

    return axios.post(url, loginData)
      .then((response) => {
        if (response) {
          const result = response.data;

          Vue.$log.info('[Store/Auth/Login] Login Result', response);

          result.authenticated = true;

          commit('SET_USER', result);
        }

        return response;
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Auth/Login] Login Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
  logout({ commit }) {
    const url = '/auth/logout';
    const logoutData = { username: state.username };

    Vue.$log.info('[Store/Auth/Logout] URL', url);

    return axios.post(url, logoutData)
      .then((response) => {
        if (response) {
          Vue.$log.info('[Store/Auth/Logout] Logout Result', response);
          commit('CLEAR_USER');
        }

        return response;
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Auth/Logout] Logout Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
  register({ commit }, registerData) {
    const url = '/auth/register';

    Vue.$log.info('[Store/Auth/Register] URL', url);

    return axios.post(url, registerData)
      .then((response) => {
        if (response) {
          const result = response.data;

          Vue.$log.info('[Store/Auth/Register] Register Result', response);

          result.authenticated = true;

          commit('SET_USER', result);
        }

        return response;
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Auth/Register] Register Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
};

const getters = {
  user(_state) {
    return _state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
