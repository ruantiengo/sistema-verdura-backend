/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'
    // '**/?(*.)+(spec|test).[tj]s?(x)'
  ]

}
