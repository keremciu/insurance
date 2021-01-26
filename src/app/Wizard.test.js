import React from 'react';

import { render, screen, waitFor, testHistory } from '../testUtils';
import App from './App';

import { stepsInOrder, stepsData } from './Wizard.config'

const [firstStep] = stepsInOrder

it('renders first step of the wizard', async () => {
  render(<App />);
  // await waitFor(() => expect(testHistory).toBeCalled(true))
  // await waitFor(() => screen.getByPlaceholderText(stepsData[firstStep].placeholder))
  // expect(testHistory.location.pathname).toBe(`/wizard/${stepsInOrder[0]}`);
});
