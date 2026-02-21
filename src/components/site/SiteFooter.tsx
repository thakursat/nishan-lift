import Link from 'next/link';

import { companyInfo, quickLinks } from '@/constant/nishan-content';

export default function SiteFooter() {
  return (
    <footer className='border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]/85 py-10'>
      <div className='layout grid gap-8 px-4 md:grid-cols-3'>
        <article className='space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            {companyInfo.tagline}
          </p>
          <p className='text-sm text-[color:var(--color-text-muted)]'>
            {companyInfo.description}
          </p>
        </article>

        <article className='space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Quick links
          </p>
          <div className='grid gap-2 text-sm text-[color:var(--color-text-muted)]'>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='transition hover:text-[color:var(--color-accent)]'
              >
                {link.label}
              </Link>
            ))}
          </div>
        </article>

        <article className='space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Contact us
          </p>
          <p className='text-sm text-[color:var(--color-text-muted)]'>
            {companyInfo.address}
          </p>
          <a
            className='inline-flex rounded-full border border-[color:var(--color-accent)] px-4 py-2 text-xs font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)] hover:text-black'
            href={companyInfo.mapUrl}
            target='_blank'
            rel='noreferrer'
          >
            Open location
          </a>
        </article>
      </div>
      <p className='mt-8 text-center text-xs text-[color:var(--color-text-muted)]'>
        Copyrights ©2026 {companyInfo.name}.
      </p>
      <p className='mt-2 text-center text-xs text-[color:var(--color-text-muted)]'>
        Developed by{' '}
        <a
          href='https://www.linkedin.com/in/thakursatyam9415'
          target='_blank'
          rel='noreferrer'
          className='font-semibold text-[color:var(--color-accent)] transition hover:underline'
        >
          Satyam Singh
        </a>
      </p>
    </footer>
  );
}
