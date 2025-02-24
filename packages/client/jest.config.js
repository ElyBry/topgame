import dotenv from 'dotenv'
import { TextEncoder, TextDecoder } from 'util'

dotenv.config()

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }]
  },
  
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
  ],
  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  verbose: true,
  silent: false,
}
