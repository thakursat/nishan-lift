'use client';

import { BadgeCheck, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { Reveal } from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

import { companyInfo, safetyAudit } from '@/constant/nishan-content';

/**
 * The free safety audit, told over a machine-room scene: scrolling turns the
 * traction sheave and lowers the counterweight.
 */
export default function Engineering() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const rotate = useTransform(smooth, [0, 1], [0, 540]);
  const counterweight = useTransform(smooth, [0, 1], ['-20%', '120%']);
  const imageY = useTransform(smooth, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      data-floor='4'
      data-floor-name='Safety audit'
      className='grain relative overflow-hidden bg-(--color-ink) py-20 text-white sm:py-28'
    >
      <div className='blueprint absolute inset-0 opacity-60' />

      {/* counterweight running down the side */}
      <div
        aria-hidden
        className='absolute inset-y-0 right-8 hidden w-10 sm:block'
      >
        <div className='cable absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2' />
        <motion.div
          className='absolute left-0 h-28 w-10 rounded-sm bg-zinc-700 ring-1 ring-white/10'
          style={{ top: counterweight }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='h-3.5 border-b border-black/40' />
          ))}
        </motion.div>
      </div>

      <div className='layout relative grid gap-12 lg:grid-cols-2 lg:items-center'>
        <div className='relative mx-auto w-full max-w-md lg:max-w-none'>
          <motion.svg
            aria-hidden
            viewBox='0 0 100 100'
            className='absolute -top-10 -left-10 h-40 w-40 opacity-90 sm:h-56 sm:w-56'
            style={{ rotate }}
          >
            <circle
              cx='50'
              cy='50'
              r='46'
              fill='none'
              stroke='#facc15'
              strokeWidth='6'
            />
            <circle
              cx='50'
              cy='50'
              r='38'
              fill='none'
              stroke='#a16207'
              strokeWidth='2'
              strokeDasharray='4 3'
            />
            <circle cx='50' cy='50' r='10' fill='#facc15' />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line
                key={angle}
                x1='50'
                y1='50'
                x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
                stroke='#facc15'
                strokeWidth='5'
                strokeLinecap='round'
              />
            ))}
          </motion.svg>
          <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10'>
            <motion.div className='absolute -inset-[10%]' style={{ y: imageY }}>
              <Image
                src='/images/site/machine.webp'
                alt='Traction machine and sheave installed by Nishan Lift Solutions'
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover'
              />
            </motion.div>
            <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-5'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50'>
                Posted {safetyAudit.date}
              </p>
              <p className='mt-1 text-sm font-semibold'>
                Machine room inspection · Jaipur
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            floor='4'
            tone='dark'
            eyebrow='Safety first'
            title={safetyAudit.title}
            accent='Free'
            description={safetyAudit.intro}
          />
          <ul className='mt-8 grid gap-3 sm:grid-cols-2'>
            {safetyAudit.checks.map((check, index) => (
              <Reveal key={check} as='li' delay={index * 0.08}>
                <div className='flex h-full items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10'>
                  <BadgeCheck className='mt-0.5 h-5 w-5 shrink-0 text-green-400' />
                  <span className='text-sm font-medium'>{check}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className='mt-6 flex flex-wrap gap-2'>
            {companyInfo.serviceAreas.map((area) => (
              <span
                key={area}
                className='flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80'
              >
                <MapPin className='h-3.5 w-3.5 text-(--color-accent)' />
                {area}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href='/contact'
              className='sheen mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-7 py-4 text-sm font-bold shadow-[0_0_40px_rgba(196,0,0,0.45)] transition hover:bg-(--color-accent-strong)'
            >
              Book your free audit
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
