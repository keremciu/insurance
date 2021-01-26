import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { CookiesProvider, Cookies } from 'react-cookie';
import { createMemoryHistory } from 'history';

// this can be removed after v6 version merges PR below
// https://github.com/ReactTraining/react-router/pull/7586
function HistoryRouter({ children, history }) {
  let [state, dispatch] = React.useReducer((_, action) => action, {
    action: history.action,
    location: history.location
  });
  React.useLayoutEffect(() => history.listen(dispatch), [history]);
  return (
    <Router
      children={children}
      action={state.action}
      location={state.location}
      navigator={history}
    />
  );
}

const AllTheProviders = ({ children, cookies = new Cookies(), history }) =>
(
  <HistoryRouter history={history}>
    <CookiesProvider cookies={cookies}>
      {children}
    </CookiesProvider>
  </HistoryRouter>
)

const customRender = (ui, options = {}) => {
  const history = createMemoryHistory({ initialEntries: options.initialEntries || ["/"] })
  return {
    result: render(ui, { wrapper: (props) => AllTheProviders({ ...props, ...options, history }), ...options }),
    history
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
