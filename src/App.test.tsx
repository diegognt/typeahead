import { test, describe } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('The App', () => {
  test('renders', () => {
    render(<App />);
  });
})
