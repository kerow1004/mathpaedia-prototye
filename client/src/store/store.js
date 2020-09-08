import Vue from 'vue';
import Vuex from 'vuex';

import problems from './modules/problems';
import search from './modules/search';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    problems,
    search,
    auth,
  },
});
