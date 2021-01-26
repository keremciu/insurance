import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

const AllTheProviders = ({ children, cookies = new Cookies() }) =>
(
  <Router>
    <CookiesProvider cookies={cookies}>
      {children}
    </CookiesProvider>
  </Router>
)

const customRender = (ui, options) =>
  render(ui, { wrapper: (props) => AllTheProviders({ ...props, ...options }), ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
