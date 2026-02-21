'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo } from '@/constant/nishan-content';

const statusMessages = {
  idle: '',
  submitting: 'Sending your request...',
  success: "Thanks! We'll reach out within two business days.",
  error: 'Unable to submit right now. Please try again later.',
} as const;

type FormStatus = keyof typeof statusMessages;

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString().trim() ?? '',
      company: formData.get('company')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      phone: formData.get('phone')?.toString().trim() ?? '',
      message: formData.get('message')?.toString().trim() ?? '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      event.currentTarget.reset();
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='layout px-4 pb-10 pt-32'>
        <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
          Contact Us
        </p>
        <h1 className='mt-2 text-3xl font-semibold sm:text-4xl'>Contact Us</h1>
      </section>

      <section className='layout grid gap-8 px-4 pb-12 lg:grid-cols-[1fr_1.1fr]'>
        <article className='glass-panel animate-fade-up rounded-3xl p-6'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Office Address
          </p>
          <p className='mt-3 text-sm text-[color:var(--color-text-muted)]'>
            {companyInfo.address}
          </p>

          <div className='mt-6 grid gap-3 text-sm'>
            <a
              href={companyInfo.mapUrl}
              target='_blank'
              rel='noreferrer'
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              Open on Google Maps
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              {companyInfo.email}
            </a>
            <a
              href={`tel:${companyInfo.phone}`}
              className='rounded-full border border-[color:var(--color-border)] px-4 py-2 text-[color:var(--color-text-muted)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
            >
              {companyInfo.phone}
            </a>
          </div>

          <div className='mt-6 rounded-2xl border border-[color:var(--color-border)] p-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
              Quick links
            </p>
            <div className='mt-3 flex flex-wrap gap-2'>
              {[
                { href: '/', label: 'Home' },
                { href: '/products-services', label: 'Products & Services' },
                { href: '/about', label: 'About' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='rounded-full bg-[color:var(--color-accent)]/10 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-accent)]'
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <form
          onSubmit={handleSubmit}
          className='animate-zoom space-y-6 rounded-[32px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/80 p-8 shadow-[0_40px_60px_rgba(14,14,19,0.15)]'
        >
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]'>
            Get in touch
          </p>
          <div className='grid gap-4 sm:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold'>
              <span>Name</span>
              <input
                name='name'
                required
                placeholder='Your name'
                className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold'>
              <span>Company</span>
              <input
                name='company'
                placeholder='Company'
                className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
              />
            </label>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <label className='flex flex-col gap-2 text-sm font-semibold'>
              <span>Email</span>
              <input
                type='email'
                name='email'
                required
                placeholder='you@company.com'
                className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-semibold'>
              <span>Phone</span>
              <input
                name='phone'
                placeholder='+91 XXXXX XXXXX'
                className='rounded-xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
              />
            </label>
          </div>

          <label className='flex flex-col gap-2 text-sm font-semibold'>
            <span>Message</span>
            <textarea
              name='message'
              required
              rows={5}
              placeholder='Tell us about your lift requirement'
              className='h-36 rounded-2xl border border-[color:var(--color-border)] bg-white/70 px-4 py-3 text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/30'
            />
          </label>

          <div className='space-y-2'>
            <button
              type='submit'
              disabled={status === 'submitting'}
              className='w-full rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[color:var(--color-accent-strong)] disabled:opacity-70'
            >
              {status === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
            <p
              className='text-center text-xs font-semibold text-[color:var(--color-text-muted)]'
              aria-live='polite'
            >
              {statusMessages[status]}
            </p>
          </div>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
