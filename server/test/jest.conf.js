const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  verbose: true,
  moduleFileExtensions: [
    'js',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/client/',
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'server/src/**/*.{js}',
    '!**/node_modules/**',
  ],
  coverageReporters: [
    'text',
    'text-summary',
  ],
};
