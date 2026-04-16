import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  transformIgnorePatterns: ['node_modules/(?!(@angular|rxjs|keycloak-js)/)'],

  moduleNameMapper: {
    '^@vision/vision-http-ang$': '<rootDir>/../../predictHttpService/index.ts',
    '^@vision/vision-home-page$':
      '<rootDir>/libs/packages/pages/vision-home-poge/src/index.ts',
  },
};

export default config;
