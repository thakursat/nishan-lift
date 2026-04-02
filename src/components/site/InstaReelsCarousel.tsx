'use client';

import { useRef } from 'react';

type InstaReel = {
  shortcode: string;
};

type InstaReelsCarouselProps = {
  items: InstaReel[];
};

export default function InstaReelsCarousel({
  items,
}: InstaReelsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const distance = direction === 'left' ? -300 : 300;
    containerRef.current?.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <div>
      <div className='mb-4 flex justify-end gap-2'>
        <button
          type='button'
          aria-label='Scroll testimonials left'
          onClick={() => scrollByAmount('left')}
          className='rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold text-(--color-text-primary) transition hover:border-(--color-accent)'
        >
          ←
        </button>
        <button
          type='button'
          aria-label='Scroll testimonials right'
          onClick={() => scrollByAmount('right')}
          className='rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold text-(--color-text-primary) transition hover:border-(--color-accent)'
        >
          →
        </button>
      </div>

      <div
        ref={containerRef}
        className='flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2'
      >
        {items.map((item) => (
          <article
            key={item.shortcode}
            className='glass-panel min-w-[82%] snap-start rounded-2xl p-3 sm:min-w-[46%] lg:min-w-[28%]'
          >
            <div className='overflow-hidden rounded-xl border border-(--color-border)'>
              <iframe
                src={`https://www.instagram.com/p/${item.shortcode}/embed/`}
                title={`Customer testimonial reel ${item.shortcode}`}
                loading='lazy'
                scrolling='no'
                allowFullScreen
                className='h-[540px] w-full'
                style={{ border: 'none' }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
