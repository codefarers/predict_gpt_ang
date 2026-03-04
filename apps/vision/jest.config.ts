import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs|keycloak-js)/)',
  ]
};

export default config;
