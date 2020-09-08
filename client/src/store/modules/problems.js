/* eslint no-param-reassign: 0 */
import Vue from 'vue';
import axios from 'axios';

const state = {
  problems: [],
};

const mutations = {
  SET_PROBLEMS(_state, problems) {
    _state.problems = problems;
  },
  ADD_PROBLEM(_state, problem) {
    _state.problems.push(problem);
  },
};

const actions = {
  getProblems({ commit }, id) {
    let url;

    if (Vue._.isUndefined(id)) {
      url = '/problems';
    } else {
      url = `/problems/${id}`;
    }

    Vue.$log.info('[Store/Problems/Action] getProblems URL', url);

    axios.get(url)
      .then((response) => {
        if (response) {
          const problems = response.data;

          Vue.$log.info('[Store/Problems/Action] getProblems', response);

          commit('SET_PROBLEMS', problems);
        }
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Problems/Action] getProblems',
          error.response || error.request || error.message,
        );
      });
  },
  postProblem({ commit }, problem) {
    axios.post('/problems', problem)
      .then((response) => {
        if (response) {
          const responseProblem = response.data;

          Vue.$log.info('[Store/Problems/Action] postProblem', response);

          commit('ADD_PROBLEM', responseProblem);
        }

        return true;
      })
      .catch((error) => {
        Vue.$log.error(
          '[Store/Problems/Action] postProblem',
          error.response || error.request || error.message,
        );

        return false;
      });
  },
};

const getters = {
  problems(_state) {
    return _state.problems;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
