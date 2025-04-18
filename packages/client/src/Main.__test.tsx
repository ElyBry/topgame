import { render, screen } from '@testing-library/react'
import Main from './Main'

const appContent = 'Вот тут будет жить ваше приложение :)'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<Main />)
  expect(screen.getByText(appContent)).toBeDefined()
})
