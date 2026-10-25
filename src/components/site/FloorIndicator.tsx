'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type Floor = { label: string; name: string };

/**
 * Reads every `[data-floor]` section on the page and treats them as floors:
 * the header lantern shows the floor in view, and a shaft rail (desktop)
 * carries a little car up and down with scroll progress.
 */
export default function FloorIndicator() {
  const pathname = usePathname();
  const [floors, setFloors] = useState<Floor[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const carTop = useTransform(progress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-floor]'),
    );
    setFloors(
      sections.map((section) => ({
        label: section.dataset.floor ?? '',
        name: section.dataset.floorName ?? '',
      })),
    );
    setCurrent(0);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(sections.indexOf(entry.target as HTMLElement));
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    let timer: number | undefined;
    const unsubscribe = scrollY.on('change', (latest) => {
      const previous = scrollY.getPrevious() ?? latest;
      if (latest === previous) return;
      setDirection(latest > previous ? 'down' : 'up');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setDirection(null), 700);
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, [scrollY]);

  if (!floors.length) return null;
  const floor = floors[current] ?? floors[0];

  return (
    <>
      <div
        className='flex h-10 items-center gap-1.5 rounded-full bg-black/80 px-3 ring-1 ring-white/10'
        aria-label={`Viewing ${floor.name}`}
        role='status'
      >
        <span className='flex w-3 flex-col items-center text-[8px] leading-[9px]'>
          <span
            className={cn(
              'transition',
              direction === 'up'
                ? 'text-[#ff3b3b] drop-shadow-[0_0_4px_rgba(255,40,40,0.9)]'
                : 'text-white/20',
            )}
          >
            ▲
          </span>
          <span
            className={cn(
              'transition',
              direction === 'down'
                ? 'text-[#ff3b3b] drop-shadow-[0_0_4px_rgba(255,40,40,0.9)]'
                : 'text-white/20',
            )}
          >
            ▼
          </span>
        </span>
        <span className='relative h-7 w-6 overflow-hidden'>
          <AnimatePresence mode='popLayout' initial={false}>
            <motion.span
              key={floor.label}
              className='led absolute inset-0 flex items-center justify-center text-2xl leading-none'
              initial={{ y: direction === 'up' ? '-100%' : '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: direction === 'up' ? '100%' : '-100%' }}
              transition={{ duration: 0.25 }}
            >
              {floor.label}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      {/* Shaft rail, desktop only */}
      <div
        aria-hidden
        className='pointer-events-none fixed top-1/2 right-5 z-40 hidden h-[56vh] -translate-y-1/2 xl:block'
      >
        <div className='relative h-full w-8'>
          <div className='absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-neutral-400/60' />
          <div className='absolute inset-y-0 left-[calc(50%-5px)] w-px bg-neutral-400/30' />
          {floors.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className='absolute right-full mr-2 flex -translate-y-1/2 items-center gap-2'
              style={{
                top: `${(index / Math.max(1, floors.length - 1)) * 100}%`,
              }}
            >
              <span
                className={cn(
                  'font-display text-[11px] font-bold whitespace-nowrap uppercase tracking-widest transition',
                  index === current
                    ? 'text-(--color-accent) opacity-100'
                    : 'opacity-0',
                )}
              >
                {item.name}
              </span>
              <span
                className={cn(
                  'h-px w-3 transition',
                  index === current
                    ? 'bg-(--color-accent)'
                    : 'bg-neutral-400/60',
                )}
              />
            </div>
          ))}
          <motion.div
            className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2'
            style={{ top: carTop }}
          >
            <div className='steel flex h-10 w-7 items-center justify-center rounded-md shadow-lg ring-1 ring-black/20'>
              <span className='led text-sm'>{floor.label}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
