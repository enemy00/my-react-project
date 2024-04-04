import React from 'react';
import { render, screen } from '@testing-library/react';
import EnemyApp from './App';

test('renders learn react link', () => {
  render(<EnemyApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
