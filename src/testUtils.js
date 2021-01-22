import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';

const AllTheProviders = ({ children, initialEntries = ["/"], cookies = new Cookies() }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <CookiesProvider cookies={cookies}>
        {children}
      </CookiesProvider>
    </MemoryRouter>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: (props) => AllTheProviders({ ...props, ...options }), ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
