'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

import LiftShaft from '@/components/site/LiftShaft';
import { Reveal } from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';

import { safetySystems } from '@/constant/nishan-content';

type SafetySystemsProps = {
  floor: string;
};

/** A working lift beside the safety systems that protect its passengers. */
export default function SafetySystems({ floor }: SafetySystemsProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % safetySystems.length),
      3500,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      data-floor={floor}
      data-floor-name='Safety systems'
      className='bg-(--color-ink) py-24 text-white sm:py-36'
    >
      <div className='layout'>
        <SectionHeading
          tone='dark'
          eyebrow='How a lift keeps you safe'
          title='Six safety systems behind every smooth ride.'
          accent='safety'
          description='A modern lift never relies on a single part. Here is what each system does — and why regular maintenance keeps them ready.'
        />

        <div className='mt-16 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-20'>
          <Reveal className='mx-auto rounded-3xl bg-white/[0.03] p-6 ring-1 ring-white/10'>
            <LiftShaft />
          </Reveal>

          <ol
            className='grid gap-2 sm:grid-cols-2'
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {safetySystems.map((system, index) => (
              <li key={system.name}>
                <button
                  type='button'
                  onClick={() => {
                    setActive(index);
                    setPaused(true);
                  }}
                  aria-pressed={active === index}
                  className={cn(
                    'relative h-full w-full overflow-hidden rounded-2xl p-5 text-left transition',
                    active === index
                      ? 'bg-white/[0.07]'
                      : 'hover:bg-white/[0.04]',
                  )}
                >
                  {active === index && (
                    <motion.span
                      layoutId='safety-active'
                      className='absolute inset-y-4 left-0 w-0.5 rounded-full bg-(--color-highlight)'
                    />
                  )}
                  <span className='text-xs font-semibold text-white/40'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='mt-2 block font-semibold'>
                    {system.name}
                  </span>
                  <span className='mt-2 block text-sm leading-relaxed text-white/60'>
                    {system.description}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
