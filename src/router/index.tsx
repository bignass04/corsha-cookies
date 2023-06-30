import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import FourOhFour from 'pages/404'

if (import.meta.env.VITE_DATA_MOCKS === 'true') {
  const { browser } = await import('mocks/browser')
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  browser.start()
}

const AppRouter = (): React.ReactElement => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<FourOhFour />} />
  </Routes>
)

export default AppRouter
