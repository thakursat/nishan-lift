'use client';

import { useEffect, useState } from 'react';

export default function AppLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className='fixed inset-0 z-[120] flex items-center justify-center bg-[color:var(--color-bg)]'>
      <div className='flex flex-col items-center gap-4 text-center'>
        <div className='relative h-16 w-10 overflow-hidden rounded-full border-2 border-[color:var(--color-accent)]'>
          <div className='absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] animate-[float_1.1s_ease-in-out_infinite]' />
          <div className='absolute inset-x-2 bottom-2 h-1 rounded-full bg-[color:var(--color-accent)]/30' />
        </div>
        <p className='text-xs font-semibold uppercase tracking-[0.38em] text-[color:var(--color-accent)]'>
          Nishan Lift Solutions
        </p>
        <p className='animate-pulse text-sm text-[color:var(--color-text-muted)]'>
          Preparing your elevator experience...
        </p>
      </div>
    </div>
  );
}
