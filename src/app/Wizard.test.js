import React from 'react';
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, waitForElementToBeRemoved } from '../testUtils';
import App from './App';
import { mockedRecommendations } from '../mocks/handlers'
import { stepsInOrder, stepsData, requiredMessage } from './Wizard.config'
import { capitalizeSnakeCase } from '../utils/capitalize'

const [firstStep, secondStep, thirdStep, fourthStep, fifthStep, lastStep] = stepsInOrder

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

describe('required field is filled', () => {
  it('shows next step field when user click to next button', async () => {
    render(<App />, {
      initialEntries: ['/wizard']
    });
    userEvent.type(screen.getByPlaceholderText(stepsData[firstStep].placeholder), 'jane doe')
    userEvent.click(screen.getByRole('button', { name: /next/i }))
    await waitFor(() => screen.getByPlaceholderText(stepsData[secondStep].placeholder))
  });
})

describe('user fills every step of the wizard', () => {
  it('sends a POST request and redirects to recommendation', async () => {
    const { history } = render(<App />, {
      initialEntries: ['/wizard']
    });
    const nextButton = screen.getByRole('button', { name: /next/i })
    userEvent.type(screen.getByPlaceholderText(stepsData[firstStep].placeholder), 'jane doe')
    userEvent.click(nextButton)
    await waitFor(() => screen.getByPlaceholderText(stepsData[secondStep].placeholder))
    userEvent.type(screen.getByPlaceholderText(stepsData[secondStep].placeholder), 'abc strasse')
    await waitForElementToBeRemoved(() => screen.getByText(requiredMessage))
    userEvent.click(nextButton)
    await waitFor(() => screen.getByText(stepsData[thirdStep].label))
    userEvent.click(screen.getByLabelText(stepsData[thirdStep].options[0].label))
    userEvent.click(nextButton)
    await waitFor(() => screen.getByText(stepsData[fourthStep].label))
    userEvent.type(screen.getByLabelText(stepsData[fourthStep].label), '1')
    userEvent.click(nextButton)
    await waitFor(() => screen.getByText(stepsData[fifthStep].label))
    userEvent.click(screen.getByLabelText(stepsData[fifthStep].options[0].label))
    await waitForElementToBeRemoved(() => screen.getByText(requiredMessage))
    userEvent.click(nextButton)
    await waitFor(() => screen.getByText(stepsData[lastStep].label))
    userEvent.type(screen.getByPlaceholderText(stepsData[lastStep].placeholder), 'test@test.com')
    await waitForElementToBeRemoved(() => screen.getByText(requiredMessage))
    userEvent.click(screen.getByRole('button', { name: /submit/i }))
    await waitFor(() => screen.getByText('Validating your data...'))
    await waitFor(() => expect(history.location.pathname).toBe('/recommendation'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading best recommendations for you...'))
    mockedRecommendations.forEach(item => {
      screen.getByText(capitalizeSnakeCase(item.type))
    })
  });
})