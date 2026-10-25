import { fireEvent, render, screen } from '@testing-library/react';

import BeforeAfter from '@/components/site/BeforeAfter';

describe('BeforeAfter', () => {
  const setup = () => {
    render(
      <BeforeAfter before='/before.webp' after='/after.webp' alt='lift' />,
    );
    return screen.getByRole('slider');
  };

  it('starts in the middle', () => {
    expect(setup()).toHaveAttribute('aria-valuenow', '50');
  });

  it('moves with the arrow keys and clamps at the ends', () => {
    const slider = setup();

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '55');

    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(slider).toHaveAttribute('aria-valuenow', '45');

    fireEvent.keyDown(slider, { key: 'End' });
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider).toHaveAttribute('aria-valuenow', '100');

    fireEvent.keyDown(slider, { key: 'Home' });
    expect(slider).toHaveAttribute('aria-valuenow', '0');
  });
});
