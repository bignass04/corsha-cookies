import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Router from '.'

vi.mock('mocks/browser', () => ({
  browser: {
    start: vi.fn()
  }
}))

describe('Router', () => {
  test('renders users on the page', async () => {
    let comp
    act(() => {
      comp = render(
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )
    })
    expect(await screen.findByText('defunkt', undefined, { timeout: 3000 })).toBeInTheDocument()
    expect(await screen.findByAltText('avatar for user defunkt')).toBeInTheDocument()
    expect(comp.container).toMatchSnapshot()
  })
})
