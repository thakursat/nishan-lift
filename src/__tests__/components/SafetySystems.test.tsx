import { act, fireEvent, render, screen } from '@testing-library/react';

import SafetySystems from '@/components/site/SafetySystems';

import { safetySystems } from '@/constant/nishan-content';

describe('SafetySystems', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  const pressed = () =>
    screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-pressed') === 'true');

  it('cycles through the systems on its own', () => {
    render(<SafetySystems floor='1' />);
    expect(pressed()[0]).toHaveTextContent(safetySystems[0].name);

    act(() => {
      jest.advanceTimersByTime(3600);
    });
    expect(pressed()[0]).toHaveTextContent(safetySystems[1].name);
  });

  it('stops cycling once a visitor picks a system', () => {
    render(<SafetySystems floor='1' />);
    fireEvent.click(screen.getByRole('button', { name: /Pit buffers/ }));

    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(pressed()).toHaveLength(1);
    expect(pressed()[0]).toHaveTextContent('Pit buffers');
  });
});
