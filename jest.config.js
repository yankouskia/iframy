module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '**/src/**.{js}',
  ],
  coverageDirectory: './test-coverage',
  coverageReporters: ['json', 'html'],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  modulePaths: ['./src'],
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  verbose: true,
};
