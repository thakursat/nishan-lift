// !STARTERCONF You should delete this page

import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('Homepage', () => {
  it('renders the updated homepage heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Nishan Lift Solutions/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
