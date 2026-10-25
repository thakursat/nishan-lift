import { act, render, waitFor } from '@testing-library/react';

import LiftIntro from '@/components/site/LiftIntro';

describe('LiftIntro', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
  });

  afterEach(() => jest.useRealTimers());

  it('skips the intro when it was already seen this session', async () => {
    jest.useRealTimers();
    window.sessionStorage.setItem('nishan-lift-intro-seen', '1');
    const { container } = render(<LiftIntro />);
    await waitFor(() => expect(container.querySelector('.steel')).toBeNull());
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('plays once, then remembers it for the session', () => {
    const { container } = render(<LiftIntro />);
    expect(container.querySelector('.steel')).not.toBeNull();
    expect(document.documentElement.style.overflow).toBe('hidden');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(window.sessionStorage.getItem('nishan-lift-intro-seen')).toBe('1');
    expect(document.documentElement.style.overflow).toBe('');
  });
});
