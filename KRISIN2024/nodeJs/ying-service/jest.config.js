const path = require('path');
const jestConfig = {
    rootDir: path.join(__dirname, ''),
    roots: ['<rootDir>/tests'],
    globals: {},
    moduleFileExtensions: ['js', 'json', 'node'],
    moduleNameMapper: {},
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules/'],
    coveragePathIgnorePatterns: ['/node_modules/', '/docs/', '/sql/'],
    coverageReporters: [
        'json',
        'lcov',
        'text',
        'clover',
        'html',
        'text-summary',
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: ['<rootDir>/tests/*.test.js', '<rootDir>/tests/**/*.test.js'],
    collectCoverage: true,
};
module.exports = jestConfig;
