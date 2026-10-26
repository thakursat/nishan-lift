'use client';

import { ArrowRight, Phone, ShieldCheck, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { SplitHeading } from '@/components/site/Reveal';

import { companyInfo, rating } from '@/constant/nishan-content';

const LIFT_EASE = [0.65, 0, 0.35, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      data-floor='G'
      data-floor-name='Lobby'
      className='relative isolate flex min-h-svh items-end overflow-hidden bg-(--color-ink) text-white'
    >
      <motion.div className='absolute inset-0 -z-10' style={{ y: imageY }}>
        <motion.div
          className='absolute inset-0'
          initial={{ clipPath: 'inset(0 50% 0 50%)', scale: 1.08 }}
          animate={{ clipPath: 'inset(0 0% 0 0%)', scale: 1 }}
          transition={{ duration: 1.6, ease: LIFT_EASE }}
        >
          <Image
            src='/images/site/pro/lobby-granite.webp'
            alt='Lift lobby with stainless steel landing doors'
            fill
            priority
            sizes='100vw'
            className='object-cover object-[30%_center]'
          />
        </motion.div>
        <div className='absolute inset-0 bg-linear-to-t from-(--color-ink) via-black/55 to-black/40' />
        <div className='absolute inset-0 bg-linear-to-r from-black/60 to-transparent' />
      </motion.div>

      <motion.div
        className='layout w-full pt-40 pb-16 sm:pb-24'
        style={{ opacity: fade }}
      >
        <motion.p
          className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ShieldCheck className='h-4 w-4 text-(--color-highlight)' />
          Lift installation · AMC · 24×7 repair
        </motion.p>

        <SplitHeading
          as='h1'
          text='Safe, reliable lifts for every building in Jaipur.'
          accent='Safe,'
          delay={0.45}
          className='mt-6 max-w-3xl text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl'
        />

        <motion.p
          className='mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {companyInfo.name} installs, modernizes and maintains passenger, home,
          hospital and goods lifts — with engineers on call around the clock.
        </motion.p>

        <motion.div
          className='mt-10 flex flex-col gap-3 sm:flex-row'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          <Link
            href='/contact'
            className='group flex items-center justify-center gap-2 rounded-full bg-(--color-accent) px-7 py-4 text-sm font-semibold transition hover:bg-(--color-accent-strong)'
          >
            Book a free safety audit
            <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />
          </Link>
          <a
            href={companyInfo.phoneHref}
            className='flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold transition hover:bg-white/10'
          >
            <Phone className='h-4 w-4' />
            24×7 helpline {companyInfo.phone}
          </a>
        </motion.div>

        <motion.ul
          className='mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/70'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <li className='flex items-center gap-2'>
            <Star className='h-4 w-4 fill-amber-400 text-amber-400' />
            {rating.score} on Google · {rating.count}+ reviews
          </li>
          <li className='flex items-center gap-2'>
            <span className='h-2 w-2 rounded-full bg-green-400' />
            Open 24 hours, 7 days
          </li>
          <li>{companyInfo.serviceAreas.join(' · ')}</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}
