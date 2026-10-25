'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Link from 'next/link';
import { type PointerEvent } from 'react';

import { cn } from '@/lib/utils';

import { DoorImage, Reveal } from '@/components/site/Reveal';

type Product = { name: string; image: string };

function ProductCard({ product, index }: { product: Product; index: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(useTransform(rx, [-0.5, 0.5], [7, -7]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(ry, [-0.5, 0.5], [-9, 9]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    rx.set((event.clientY - rect.top) / rect.height - 0.5);
    ry.set((event.clientX - rect.left) / rect.width - 0.5);
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className='group relative w-[72vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none'
    >
      <div className='steel-dark rounded-[1.75rem] p-2.5 shadow-xl ring-1 ring-black/10'>
        <div className='flex items-center justify-between px-2 pb-2'>
          <span className='led text-sm'>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className='flex gap-1'>
            <span className='h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]' />
            <span className='h-1.5 w-1.5 rounded-full bg-white/20' />
          </span>
        </div>
        <DoorImage
          src={product.image}
          alt={product.name}
          className='aspect-[3/4] rounded-[1.25rem]'
          imageClassName='transition duration-700 group-hover:scale-105'
          sizes='(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 25vw'
        />
        <div className='flex items-center justify-between gap-3 px-2 pt-3 pb-1'>
          <h3 className='text-sm font-semibold text-white'>{product.name}</h3>
          <Link
            href='/contact'
            aria-label={`Enquire about ${product.name}`}
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-accent) text-white transition group-hover:rotate-45'
          >
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

type ProductRailProps = {
  products: Product[];
  className?: string;
};

export default function ProductRail({ products, className }: ProductRailProps) {
  return (
    <Reveal>
      <div
        className={cn(
          'no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-4',
          className,
        )}
      >
        {products.map((product, index) => (
          <ProductCard key={product.name} product={product} index={index} />
        ))}
      </div>
    </Reveal>
  );
}
