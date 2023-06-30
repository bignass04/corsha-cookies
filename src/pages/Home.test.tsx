import React from 'react'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { cookieList } from 'mocks/handlers'
import Home from './Home'

describe('Home page', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    act(() => {
      render(<Home />)
    })
  })

  test('renders loading', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('add 1 chocolate chip cookie', async () => {
    const cookieDropdown = await screen.findByLabelText('Choose Cookies', undefined, { timeout: 3000 })
    const qty = await screen.findByLabelText('Quantity')
    const addBtn = await screen.findByText('Add Cookies')

    await user.selectOptions(cookieDropdown, 'Chocolate Chip')
    await user.selectOptions(qty, '1')
    await user.click(addBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('1')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('0')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('0')
  })

  test('add 5 shortbread cookies', async () => {
    const cookieDropdown = await screen.findByLabelText('Choose Cookies', undefined, { timeout: 3000 })
    const qty = await screen.findByLabelText('Quantity')
    const addBtn = await screen.findByText('Add Cookies')
    await user.selectOptions(cookieDropdown, 'Shortbread')
    await user.selectOptions(qty, '5')
    await user.click(addBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('0')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('5')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('0')
  })

  test('add 2 macaroon cookies', async () => {
    const cookieDropdown = await screen.findByLabelText('Choose Cookies', undefined, { timeout: 3000 })
    const qty = await screen.findByLabelText('Quantity')
    const addBtn = await screen.findByText('Add Cookies')
    await user.selectOptions(cookieDropdown, 'Macaroon')
    await user.selectOptions(qty, '2')
    await user.click(addBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('0')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('0')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('2')
  })

  test('remove chocolate chip cookies', async () => {
    const cookieDropdown = await screen.findByLabelText('Choose Cookies', undefined, { timeout: 3000 })
    const qty = await screen.findByLabelText('Quantity')
    const addBtn = await screen.findByText('Add Cookies')
    const removeBtn = await screen.findByText('Remove Cookies')
    await user.selectOptions(cookieDropdown, 'Chocolate Chip')
    await user.selectOptions(qty, '3')
    await user.click(addBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('3')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('0')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('0')
    await user.selectOptions(cookieDropdown, 'Shortbread')
    await user.selectOptions(qty, '2')
    await user.click(addBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('3')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('2')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('0')
    await user.selectOptions(cookieDropdown, 'Chocolate Chip')
    await user.click(removeBtn)
    expect(screen.getByTestId('chocolateChip')).toHaveTextContent('0')
    expect(screen.getByTestId('shortbread')).toHaveTextContent('2')
    expect(screen.getByTestId('macaroon')).toHaveTextContent('0')
  })
})
