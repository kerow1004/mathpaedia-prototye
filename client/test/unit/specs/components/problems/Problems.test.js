import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import BootstrapVue from 'bootstrap-vue';
import Problems from '@/components/problems/Problems';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueLogger);
localVue.use(BootstrapVue);

describe('Math Problems.vue', () => {
  const problems = [
    {
      sentence: 'math problem sentence 1',
      picture: 'http://picture.math.com/1234561',
      choices: ['11', '12', '13', '14', '15'],
    },
    {
      sentence: 'math problem sentence 2',
      picture: 'http://picture.math.com/1234562',
      choices: ['21', '22', '23', '24', '25'],
    },
  ];

  const oriMathJax = global.MathJax;

  let actions;
  let getters;
  let store;
  let wrapper;

  beforeAll(() => {
    global.MathJax = {
      Hub: {
        Queue: jest.fn(),
      },
    };

    actions = {
      getProblems: jest.fn(),
    };

    getters = {
      problems: jest.fn(() => problems),
    };

    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    });

    wrapper = mount(Problems, {
      localVue,
      store,
    });
  });

  afterAll(() => {
    global.MathJax = oriMathJax;
  });

  test('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('calls store action "getProblems" when created', () => {
    expect(actions.getProblems).toHaveBeenCalled();
  });

  test('calls store getters "problems" when changed', () => {
    expect(getters.problems).toHaveBeenCalled();
  });
});
