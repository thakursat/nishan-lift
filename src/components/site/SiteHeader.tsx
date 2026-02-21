import Image from 'next/image';
import Link from 'next/link';

import { companyInfo, quickLinks } from '@/constant/nishan-content';

export default function SiteHeader() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]/95 backdrop-blur'>
      <div className='layout flex items-center justify-between gap-3 px-4 py-3'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/logo.png'
            alt={`${companyInfo.name} logo`}
            width={36}
            height={36}
            className='h-9 w-auto'
            priority
          />
          <span className='text-sm font-semibold tracking-[0.08em] text-[color:var(--color-accent)]'>
            {companyInfo.name}
          </span>
        </Link>

        <Link
          href='/contact'
          className='rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-xs font-semibold text-black transition hover:opacity-90'
        >
          Contact
        </Link>
      </div>

      <nav className='border-t border-[color:var(--color-border)]'>
        <div className='layout flex gap-2 overflow-x-auto px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-text-muted)]'>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-[color:var(--color-accent)]/10 hover:text-[color:var(--color-accent)]'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
