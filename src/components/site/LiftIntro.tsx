'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SESSION_KEY = 'nishan-lift-intro-seen';
const FLOORS = ['G', '1', '2', '3', '4', '5'];
const LIFT_EASE = [0.65, 0, 0.35, 1] as const;

type Phase = 'travel' | 'arrive' | 'open' | 'done';

/**
 * First-visit intro: the car travels up a few floors, the hall lantern
 * lights, then the landing doors slide open onto the site.
 */
export default function LiftIntro() {
  const [phase, setPhase] = useState<Phase>('travel');
  const [floor, setFloor] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      // Storage can be unavailable (private mode); just play the intro.
    }
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (seen || reduce) {
      setPhase('done');
      return;
    }

    const timers: number[] = [];
    FLOORS.forEach((_, index) => {
      timers.push(window.setTimeout(() => setFloor(index), 160 * index));
    });
    const arriveAt = 160 * FLOORS.length + 120;
    timers.push(window.setTimeout(() => setPhase('arrive'), arriveAt));
    timers.push(window.setTimeout(() => setPhase('open'), arriveAt + 450));
    timers.push(
      window.setTimeout(() => {
        setPhase('done');
        try {
          window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // Ignore: the intro will simply replay next visit.
        }
      }, arriveAt + 1650),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = phase === 'done' ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  const opening = phase === 'open';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key='lift-intro'
          aria-hidden
          className='fixed inset-0 z-[120] overflow-hidden bg-(--color-ink)'
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* light spilling out of the car as the doors part */}
          <motion.div
            className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,236,210,0.95),rgba(255,190,150,0.25)_45%,transparent_70%)]'
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />

          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              className={`steel absolute inset-y-0 w-1/2 ${
                side === 'left'
                  ? 'left-0 shadow-[inset_-12px_0_24px_rgba(0,0,0,0.25)]'
                  : 'right-0 shadow-[inset_12px_0_24px_rgba(0,0,0,0.25)]'
              }`}
              animate={{
                x: opening ? (side === 'left' ? '-100%' : '100%') : '0%',
              }}
              transition={{ duration: 1.1, ease: LIFT_EASE }}
            >
              <div
                className={`absolute inset-y-0 w-px bg-black/30 ${
                  side === 'left' ? 'right-0' : 'left-0'
                }`}
              />
            </motion.div>
          ))}

          {/* hall lantern + floor display sitting across both doors */}
          <motion.div
            className='absolute inset-x-0 top-[18%] z-10 flex flex-col items-center gap-5'
            animate={{ opacity: opening ? 0 : 1, y: opening ? -30 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className='flex items-center gap-4 rounded-2xl bg-black/85 px-6 py-3 shadow-2xl ring-1 ring-white/10'>
              <motion.span
                className='text-2xl text-[#ff3b3b]'
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ▲
              </motion.span>
              <div className='relative h-14 w-12 overflow-hidden'>
                <AnimatePresence mode='popLayout' initial={false}>
                  <motion.span
                    key={FLOORS[floor]}
                    className='led absolute inset-0 flex items-center justify-center text-5xl'
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.14 }}
                  >
                    {FLOORS[floor]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <motion.div
              className='h-1.5 w-24 rounded-full'
              animate={{
                backgroundColor:
                  phase === 'travel' ? 'rgba(255,255,255,0.15)' : '#22c55e',
                boxShadow:
                  phase === 'travel'
                    ? '0 0 0 rgba(34,197,94,0)'
                    : '0 0 24px rgba(34,197,94,0.9)',
              }}
            />
          </motion.div>

          <motion.div
            className='absolute inset-x-0 bottom-[16%] z-10 flex flex-col items-center gap-3'
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className='rounded-xl bg-(--color-accent) px-5 py-3 shadow-[0_20px_60px_rgba(196,0,0,0.45)]'>
              <Image
                src='/images/site/logo-mark-white.png'
                alt=''
                width={140}
                height={59}
                priority
                className='h-auto w-28'
              />
            </div>
            <p className='font-display text-xs font-bold uppercase tracking-[0.5em] text-black/60'>
              Going up
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
