'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Reveal, SplitHeading } from '@/components/site/Reveal';

import { companyInfo } from '@/constant/nishan-content';

/** Closing call to action styled as a landing call station. */
export default function HallCallCta({ floor = '7' }: { floor?: string }) {
  const router = useRouter();
  const [called, setCalled] = useState<'up' | 'down' | null>(null);

  const press = (direction: 'up' | 'down') => {
    setCalled(direction);
    window.setTimeout(() => {
      if (direction === 'up') router.push('/contact');
      else window.location.href = companyInfo.phoneHref;
      setCalled(null);
    }, 700);
  };

  return (
    <section
      data-floor={floor}
      data-floor-name='Get started'
      className='relative overflow-hidden bg-(--color-bg) py-20 sm:py-28'
    >
      <div className='layout'>
        <div className='steel-dark grain relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-white ring-1 ring-white/10 sm:px-14'>
          <div className='blueprint absolute inset-0 opacity-50' />
          <div className='relative grid items-center gap-12 md:grid-cols-[1fr_auto]'>
            <div>
              <Reveal>
                <p className='text-xs font-bold uppercase tracking-[0.35em] text-white/50'>
                  Lift service · Jaipur
                </p>
              </Reveal>
              <SplitHeading
                text='Your next step starts here.'
                accent='next'
                className='font-display mt-4 text-5xl leading-[0.92] font-extrabold uppercase sm:text-7xl'
              />
              <Reveal delay={0.2}>
                <p className='mt-5 max-w-md text-white/65'>
                  Tell {companyInfo.name} what you’re looking for — options,
                  pricing, availability or a breakdown call. We’re here around
                  the clock.
                </p>
              </Reveal>
              <Reveal delay={0.3} className='mt-8 flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90'
                >
                  Contact us
                </Link>
                <a
                  href={companyInfo.whatsappHref}
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-full border border-white/20 px-6 py-3 text-sm font-bold transition hover:bg-white/10'
                >
                  WhatsApp
                </a>
              </Reveal>
            </div>

            <Reveal from='right' className='mx-auto'>
              <div className='steel relative flex w-44 flex-col items-center gap-5 rounded-3xl px-6 py-7 shadow-[inset_0_2px_6px_rgba(255,255,255,0.7),0_30px_60px_rgba(0,0,0,0.5)]'>
                <div className='flex w-full items-center justify-center rounded-xl bg-black py-2'>
                  <span className='led text-3xl'>
                    {called === 'up' ? '▲' : called === 'down' ? '▼' : 'G'}
                  </span>
                </div>
                {(['up', 'down'] as const).map((direction) => (
                  <motion.button
                    key={direction}
                    type='button'
                    whileTap={{ scale: 0.92 }}
                    onClick={() => press(direction)}
                    aria-label={
                      direction === 'up'
                        ? 'Go to contact page'
                        : `Call ${companyInfo.phone}`
                    }
                    className='steel relative flex h-20 w-20 items-center justify-center rounded-full text-black/70 shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_8px_18px_rgba(0,0,0,0.35)]'
                  >
                    <span
                      className={cn(
                        'absolute inset-2 rounded-full ring-[3px] transition duration-300',
                        called === direction
                          ? 'ring-[#ff3b3b] shadow-[0_0_28px_rgba(255,40,40,1)]'
                          : 'ring-black/10',
                      )}
                    />
                    {direction === 'up' ? (
                      <ChevronUp className='h-8 w-8' />
                    ) : (
                      <ChevronDown className='h-8 w-8' />
                    )}
                  </motion.button>
                ))}
                <p className='text-center text-[10px] font-bold uppercase leading-tight tracking-[0.2em] text-black/50'>
                  ▲ Enquire
                  <br />▼ Call now
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
