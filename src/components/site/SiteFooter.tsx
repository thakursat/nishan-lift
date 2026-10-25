import { Clock, Instagram, MapPin, Navigation, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Marquee from '@/components/site/Marquee';

import {
  companyInfo,
  elevatorTypes,
  quickLinks,
} from '@/constant/nishan-content';

export default function SiteFooter() {
  return (
    <footer className='relative overflow-hidden bg-(--color-ink) pt-14 pb-28 text-white md:pb-10'>
      <Marquee
        items={elevatorTypes}
        duration={40}
        className='font-display border-y border-white/10 py-4 text-2xl font-extrabold uppercase text-white/25'
      />

      <div className='layout mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]'>
        <div className='space-y-5'>
          <span className='inline-flex rounded-xl bg-(--color-accent) px-3 py-2.5'>
            <Image
              src='/images/site/logo-mark-white.png'
              alt={`${companyInfo.name} logo`}
              width={120}
              height={51}
              className='h-auto w-24'
            />
          </span>
          <p className='max-w-sm text-sm leading-relaxed text-white/60'>
            {companyInfo.description}
          </p>
          <a
            href={companyInfo.instagramUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white'
          >
            <Instagram className='h-4 w-4' />@{companyInfo.instagram}
          </a>
        </div>

        <div>
          <p className='text-xs font-bold uppercase tracking-[0.35em] text-white/40'>
            Floors
          </p>
          <ul className='mt-4 grid gap-2.5'>
            {quickLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='group flex items-center gap-3 text-sm text-white/70 transition hover:text-white'
                >
                  <span className='font-display flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px] transition group-hover:border-(--color-accent) group-hover:bg-(--color-accent)'>
                    {index === 0 ? 'G' : index}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='space-y-4 text-sm text-white/70'>
          <p className='text-xs font-bold uppercase tracking-[0.35em] text-white/40'>
            Reach us
          </p>
          <p className='flex gap-3'>
            <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)' />
            {companyInfo.shortAddress}
          </p>
          <a
            href={companyInfo.phoneHref}
            className='flex gap-3 transition hover:text-white'
          >
            <Phone className='mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)' />
            {companyInfo.phone}
          </a>
          <p className='flex gap-3'>
            <Clock className='mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)' />
            {companyInfo.hours}
          </p>
          <a
            href={companyInfo.directionsUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/50'
          >
            <Navigation className='h-3.5 w-3.5' />
            Get directions
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className='font-display text-outline pointer-events-none mt-14 text-center text-[19vw] leading-none font-extrabold uppercase select-none'
      >
        Nishan Lift
      </p>

      <div className='layout mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row'>
        <p>&copy;2026 {companyInfo.name}. All rights reserved.</p>
        <p>
          Developed by{' '}
          <a
            href='https://www.linkedin.com/in/thakursatyam9415'
            target='_blank'
            rel='noreferrer'
            className='font-semibold text-white/70 transition hover:text-white'
          >
            Satyam Singh
          </a>
        </p>
      </div>
    </footer>
  );
}
