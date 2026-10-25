'use client';

import { ArrowUpRight, Phone, Star } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import LiftShaft from '@/components/site/LiftShaft';
import { CountUp, SplitHeading } from '@/components/site/Reveal';

import { companyInfo, metrics, rating } from '@/constant/nishan-content';

const slides = [
  { src: '/images/site/hero-cabin.webp', caption: 'Designer SS cabin' },
  { src: '/images/site/golden-cabin.webp', caption: 'Golden finish interior' },
  { src: '/images/site/landing-door.webp', caption: 'Marble-clad landing' },
  { src: '/images/site/gallery/03.webp', caption: 'Mirror-finish cabin' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      data-floor='G'
      data-floor-name='Lobby'
      className='grain relative isolate flex min-h-svh flex-col overflow-hidden bg-(--color-ink) text-white'
    >
      <motion.div className='absolute inset-0 -z-10' style={{ y: imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[slide].src}
            className='absolute inset-0'
            initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <Image
              src={slides[slide].src}
              alt={slides[slide].caption}
              fill
              priority={slide === 0}
              sizes='100vw'
              className='ken-burns object-cover'
            />
          </motion.div>
        </AnimatePresence>
        <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/45 to-(--color-ink)' />
        <div className='absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent' />
      </motion.div>

      <div className='blueprint absolute inset-0 -z-10 opacity-40' />

      <motion.div
        className='layout relative flex flex-1 flex-col justify-end gap-10 pt-28 pb-10 md:flex-row md:items-center md:justify-between md:pb-16'
        style={{ y: contentY, opacity: fade }}
      >
        <div className='max-w-2xl'>
          <motion.a
            href={companyInfo.reviewsUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-1.5 text-xs font-semibold backdrop-blur-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className='flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-black'>
              <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
              {rating.score}
            </span>
            {rating.count}+ Google reviews
            <span className='h-1 w-1 rounded-full bg-white/40' />
            <span className='flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500' />
              </span>
              Open 24h
            </span>
          </motion.a>

          <SplitHeading
            as='h1'
            text='Premium lifts. Built in Jaipur. Serviced 24×7.'
            accent='24×7.'
            delay={0.35}
            className='font-display mt-6 text-[3.4rem] leading-[0.92] font-extrabold uppercase sm:text-7xl lg:text-8xl'
          />

          <motion.p
            className='mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {companyInfo.name} designs, installs, modernizes and maintains
            passenger, home, hospital and goods elevators across Jaipur, Ajmer,
            Sikar and Jhunjhunu.
          </motion.p>

          <motion.div
            className='mt-8 flex flex-col gap-3 min-[420px]:flex-row'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <Link
              href='/contact'
              className='group sheen flex items-center justify-center gap-2 rounded-full bg-(--color-accent) px-7 py-4 text-sm font-bold shadow-[0_0_40px_rgba(196,0,0,0.5)] transition hover:bg-(--color-accent-strong)'
            >
              Get a free quote
              <ArrowUpRight className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </Link>
            <a
              href={companyInfo.phoneHref}
              className='group flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 pr-6 pl-2 text-sm font-bold backdrop-blur-md transition hover:bg-white/10'
            >
              <span className='steel flex h-10 w-10 items-center justify-center rounded-full text-black/80 shadow-[inset_0_2px_3px_rgba(255,255,255,0.7)]'>
                <span className='flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-[#ff3b3b] shadow-[0_0_12px_rgba(255,40,40,0.8)] transition group-hover:shadow-[0_0_20px_rgba(255,40,40,1)]'>
                  <Phone className='h-3.5 w-3.5' />
                </span>
              </span>
              {companyInfo.phone}
            </a>
          </motion.div>
        </div>

        <motion.div
          className='hidden shrink-0 md:block'
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className='rounded-[2rem] bg-black/40 p-5 ring-1 ring-white/10 backdrop-blur-md'>
            <LiftShaft />
            <p className='mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40'>
              Traction lift · live
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* LED stats strip */}
      <div className='relative border-t border-white/10 bg-black/50 backdrop-blur-md'>
        <div className='layout grid grid-cols-2 sm:grid-cols-4'>
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col gap-0.5 py-4 sm:py-5 ${
                index % 2 === 1 ? 'border-l border-white/10 pl-4' : ''
              } ${index >= 2 ? 'border-t border-white/10 sm:border-t-0' : ''} ${
                index === 2 ? 'sm:border-l sm:pl-4' : ''
              }`}
            >
              <CountUp
                value={metric.value}
                decimals={metric.decimals}
                suffix={metric.suffix}
                className='led text-3xl sm:text-4xl'
              />
              <span className='text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50'>
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* slide pager */}
      <div className='absolute top-24 right-4 hidden flex-col gap-2 sm:flex md:top-auto md:right-auto md:bottom-28 md:left-1/2 md:-translate-x-1/2 md:flex-row'>
        {slides.map((item, index) => (
          <button
            key={item.src}
            type='button'
            aria-label={`Show ${item.caption}`}
            onClick={() => setSlide(index)}
            className='h-1.5 w-8 overflow-hidden rounded-full bg-white/20'
          >
            {index === slide && (
              <motion.span
                className='block h-full bg-white'
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
