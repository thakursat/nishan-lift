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
      className='relative bg-(--color-bg) py-24 sm:py-36'
    >
      <div className='layout'>
        <div className='relative overflow-hidden rounded-3xl bg-(--color-ink) px-6 py-16 text-white sm:px-16 sm:py-20'>
          <div className='relative grid items-center gap-12 md:grid-cols-[1fr_auto]'>
            <div>
              <Reveal>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/50'>
                  Lift service · Jaipur
                </p>
              </Reveal>
              <SplitHeading
                text='Your next step starts here.'
                accent='next'
                className='mt-5 text-4xl leading-[1.05] font-semibold sm:text-6xl'
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
