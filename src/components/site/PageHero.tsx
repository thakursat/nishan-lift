'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { type ReactNode, useRef } from 'react';

import { SplitHeading } from '@/components/site/Reveal';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  children,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      ref={ref}
      data-floor='G'
      data-floor-name='Lobby'
      className='relative isolate flex min-h-[70svh] items-end overflow-hidden bg-(--color-ink) text-white'
    >
      <motion.div className='absolute inset-0 -z-10' style={{ y }}>
        <motion.div
          className='absolute inset-0'
          initial={{ clipPath: 'inset(0 50% 0 50%)' }}
          animate={{ clipPath: 'inset(0 0% 0 0%)' }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
        </motion.div>
        <div className='absolute inset-0 bg-linear-to-t from-(--color-ink) via-black/55 to-black/45' />
      </motion.div>

      <div className='layout w-full pt-40 pb-16 sm:pb-24'>
        <motion.p
          className='text-xs font-semibold uppercase tracking-[0.2em] text-white/60'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {eyebrow}
        </motion.p>
        <SplitHeading
          as='h1'
          text={title}
          accent={accent}
          delay={0.3}
          className='mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-6xl'
        />
        {description && (
          <motion.p
            className='mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
