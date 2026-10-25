'use client';

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

const LIFT_EASE = [0.65, 0, 0.35, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the content travels from, like a car arriving at a floor. */
  from?: 'below' | 'above' | 'left' | 'right';
  as?: 'div' | 'article' | 'section' | 'li' | 'figure';
};

const offsets = {
  below: { y: 48, x: 0 },
  above: { y: -48, x: 0 },
  left: { y: 0, x: -48 },
  right: { y: 0, x: 48 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = 'below',
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const offset = reduce ? { x: 0, y: 0 } : offsets[from];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: LIFT_EASE }}
    >
      {children}
    </Component>
  );
}

type SplitHeadingProps = {
  text: string;
  className?: string;
  accent?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
};

/** Each word rises out of its own masked "floor slot". */
export function SplitHeading({
  text,
  className,
  accent,
  as = 'h2',
  delay = 0,
}: SplitHeadingProps) {
  // Observe the heading itself: each word starts clipped by its mask, so the
  // words alone would never register as intersecting.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className='inline-block overflow-hidden pb-[0.08em] align-bottom'
        >
          <motion.span
            className={cn(
              'inline-block',
              accent && word.includes(accent) && 'text-(--color-accent)',
            )}
            initial={{ y: reduce ? 0 : '110%' }}
            animate={{ y: inView || reduce ? '0%' : '110%' }}
            transition={{
              duration: 0.9,
              delay: delay + index * 0.07,
              ease: LIFT_EASE,
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && '\u00a0'}
        </span>
      ))}
    </Tag>
  );
}

type DoorImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Image hidden behind a pair of brushed-steel landing doors that slide apart
 * when it scrolls into view.
 */
export function DoorImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = '(max-width: 768px) 90vw, 40vw',
  priority,
}: DoorImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const open = inView || reduce;

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className='absolute inset-0'
        initial={{ scale: 1.15 }}
        animate={{ scale: open ? 1 : 1.15 }}
        transition={{ duration: 1.6, ease: LIFT_EASE, delay: 0.2 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </motion.div>
      {(['left', 'right'] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className={cn(
            'steel absolute inset-y-0 z-10 w-1/2',
            side === 'left'
              ? 'left-0 border-r border-black/20'
              : 'right-0 border-l border-white/40',
          )}
          initial={{ x: '0%' }}
          animate={{ x: open ? (side === 'left' ? '-101%' : '101%') : '0%' }}
          transition={{ duration: 1.1, ease: LIFT_EASE, delay: 0.15 }}
        />
      ))}
    </div>
  );
}

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
};

export function CountUp({
  value,
  decimals = 0,
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const display = useTransform(
    count,
    (latest) => `${latest.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, inView, value]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${value.toFixed(decimals)}${suffix}`}
    >
      <motion.span aria-hidden>{display}</motion.span>
    </span>
  );
}
