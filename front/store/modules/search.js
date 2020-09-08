/* eslint no-param-reassign: 0 */
import Vue from 'vue';

const state = {
  searchResults: {},
};

const mutations = {
  SET_RESULT(_state, result) {
    _state.searchResults = {
      match: result.match,
      terms: result.terms,
      isSuccess: result.isSuccess || 'n',
    };
  },
};

const actions = {
  search({ commit }, queryData) {
    const url = `/search?query=${queryData}`;

    console.log('[Store/Search/Action] URL', url);

    return this.$axios.get(url)
      .then((response) => {
        if (response) {
          const result = response.data;

          console.log('[Store/Search/Action] Search Result', result);

          result.isSuccess = 'y';

          commit('SET_RESULT', result);
        }

        return response;
      })
      .catch((error) => {
        console.log(
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
