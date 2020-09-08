const state = {
  problem: null,
  problems: [],
};

const mutations = {
  SET_PROBLEMS(_state, problems) {
    _state.problems = problems;
  },
  SET_PROBLEM(_state, problem) {
    _state.problem = problem;
  },
  ADD_PROBLEM(_state, problem) {
    _state.problems.push(problem);
  },
};

const actions = {
  getProblems({ commit }, id) {
    let url;
    const isCollection = _.isUndefined(id);

    if (isCollection) {
      url = '/problems';
    } else {
      url = `/problems/${id}`;
    }

    console.log('[Store/Problems/Action] getProblems URL', url);

    return this.$axios.get(url)
      .then((response) => {
        if (response) {
          const problems = response.data;

          console.log('[Store/Problems/Action] getProblems', _.take(response.data, 2));

          if (isCollection) {
            commit('SET_PROBLEMS', problems);
          } else {
            commit('SET_PROBLEM', problems);
          }
        }
      })
      .catch((error) => {
        console.log(
          '[Store/Problems/Action] getProblems',
          error.response || error.request || error.message,
        );
      });
  },
  postProblem({ commit }, problem) {
    return this.$axios.post('/problems', problem)
      .then((response) => {
        if (response) {
          const responseProblem = response.data;

          console.log('[Store/Problems/Action] postProblem', response);

          commit('ADD_PROBLEM', responseProblem);
        }

        return true;
      })
      .catch((error) => {
        console.log(
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
  problem(_state) {
    return _state.problem;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
