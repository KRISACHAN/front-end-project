export default {
    clearMocks: true,
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^.+\\.(css)$': 'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', 'src'],
};
