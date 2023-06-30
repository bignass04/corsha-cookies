import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  act(() => {
    render(<App />)
  })
  expect(screen.getByText('Loading...')).toBeInTheDocument()

})
