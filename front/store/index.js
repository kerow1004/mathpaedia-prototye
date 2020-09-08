import Vuex from 'vuex'; // eslint-disable-line

import problems from '@/store/modules/problems';
import search from '@/store/modules/search';
import auth from '@/store/modules/auth';

const createStore = () => new Vuex.Store({
  modules: {
    problems,
    search,
    auth,
  },
});

export default createStore;
