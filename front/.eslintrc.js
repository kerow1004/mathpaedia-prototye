module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    _: true,
    renderMathInElement: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'plugin:vue/essential',
    'airbnb-base',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              '@': __dirname,
            },
          },
        },
      },
    },
  },
  // add your custom rules here
  rules: {
    'max-len': ['error', {
      code: 200,
    }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'ctx',
        'state', // for vuex state
        '_state',
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-unresolved': [
      2, { commonjs: true, amd: true },
    ],
  },
}
