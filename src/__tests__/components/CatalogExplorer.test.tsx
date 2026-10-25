import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CatalogExplorer from '@/components/site/CatalogExplorer';

const replace = jest.fn();
let tab: string | null = null;

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  useSearchParams: () => ({ get: () => tab }),
}));

describe('CatalogExplorer', () => {
  beforeEach(() => {
    tab = null;
    replace.mockClear();
  });

  it('shows services by default and filters by search', async () => {
    render(<CatalogExplorer />);
    expect(screen.getByText('Oil Filtration')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'pressure' },
    });
    expect(screen.getByText('Pressure Testing')).toBeInTheDocument();
    // Filtered-out cards leave through an exit animation.
    await waitFor(() =>
      expect(screen.queryByText('Oil Filtration')).not.toBeInTheDocument(),
    );
  });

  it('shows a fallback when nothing matches', () => {
    render(<CatalogExplorer />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'escalator' },
    });
    expect(screen.getByText(/No match for/)).toBeInTheDocument();
  });

  it('reads the products tab from the URL and switches tabs via the router', () => {
    tab = 'products';
    render(<CatalogExplorer />);
    expect(screen.getByText('SS Mirror Finish Glass Door')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'products' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.click(screen.getByRole('tab', { name: 'services' }));
    expect(replace).toHaveBeenCalledWith('?', { scroll: false });
  });
});
