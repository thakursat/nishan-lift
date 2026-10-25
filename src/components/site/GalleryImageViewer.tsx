'use client';

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type GalleryImageViewerProps = {
  images: string[];
  /** How many tiles to show before the "view all" toggle. */
  initialCount?: number;
};

export default function GalleryImageViewer({
  images,
  initialCount = images.length,
}: GalleryImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? images : images.slice(0, initialCount);

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + delta + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeIndex, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) step(1);
    if (info.offset.x > 60) step(-1);
  };

  return (
    <>
      <div className='columns-2 gap-3 sm:columns-3 lg:columns-4'>
        {visible.map((image, index) => (
          <motion.button
            key={image}
            type='button'
            onClick={() => setActiveIndex(index)}
            aria-label={`Open gallery image ${index + 1}`}
            className='group relative mb-3 block w-full overflow-hidden rounded-2xl bg-black/5 break-inside-avoid'
            initial={{ opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{
              duration: 0.9,
              delay: (index % 4) * 0.08,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <Image
              src={image}
              alt={`Nishan Lift Solutions installation ${index + 1}`}
              width={600}
              height={index % 3 === 0 ? 800 : 700}
              sizes='(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw'
              className='h-auto w-full object-cover transition duration-700 group-hover:scale-105'
            />
            <span className='absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/60 via-transparent p-3 opacity-0 transition group-hover:opacity-100'>
              <span className='led text-sm'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <Expand className='h-4 w-4 text-white' />
            </span>
          </motion.button>
        ))}
      </div>

      {images.length > initialCount && (
        <div className='mt-6 flex justify-center'>
          <button
            type='button'
            onClick={() => setShowAll((value) => !value)}
            className='rounded-full border border-(--color-border) bg-(--color-surface) px-6 py-3 text-sm font-semibold transition hover:border-(--color-accent) hover:text-(--color-accent)'
          >
            {showAll ? 'Show less' : `View all ${images.length} photos`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-label='Image viewer'
            className='fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='flex items-center justify-between px-4 py-4'>
              <span className='rounded-lg bg-black px-3 py-1 ring-1 ring-white/10'>
                <span className='led text-lg'>
                  {activeIndex + 1}
                  <span className='text-white/30'> / {images.length}</span>
                </span>
              </span>
              <button
                type='button'
                onClick={() => setActiveIndex(null)}
                aria-label='Close image viewer'
                className='flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='relative flex-1 overflow-hidden'>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  className='absolute inset-0 touch-pan-y px-4'
                  variants={{
                    enter: (dir: number) => ({
                      x: `${dir * 100}%`,
                      opacity: 0,
                    }),
                    center: { x: '0%', opacity: 1 },
                    exit: (dir: number) => ({
                      x: `${dir * -100}%`,
                      opacity: 0,
                    }),
                  }}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                  drag='x'
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={onDragEnd}
                >
                  <Image
                    src={images[activeIndex]}
                    alt={`Expanded gallery image ${activeIndex + 1}`}
                    fill
                    sizes='100vw'
                    className='object-contain'
                    draggable={false}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <button
                type='button'
                onClick={() => step(-1)}
                aria-label='Show previous image'
                className='absolute top-1/2 left-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex'
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
              <button
                type='button'
                onClick={() => step(1)}
                aria-label='Show next image'
                className='absolute top-1/2 right-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex'
              >
                <ChevronRight className='h-6 w-6' />
              </button>
            </div>

            <p className='pb-safe py-4 text-center text-xs text-white/40 sm:hidden'>
              Swipe to browse
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
