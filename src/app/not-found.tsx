import { Metadata } from 'next';
import Link from 'next/link';
import * as React from 'react';

import SiteHeader from '@/components/site/SiteHeader';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main className='grain relative flex min-h-svh flex-col bg-(--color-ink) text-white'>
      <SiteHeader solid />
      <div className='blueprint absolute inset-0 opacity-50' />
      <section className='layout relative flex flex-1 flex-col items-center justify-center py-32 text-center'>
        <div className='flex items-center gap-4 rounded-2xl bg-black px-6 py-3 ring-1 ring-white/10'>
          <span className='led text-2xl'>▼</span>
          <span className='led text-7xl sm:text-8xl'>404</span>
        </div>
        <h1 className='font-display mt-8 text-5xl leading-none font-extrabold uppercase sm:text-7xl'>
          This floor doesn&apos;t exist
        </h1>
        <p className='mt-4 max-w-md text-white/60'>
          The page you pressed for isn&apos;t in our building. Let&apos;s take
          you back down to the lobby.
        </p>
        <Link
          href='/'
          className='steel mt-10 flex h-20 w-20 items-center justify-center rounded-full text-black/75 shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_8px_18px_rgba(0,0,0,0.5)]'
          aria-label='Back to home'
        >
          <span className='font-display flex h-14 w-14 items-center justify-center rounded-full text-2xl font-extrabold ring-[3px] ring-[#ff3b3b] shadow-[0_0_24px_rgba(255,40,40,0.9)]'>
            G
          </span>
        </Link>
        <p className='mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40'>
          Back to lobby
        </p>
      </section>
    </main>
  );
}
