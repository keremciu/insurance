import React from 'react';
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../testUtils';
import App from './App';

import { stepsInOrder, stepsData, requiredMessage } from './Wizard.config'

const [firstStep] = stepsInOrder

it('renders first step of the wizard', () => {
  const { history } = render(<App />, {
    initialEntries: ['/wizard']
  });
  expect(history.location.pathname).toBe(`/wizard/${stepsInOrder[0]}`);
  screen.getByPlaceholderText(stepsData[firstStep].placeholder)
});

describe('required field is empty', () => {
  it('shows error when user tries to go next step', async () => {
    const { history } = render(<App />, {
      initialEntries: ['/wizard']
    });
    userEvent.click(screen.getByRole('button', { name: /next/i }))
    await waitFor(() => screen.getByText(requiredMessage))
  });
})
