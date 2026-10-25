'use client';

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const SHAFT_HEIGHT = 440;
const MACHINE_ROOM = 64;
const CAR_HEIGHT = 84;
const COUNTERWEIGHT_HEIGHT = 70;
const FLOORS = ['3', '2', '1', 'G'];
const TRAVEL = SHAFT_HEIGHT - MACHINE_ROOM - CAR_HEIGHT - 8;
/** Car top position (px from machine room) for each landing, top floor first. */
const STOPS = FLOORS.map((_, index) => (index / (FLOORS.length - 1)) * TRAVEL);

// G → 2 → 3 → 1 → G, dwelling at every landing.
const ROUTE = [3, 3, 1, 1, 0, 0, 2, 2, 3];

type LiftShaftProps = {
  className?: string;
  /** Dark variant for use on ink sections. */
  tone?: 'dark' | 'light';
};

/**
 * A working traction lift in miniature: the sheave turns, the cables pay out,
 * the counterweight runs opposite to the car and the car doors open at every
 * stop. Every part is derived from a single motion value so they stay in sync.
 */
export default function LiftShaft({
  className,
  tone = 'dark',
}: LiftShaftProps) {
  const reduce = useReducedMotion();
  const carY = useMotionValue(STOPS[3]);
  const [floor, setFloor] = useState('G');
  const [doorsOpen, setDoorsOpen] = useState(true);

  const cableHeight = useTransform(carY, (y) => y);
  const counterweightY = useTransform(
    carY,
    (y) => TRAVEL - y + CAR_HEIGHT - COUNTERWEIGHT_HEIGHT,
  );
  const counterweightCable = useTransform(counterweightY, (y) => y);
  const sheaveRotate = useTransform(carY, (y) => y * 1.6);

  useMotionValueEvent(carY, 'change', (y) => {
    const nearest = STOPS.reduce(
      (best, stop, index) =>
        Math.abs(stop - y) < Math.abs(STOPS[best] - y) ? index : best,
      0,
    );
    setFloor(FLOORS[nearest]);
    setDoorsOpen(Math.abs(carY.getVelocity()) < 4);
  });

  useEffect(() => {
    if (reduce) return;
    const controls = animate(
      carY,
      ROUTE.map((index) => STOPS[index]),
      {
        duration: 14,
        ease: 'easeInOut',
        times: [0, 0.1, 0.25, 0.35, 0.47, 0.57, 0.72, 0.82, 1],
        repeat: Infinity,
      },
    );
    return () => controls.stop();
  }, [carY, reduce]);

  const rail = tone === 'dark' ? 'bg-white/15' : 'bg-black/15';
  const label = tone === 'dark' ? 'text-white/40' : 'text-black/40';

  return (
    <div
      aria-hidden
      className={cn('relative select-none', className)}
      style={{ width: 230, height: SHAFT_HEIGHT }}
    >
      {/* machine room */}
      <div
        className='steel-dark absolute inset-x-0 top-0 flex items-center justify-center rounded-t-2xl ring-1 ring-white/10'
        style={{ height: MACHINE_ROOM }}
      >
        <motion.svg
          viewBox='0 0 60 60'
          className='absolute h-14 w-14'
          style={{ rotate: sheaveRotate, left: 44 }}
        >
          <circle
            cx='30'
            cy='30'
            r='27'
            fill='#facc15'
            stroke='#a16207'
            strokeWidth='3'
          />
          <circle cx='30' cy='30' r='8' fill='#3f3f46' />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line
              key={angle}
              x1='30'
              y1='30'
              x2={30 + 22 * Math.cos((angle * Math.PI) / 180)}
              y2={30 + 22 * Math.sin((angle * Math.PI) / 180)}
              stroke='#a16207'
              strokeWidth='4'
              strokeLinecap='round'
            />
          ))}
        </motion.svg>
        <div className='absolute right-6 flex h-9 w-14 items-center justify-center rounded-md bg-zinc-700 ring-1 ring-white/10'>
          <span className='h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]' />
        </div>
      </div>

      {/* shaft */}
      <div
        className='absolute inset-x-0 bottom-0 overflow-hidden rounded-b-2xl border-x border-b border-white/10 bg-linear-to-b from-white/[0.04] to-white/[0.08]'
        style={{ top: MACHINE_ROOM }}
      >
        {/* guide rails */}
        <div className={cn('absolute inset-y-0 left-[96px] w-1', rail)} />
        <div className={cn('absolute inset-y-0 left-[204px] w-1', rail)} />

        {/* landings */}
        {STOPS.map((stop, index) => (
          <div
            key={FLOORS[index]}
            className='absolute inset-x-0 flex items-center'
            style={{ top: stop + CAR_HEIGHT - 8 }}
          >
            <span
              className={cn('font-display w-6 pl-2 text-xs font-bold', label)}
            >
              {FLOORS[index]}
            </span>
            <span className={cn('h-px flex-1', rail)} />
          </div>
        ))}

        {/* car cables */}
        <motion.div
          className='cable absolute left-[147px] w-[3px] -translate-x-1/2'
          style={{ top: 0, height: cableHeight }}
        />
        <motion.div
          className='cable absolute left-[155px] w-[3px] -translate-x-1/2'
          style={{ top: 0, height: cableHeight }}
        />

        {/* counterweight */}
        <motion.div
          className='cable absolute left-[58px] w-[3px]'
          style={{ top: 0, height: counterweightCable }}
        />
        <motion.div
          className='absolute left-[40px] w-10 rounded-sm bg-zinc-600 ring-1 ring-black/40'
          style={{ y: counterweightY, height: COUNTERWEIGHT_HEIGHT }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='h-[11px] border-b border-black/30' />
          ))}
        </motion.div>

        {/* car */}
        <motion.div
          className='absolute left-[104px] w-24'
          style={{ y: carY, height: CAR_HEIGHT }}
        >
          <div className='steel relative h-full overflow-hidden rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-black/30'>
            <div className='absolute inset-x-0 top-0 flex h-4 items-center justify-center bg-black'>
              <span className='led text-[11px] leading-none'>{floor}</span>
            </div>
            <div className='absolute inset-x-1.5 top-5 bottom-1.5 overflow-hidden rounded-sm bg-[radial-gradient(ellipse_at_top,#fff7e6,#f2c48d)]'>
              <motion.div
                className='steel absolute inset-y-0 left-0 w-1/2 border-r border-black/25'
                animate={{ x: doorsOpen ? '-85%' : '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <motion.div
                className='steel absolute inset-y-0 right-0 w-1/2 border-l border-white/40'
                animate={{ x: doorsOpen ? '85%' : '0%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* pit buffer */}
        <div className='absolute bottom-1 left-[140px] h-2 w-6 rounded-sm bg-yellow-400/70' />
      </div>
    </div>
  );
}
