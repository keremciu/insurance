import React from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen } from '../testUtils';
import App from './App';

it('renders header title', () => {
  render(<App />);
  expect(screen.getByText('Brand new insurance experience')).toBeInTheDocument();
});

it('renders home component button first', () => {
  render(<App />, {
    history: 'naber'
  });
  screen.getByRole('button', {name: /start/i});
});

describe('when user clicks start button', () => {
  it('renders wizard component', () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', {name: /start/i}));
  });
});