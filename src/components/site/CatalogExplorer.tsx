'use client';

import { ArrowUpRight, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import {
  featuredServices,
  products,
  services,
} from '@/constant/nishan-content';

type Tab = 'services' | 'products';

type Item = {
  name: string;
  description?: string;
  image?: string;
};

const serviceItems: Item[] = [
  ...services.map((name) => ({ name })),
  ...featuredServices.map((service) => ({
    name: service.title,
    description: service.description,
    image: service.image,
  })),
];

const productItems: Item[] = products.map((product) => ({
  name: product.name,
  image: product.image,
}));

export default function CatalogExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: Tab =
    searchParams.get('tab') === 'products' ? 'products' : 'services';
  const [query, setQuery] = useState('');

  const items = useMemo(() => {
    const source = tab === 'products' ? productItems : serviceItems;
    const needle = query.trim().toLowerCase();
    if (!needle) return source;
    return source.filter((item) =>
      `${item.name} ${item.description ?? ''}`.toLowerCase().includes(needle),
    );
  }, [query, tab]);

  const selectTab = (next: Tab) => {
    router.replace(next === 'products' ? '?tab=products' : '?', {
      scroll: false,
    });
  };

  return (
    <div>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div
          role='tablist'
          aria-label='Catalogue'
          className='flex w-full rounded-full bg-(--color-ink) p-1.5 sm:w-auto'
        >
          {(['services', 'products'] as const).map((value) => (
            <button
              key={value}
              role='tab'
              type='button'
              aria-selected={tab === value}
              onClick={() => selectTab(value)}
              className={cn(
                'relative flex-1 rounded-full px-6 py-2.5 text-sm font-bold capitalize transition sm:flex-none',
                tab === value ? 'text-white' : 'text-white/50 hover:text-white',
              )}
            >
              {tab === value && (
                <motion.span
                  layoutId='catalog-tab'
                  className='absolute inset-0 rounded-full bg-(--color-accent)'
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span className='relative'>{value}</span>
            </button>
          ))}
        </div>

        <label className='relative block w-full sm:w-80'>
          <span className='sr-only'>Search products and services</span>
          <Search className='pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-(--color-text-muted)' />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search products & services'
            className='w-full rounded-full border border-(--color-border) bg-(--color-surface) py-3 pr-4 pl-11 text-sm focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 focus:outline-none'
          />
        </label>
      </div>

      <motion.ul
        layout
        className={cn(
          'mt-10 grid gap-4',
          tab === 'products'
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        <AnimatePresence mode='popLayout'>
          {items.map((item, index) => (
            <motion.li
              key={`${tab}-${item.name}`}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, delay: index * 0.035 }}
              className={cn(
                item.description &&
                  tab === 'services' &&
                  'sm:col-span-2 lg:col-span-3',
              )}
            >
              <article
                className={cn(
                  'group relative flex h-full overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) transition hover:-translate-y-1 hover:shadow-xl',
                  item.description
                    ? 'flex-col md:flex-row'
                    : item.image
                      ? 'flex-col'
                      : 'items-center gap-4 p-4',
                )}
              >
                {item.image && (
                  <div
                    className={cn(
                      'relative overflow-hidden',
                      item.description
                        ? 'aspect-[16/10] md:aspect-auto md:w-2/5'
                        : 'aspect-[3/4]',
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes='(max-width: 768px) 50vw, 25vw'
                      className='object-cover transition duration-700 group-hover:scale-105'
                    />
                  </div>
                )}
                {!item.image && (
                  <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-accent)/10 text-sm font-semibold text-(--color-accent)'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <div
                  className={cn(
                    'flex flex-1 flex-col justify-between gap-3',
                    item.image && 'p-4',
                    item.description && 'sm:p-8',
                  )}
                >
                  <div>
                    <h3
                      className={cn(
                        'font-semibold',
                        item.description
                          ? 'text-2xl sm:text-3xl'
                          : 'text-sm sm:text-base',
                      )}
                    >
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className='mt-3 text-sm leading-relaxed text-(--color-text-muted)'>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href='/contact'
                    className='flex w-fit items-center gap-1.5 text-sm font-semibold text-(--color-accent)'
                  >
                    Enquire
                    <ArrowUpRight className='h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                  </Link>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {!items.length && (
        <p className='mt-10 text-center text-sm text-(--color-text-muted)'>
          No match for “{query}”. Try another word, or{' '}
          <Link href='/contact' className='font-semibold text-(--color-accent)'>
            ask us directly
          </Link>
          .
        </p>
      )}
      {!!items.length && (
        <p className='mt-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-(--color-text-muted)'>
          You’ve explored all available {tab}.
        </p>
      )}
    </div>
  );
}
