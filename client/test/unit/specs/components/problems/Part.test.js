import { mount } from '@vue/test-utils';
import Part from '@/components/problems/Part';

describe('Math Part.vue', () => {
  test('renders a part of math problem', () => {
    const sentence = 'math part sentence';
    const picture = 'http://picture.math.com/123456';
    const choices = ['1', '2', '3', '4', '5'];
    const index = 10;

    const wrapper = mount(Part, {
      propsData: {
        part: {
          sentence,
          picture,
          choices,
        },
        index,
      },
    });

    // NOTE: Example test code without snapshot
    // expect(wrapper.find('.part-sentence').exists()).toBe(true);
    // expect(wrapper.find('.part-sentence').text()).toBe(`${index + 1}. ${sentence}`);
    // expect(wrapper.find('.picture-container > .picture').exists()).toBe(true);
    // expect(wrapper.find('.picture-container > .picture').attributes().src).toBe(picture);
    // expect(wrapper.findAll('li')).toHaveLength(5);
    // expect(wrapper.find('li').text()).toBe('1');

    // NOTE: Test code with snapshot
    expect(wrapper.element).toMatchSnapshot();
  });
});
