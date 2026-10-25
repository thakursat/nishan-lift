import { Quote } from 'lucide-react';

import { cn } from '@/lib/utils';

type Review = { name: string; date: string; text: string };

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className='glass-panel w-[78vw] max-w-sm shrink-0 rounded-3xl p-5 sm:w-auto sm:max-w-none'>
      <div className='flex items-center justify-between'>
        <span className='text-[10px] font-bold uppercase tracking-[0.25em] text-(--color-text-muted)'>
          Google review
        </span>
        <Quote className='h-5 w-5 text-(--color-accent)/30' />
      </div>
      <blockquote className='mt-3 text-sm leading-relaxed text-(--color-text-primary)/85'>
        {review.text}
      </blockquote>
      <figcaption className='mt-4 flex items-center gap-3'>
        <span className='flex h-9 w-9 items-center justify-center rounded-full bg-(--color-accent) text-sm font-bold text-white'>
          {review.name.charAt(0)}
        </span>
        <span>
          <span className='block text-sm font-semibold'>{review.name}</span>
          <span className='block text-xs text-(--color-text-muted)'>
            {review.date}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Phones: two rows drifting in opposite directions.
 * Larger screens: three columns travelling vertically like lift cars.
 */
export default function ReviewsWall({ reviews }: { reviews: Review[] }) {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];
  const columns = [0, 1, 2].map((column) =>
    reviews.filter((_, index) => index % 3 === column),
  );

  return (
    <>
      <div className='grid gap-4 md:hidden'>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className='marquee-pause -mx-4 flex overflow-hidden'
          >
            <div
              className='marquee-track flex shrink-0 gap-4 pr-4 pl-4'
              style={
                {
                  '--marquee-duration': `${45 + rowIndex * 10}s`,
                  animationDirection: rowIndex ? 'reverse' : 'normal',
                } as React.CSSProperties
              }
            >
              {[...row, ...row].map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  aria-hidden={index >= row.length}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='relative hidden h-[640px] grid-cols-3 gap-5 overflow-hidden [mask-image:linear-gradient(transparent,black_12%,black_88%,transparent)] md:grid'>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className='marquee-pause overflow-hidden'>
            <div
              className={cn('marquee-up-track flex flex-col gap-5')}
              style={
                {
                  '--marquee-duration': `${32 + columnIndex * 8}s`,
                  animationDirection: columnIndex === 1 ? 'reverse' : 'normal',
                } as React.CSSProperties
              }
            >
              {[...column, ...column].map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  aria-hidden={index >= column.length}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
