import { mount, createLocalVue } from '@vue/test-utils';
import VueLogger from 'vuejs-logger';
import BootstrapVue from 'bootstrap-vue';
import PartForm from '@/components/problemForm/PartForm';

const localVue = createLocalVue();
localVue.use(VueLogger);
localVue.use(BootstrapVue);

describe('PartForm.vue', () => {
  const part = {
    sentence: '',
    picture: '',
    choices: [
      {
        value: '',
      },
    ],
  };

  const oriMathJax = global.MathJax;

  let wrapper;

  beforeAll(() => {
    global.MathJax = {
      Hub: {
        Queue: jest.fn(),
      },
    };
  });

  afterAll(() => {
    global.MathJax = oriMathJax;
  });

  beforeEach(() => {
    wrapper = mount(PartForm, {
      propsData: {
        part,
      },
      localVue,
      stubs: ['quill'],
    });
  });

  test('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  test('remove one choice when removeChoice is clicked', () => {
    const addButton = wrapper.find('.input-choice button');
    const buttonCount = wrapper.findAll('button').length;
    addButton.trigger('click');

    const removeButton = wrapper.find('.input-choice button');
    removeButton.trigger('click');

    const buttonCountAfterAdd = wrapper.findAll('button').length;
    expect(buttonCountAfterAdd).toBe(buttonCount);
  });
});
