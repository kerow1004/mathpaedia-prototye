import { shallowMount } from '@vue/test-utils';
import Home from '@/components/Home';

describe('Home.vue', () => {
  test('renders Home', () => {
    shallowMount(Home);
  });
});
