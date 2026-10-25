import { fireEvent, render, screen } from '@testing-library/react';

import SiteHeader from '@/components/site/SiteHeader';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => '/about',
  useRouter: () => ({ push }),
}));

describe('SiteHeader', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    push.mockClear();
  });

  afterEach(() => jest.useRealTimers());

  it('opens the car operating panel with a button per floor', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    const panel = screen.getByRole('dialog', { name: 'Site menu' });
    expect(panel).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Products & Services/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Lift stuck\? Call 24×7/ }),
    ).toHaveAttribute('href', 'tel:+919928058124');
  });

  it('navigates after a floor button is pressed', () => {
    render(<SiteHeader />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    fireEvent.click(screen.getByRole('button', { name: /Contact/ }));

    expect(push).not.toHaveBeenCalled();
    jest.advanceTimersByTime(400);
    expect(push).toHaveBeenCalledWith('/contact');
  });
});
