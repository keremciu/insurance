import React from 'react';
import { Cookies } from 'react-cookie';
import userEvent from '@testing-library/user-event'

import { mockedRecommendations } from '../mocks/handlers'
import { render, screen, waitFor, waitForElementToBeRemoved } from '../testUtils';
import Recommendation from './Recommendation';

it('renders secondary title and no authentication error', async () => {
  render(<Recommendation />);
  expect(screen.getByText('We got your recommendation')).toBeInTheDocument();
  await waitFor(() => screen.getByText('Not authorized'))
});

describe('when user clicks try again button', () => {
  it('redirects to homepage', async () => {
    render(<Recommendation />);
    expect(screen.getByText('We got your recommendation')).toBeInTheDocument();
    await waitFor(() => screen.getByText('Not authorized'))
    userEvent.click(screen.getByRole('button', { name: /try again/i }))
    // put memoryHistory and look at the page here
  });
});

it('shows recommendation list', async () => {
  const authenicatedCookies = new Cookies();
  authenicatedCookies.set('Authorization', 'authenticate-me-token')
  render(<Recommendation />, {
    cookies: authenicatedCookies
  });
  await waitForElementToBeRemoved(() => screen.getByText('Loading best recommendations for you...'))
  mockedRecommendations.forEach(item => {
    screen.getByText(item.type)
  })
});
