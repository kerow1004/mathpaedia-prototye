/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import axios from 'axios';

const state = {
  searchResults: {},
};

const mutations = {
  SET_RESULT(_state, result) {
    _state.searchResults = {
      match: result.match,
      terms: result.terms,
    };
  },
};

const actions = {
  search({ commit }, queryData) {
    const url = `/search?query=${queryData}`;

    Vue.$log.info('[Store/Search/Action] URL', url);

    return axios.get(url)
      .then((response) => {
        if (response) {
          const result = response.data;

          Vue.$log.info('[Store/Search/Action] Search Result', response);

          commit('SET_RESULT', result);
        }

        return response;
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Search/Action] Search Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
};

const getters = {
  searchResults(_state) {
    return _state.searchResults;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
