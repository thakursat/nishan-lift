'use client';

import { ChevronsLeftRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { type KeyboardEvent, type PointerEvent, useRef, useState } from 'react';

type BeforeAfterProps = {
  before: string;
  after: string;
  alt: string;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export default function BeforeAfter({ before, after, alt }: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const moveTo = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') setPosition((value) => clamp(value - 5));
    if (event.key === 'ArrowRight') setPosition((value) => clamp(value + 5));
    if (event.key === 'Home') setPosition(0);
    if (event.key === 'End') setPosition(100);
  };

  return (
    <div
      ref={ref}
      role='slider'
      tabIndex={0}
      aria-label={`Before and after comparison: ${alt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={(event) => dragging && moveTo(event.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className='relative aspect-[4/5] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-[2rem] bg-black select-none focus-visible:ring-4 focus-visible:ring-(--color-accent)/40 focus-visible:outline-none'
    >
      <Image
        src={after}
        alt={`After: ${alt}`}
        fill
        sizes='(max-width: 768px) 100vw, 45vw'
        className='object-cover'
        draggable={false}
      />
      <motion.div
        className='absolute inset-0'
        initial={false}
        animate={{
          clipPath: `inset(0 ${100 - (inView || reduce ? position : 100)}% 0 0)`,
        }}
        transition={
          dragging
            ? { duration: 0 }
            : { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
        }
      >
        <Image
          src={before}
          alt={`Before: ${alt}`}
          fill
          sizes='(max-width: 768px) 100vw, 45vw'
          className='object-cover grayscale-[35%]'
          draggable={false}
        />
      </motion.div>

      <span className='absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white'>
        Before
      </span>
      <span className='absolute top-4 right-4 rounded-full bg-(--color-accent) px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white'>
        After
      </span>

      <motion.div
        className='absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]'
        initial={false}
        animate={{ left: `${inView || reduce ? position : 100}%` }}
        transition={
          dragging
            ? { duration: 0 }
            : { duration: 1.2, ease: [0.65, 0, 0.35, 1] }
        }
      >
        <span className='steel absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-black/80 shadow-xl ring-4 ring-white/60'>
          <ChevronsLeftRight className='h-5 w-5' />
        </span>
      </motion.div>
    </div>
  );
}
