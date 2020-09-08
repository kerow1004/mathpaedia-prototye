/* eslint no-param-reassign: off */

import lodash from 'lodash';

const VueLodash = {
  install(Vue, options = {}) {
    if (options.name) {
      Vue[options.name] = lodash;
      Object.defineProperty(Vue.prototype, options.name, { value: lodash });
    }

    Vue._ = lodash;

    Object.defineProperty(Vue.prototype, '_', { value: lodash });
  },
};

export default VueLodash;
