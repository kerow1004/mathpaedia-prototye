import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('App.vue', () => {
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

    wrapper = shallowMount(App, {
      stubs: {
        'router-view': true,
        'app-header': true,
      },
      store,
      localVue,
    });
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
