import React from 'react';

import { render, screen, waitFor, testHistory } from '../testUtils';
import App from './App';

import { stepsInOrder, stepsData } from './Wizard.config'

const [firstStep] = stepsInOrder

it('renders first step of the wizard', async () => {
  const { history } = render(<App />, {
    initialEntries: ['/wizard']
  });
  expect(history.location.pathname).toBe(`/wizard/${stepsInOrder[0]}`);
  await waitFor(() => screen.getByPlaceholderText(stepsData[firstStep].placeholder))
});
