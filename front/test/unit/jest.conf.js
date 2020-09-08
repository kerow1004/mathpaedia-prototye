const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!vue-quill)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e',
  ],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  // setupFiles: ['<rootDir>/test/unit/setup'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    '**/components/**/*.{js, vue}',
    '**/pages/**/*.{js, vue}',
    '**/middleware/**/*.{js, vue}',
    '**/store/**/*.{js, vue}',
    '**/plugin/**/*.{js, vue}',
    '!**/node_modules/**',
  ],
};
