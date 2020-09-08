import { mount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import Problem from '@/components/problems/Problem';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Math Problem.vue', () => {
  const id = 10;
  const content = {
    sentence: 'math problem sentence',
    picture: 'http://picture.math.com/123456',
    choices: ['1', '2', '3', '4', '5'],
  };
  const parts = [
    {
      sentence: 'math part sentence',
      picture: 'http://picture.math.com/1234567',
      choices: ['11', '22', '33', '44', '55'],
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(Problem, {
      propsData: {
        problem: {
          _id: id,
          content,
          parts,
        },
      },
      localVue,
    });
  });

  test('equals problem content to the received content', () => {
    expect(wrapper.props().problem.content).toBe(content);
  });

  test('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
