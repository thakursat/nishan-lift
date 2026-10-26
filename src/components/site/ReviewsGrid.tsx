import { Reveal } from '@/components/site/Reveal';

type Review = { name: string; date: string; text: string };

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  return (
    <ul className='no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3'>
      {reviews.map((review, index) => (
        <Reveal
          key={review.name}
          as='li'
          delay={index * 0.08}
          className='w-[85%] shrink-0 snap-start sm:w-auto'
        >
          <figure className='flex h-full flex-col justify-between rounded-3xl border border-(--color-border) bg-(--color-surface) p-7 sm:p-8'>
            <blockquote className='text-base leading-relaxed text-(--color-text-primary)/85'>
              “{review.text}”
            </blockquote>
            <figcaption className='mt-8 flex items-center gap-3 border-t border-(--color-border) pt-5'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full bg-(--color-bg) text-sm font-semibold'>
                {review.name.charAt(0)}
              </span>
              <span>
                <span className='block text-sm font-semibold'>
                  {review.name}
                </span>
                <span className='block text-xs text-(--color-text-muted)'>
                  Google review · {review.date}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
