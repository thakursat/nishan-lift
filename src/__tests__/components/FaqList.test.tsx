import { fireEvent, render, screen } from '@testing-library/react';

import FaqList from '@/components/site/FaqList';

const faqs = [
  { question: 'First question?', answer: 'First answer.' },
  { question: 'Second question?', answer: 'Second answer.' },
];

describe('FaqList', () => {
  it('opens the first answer and toggles one at a time', () => {
    render(<FaqList faqs={faqs} />);
    const [first, second] = screen.getAllByRole('button');

    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(second).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(second);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(second).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps every answer in the DOM for crawlers', () => {
    render(<FaqList faqs={faqs} />);
    expect(screen.getByText('Second answer.')).toBeInTheDocument();
  });
});
