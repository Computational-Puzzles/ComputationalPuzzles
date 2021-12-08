import React from 'react';
import { render, screen } from '@testing-library/react';
import Example from './index';

describe('Example component', () => {
  it('renders a heading', () => {
    render(<Example />);

    const heading = screen.getByRole('heading', {
      name: /Welcome to next\.js!/i
    });

    expect(heading).toBeInTheDocument();
  });
});
