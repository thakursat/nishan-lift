import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DoorImage, Reveal } from '@/components/site/Reveal';

type Product = { name: string; image: string };

type ProductRailProps = {
  products: Product[];
  className?: string;
};

/** Swipeable on phones, a calm grid from tablets up. */
export default function ProductRail({ products, className }: ProductRailProps) {
  return (
    <ul
      className={cn(
        'no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal
          key={product.name}
          as='li'
          delay={(index % 4) * 0.06}
          className='w-[70%] shrink-0 snap-start sm:w-auto'
        >
          <Link href='/contact' className='group block'>
            <DoorImage
              src={product.image}
              alt={product.name}
              className='aspect-[3/4] rounded-2xl bg-(--color-border)'
              imageClassName='transition duration-700 group-hover:scale-[1.03]'
              sizes='(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 25vw'
            />
            <span className='mt-4 flex items-center justify-between gap-3'>
              <span className='text-sm font-semibold'>{product.name}</span>
              <ArrowUpRight className='h-4 w-4 shrink-0 text-(--color-text-muted) transition group-hover:text-(--color-accent)' />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
