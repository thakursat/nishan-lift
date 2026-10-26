import { render, screen } from '@testing-library/react';

import SafetyPage from '@/app/safety/page';
import { emergencySteps, safetySystems } from '@/constant/nishan-content';

jest.mock('next/navigation', () => ({
  usePathname: () => '/safety',
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

describe('Safety page', () => {
  it('renders one page heading', () => {
    render(<SafetyPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('explains every safety system and every emergency step', () => {
    render(<SafetyPage />);
    safetySystems.forEach((system) =>
      expect(screen.getByText(system.name)).toBeInTheDocument(),
    );
    emergencySteps.forEach((step) =>
      expect(screen.getByText(step.title)).toBeInTheDocument(),
    );
  });

  it('puts the 24×7 emergency number one tap away', () => {
    render(<SafetyPage />);
    expect(
      screen
        .getAllByRole('link', { name: /24×7 emergency line/i })
        .every((link) => link.getAttribute('href') === 'tel:+919928058124'),
    ).toBe(true);
  });
});
