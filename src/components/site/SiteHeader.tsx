'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { companyInfo, quickLinks } from '@/constant/nishan-content';

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      {/* Main bar */}
      <div className='border-b border-(--color-border) bg-(--color-surface)/90 backdrop-blur-xl'>
        <div className='layout flex items-center justify-between gap-4 px-4 py-3'>
          {/* Logo */}
          <Link href='/' className='group flex items-center gap-2.5'>
            <Image
              src='/images/logo.png'
              alt={`${companyInfo.name} logo`}
              width={36}
              height={36}
              className='h-9 w-auto object-contain'
              priority
            />
            <div className='hidden sm:block'>
              <p className='text-sm font-bold uppercase leading-none tracking-widest text-(--color-text-primary)'>
                {companyInfo.name}
              </p>
            </div>
          </Link>

          {/* Right actions */}
          <div className='flex items-center gap-3'>
            <a
              href={`tel:${companyInfo.phone}`}
              className='hidden items-center gap-1.5 rounded-full border border-(--color-border) px-4 py-2 text-xs font-semibold text-(--color-text-muted) transition hover:border-(--color-accent)/40 hover:text-(--color-accent) md:flex'
            >
              <span className='relative flex h-1.5 w-1.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
                <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500' />
              </span>
              {companyInfo.phone}
            </a>
            <Link
              href='/contact'
              className='rounded-full bg-(--color-accent) px-5 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(158,0,0,0.25)] transition hover:bg-(--color-accent-strong) hover:shadow-[0_0_30px_rgba(158,0,0,0.4)]'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Nav strip */}
      <div className='border-b border-(--color-border) bg-(--color-surface)/80 backdrop-blur-xl'>
        <nav className='layout flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none]'>
          {quickLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all ${
                  active
                    ? 'bg-(--color-accent) text-white shadow-sm'
                    : 'text-(--color-text-muted) hover:bg-(--color-accent)/10 hover:text-(--color-accent)'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
