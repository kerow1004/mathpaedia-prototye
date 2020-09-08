import Vuex from 'vuex';

import store from '@/store/store';

describe('Store', () => {
  test('Store should be created', () => {
    expect(store instanceof Vuex.Store).toBe(true);
  });
});
