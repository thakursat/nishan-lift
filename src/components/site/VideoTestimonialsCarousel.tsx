'use client';

import { useRef } from 'react';

type VideoTestimonial = {
  name: string;
  project: string;
  description: string;
  youtubeId: string;
};

type VideoTestimonialsCarouselProps = {
  items: VideoTestimonial[];
};

export default function VideoTestimonialsCarousel({
  items,
}: VideoTestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const distance = direction === 'left' ? -380 : 380;
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
        className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2'
      >
        {items.map((item) => (
          <article
            key={`${item.name}-${item.youtubeId}`}
            className='glass-panel min-w-[86%] snap-start rounded-2xl p-4 sm:min-w-[62%] lg:min-w-[48%] xl:min-w-[38%]'
          >
            <div className='overflow-hidden rounded-xl border border-(--color-border)'>
              <div className='aspect-video'>
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}`}
                  title={`${item.name} testimonial`}
                  loading='lazy'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                  className='h-full w-full'
                />
              </div>
            </div>

            <div className='mt-3'>
              <p className='text-sm font-semibold'>{item.name}</p>
              <p className='text-xs text-(--color-text-muted)'>
                {item.project}
              </p>
              <p className='mt-2 text-sm text-(--color-text-muted)'>
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
