import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder
})

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder
})

afterEach(() => {
  jest.clearAllMocks()
})
