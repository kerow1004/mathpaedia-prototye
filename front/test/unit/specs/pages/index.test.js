import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex'; // eslint-disable-line
import Vuetify from 'vuetify';

import Index from '@/pages/index';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('index.vue', () => {
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      initStocks: jest.fn(),
    };

    store = new Vuex.Store({
      state: {},
      actions,
    });

    wrapper = shallowMount(Index, {
      store,
      localVue,
    });
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
