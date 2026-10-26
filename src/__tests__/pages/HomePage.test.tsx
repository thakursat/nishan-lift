import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe('Homepage', () => {
  it('renders the hero heading', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /Safe, reliable lifts/i }),
    ).toBeInTheDocument();
  });

  it('marks every section as a floor for the floor indicator', () => {
    const { container } = render(<HomePage />);
    const floors = Array.from(
      container.querySelectorAll<HTMLElement>('[data-floor]'),
    ).map((section) => section.dataset.floor);

    expect(floors).toEqual([
      'G',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
    ]);
  });

  it('shows the live business phone number and real reviews', () => {
    render(<HomePage />);

    expect(
      screen.getAllByRole('link', { name: /\+91 99280 58124/ }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText('Harsh Bhandari').length).toBeGreaterThan(0);
  });
});
