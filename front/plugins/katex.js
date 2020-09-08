import Vue from 'vue';
import katex from 'katex';

Vue.use({
  install(_Vue) {
    _Vue.directive('katex', (el, binding) => {
      const displayStyle = binding.arg === 'display';

      if (binding.value.expression) {
        if (binding.value.options) {
          katex.render(binding.value.expression, el, {
            displayMode: displayStyle,
            ...binding.value.options,
          });
        } else {
          katex.render(binding.value.expression, el, {
            displayMode: displayStyle,
          });
        }
      } else {
        katex.render(binding.value, el, {
          displayMode: displayStyle,
        });
      }
    });
  },
});
