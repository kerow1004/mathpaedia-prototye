import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import Header from '@/components/Header';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);

describe.skip('Header.vue', () => {
  let actions;
  let store;
  let wrapper;

  beforeAll(() => {
    actions = {
      search: jest.fn(() => new Promise(resolve => resolve())),
    };

    store = new Vuex.Store({
      state: {},
      actions,
    });

    wrapper = mount(Header, {
      store,
      localVue,
      stubs: ['router-link'],
    });
  });

  test.skip('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test.skip('calls store action "search" when doSearch is called', () => {
    const input = wrapper.find('input');
    const searchButton = wrapper.find('#search-button');

    input.element.value = 'integral';
    searchButton.trigger('click');
    expect(actions.search).toHaveBeenCalled();
  });
});

