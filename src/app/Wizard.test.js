import React from 'react';
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '../testUtils';
import App from './App';

import { stepsInOrder, stepsData, requiredMessage } from './Wizard.config'

const [firstStep, secondStep] = stepsInOrder

it('renders first step of the wizard', () => {
  const { history } = render(<App />, {
    initialEntries: ['/wizard']
  });
  expect(history.location.pathname).toBe(`/wizard/${stepsInOrder[0]}`);
  screen.getByPlaceholderText(stepsData[firstStep].placeholder)
});

describe('required field is empty', () => {
  it('shows error when user clicks to next button', async () => {
    render(<App />, {
      initialEntries: ['/wizard']
    });
    userEvent.click(screen.getByRole('button', { name: /next/i }))
    await waitFor(() => screen.getByText(requiredMessage))
  });
})

describe('required field is field', () => {
  it('shows next step field when user click to next button', async () => {
    render(<App />, {
      initialEntries: ['/wizard']
    });
    userEvent.type(screen.getByPlaceholderText(stepsData[firstStep].placeholder), 'jane doe')
    userEvent.click(screen.getByRole('button', { name: /next/i }))
    await waitFor(() => screen.getByPlaceholderText(stepsData[secondStep].placeholder))
  });
})