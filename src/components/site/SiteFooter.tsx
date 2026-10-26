import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { companyInfo, quickLinks } from '@/constant/nishan-content';

export default function SiteFooter() {
  return (
    <footer className='bg-(--color-ink) pt-20 pb-32 text-white md:pb-12'>
      <div className='layout grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]'>
        <div className='space-y-5'>
          <span className='inline-flex rounded-lg bg-(--color-accent) px-3 py-2'>
            <Image
              src='/images/site/logo-mark-white.png'
              alt={`${companyInfo.name} logo`}
              width={120}
              height={51}
              className='h-auto w-20'
            />
          </span>
          <p className='max-w-sm text-sm leading-relaxed text-white/55'>
            {companyInfo.tagline}. Lift installation, modernization, AMC and
            24×7 emergency repair across {companyInfo.serviceAreas.join(', ')}.
          </p>
          <a
            href={companyInfo.instagramUrl}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white'
          >
            <Instagram className='h-4 w-4' />@{companyInfo.instagram}
          </a>
        </div>

        <nav aria-label='Footer'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/40'>
            Company
          </p>
          <ul className='mt-5 grid gap-3 text-sm'>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-white/70 transition hover:text-white'
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='space-y-4 text-sm text-white/70'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/40'>
            Contact
          </p>
          <a
            href={companyInfo.phoneHref}
            className='flex gap-3 text-lg font-semibold text-white transition hover:text-white/80'
          >
            <Phone className='mt-1 h-4 w-4 shrink-0' />
            {companyInfo.phone}
          </a>
          <p className='flex gap-3'>
            <Clock className='mt-0.5 h-4 w-4 shrink-0' />
            {companyInfo.hours}
          </p>
          <a
            href={companyInfo.directionsUrl}
            target='_blank'
            rel='noreferrer'
            className='flex gap-3 transition hover:text-white'
          >
            <MapPin className='mt-0.5 h-4 w-4 shrink-0' />
            {companyInfo.shortAddress}
          </a>
        </div>
      </div>

      <div className='layout mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:justify-between'>
        <p>&copy;2026 {companyInfo.name}. All rights reserved.</p>
        <p>
          Developed by{' '}
          <a
            href='https://www.linkedin.com/in/thakursatyam9415'
            target='_blank'
            rel='noreferrer'
            className='text-white/60 transition hover:text-white'
          >
            Satyam Singh
          </a>
        </p>
      </div>
      <p className='layout mt-4 text-[11px] leading-relaxed text-white/30'>
        Lobby and car interior backdrops: Hirho, N509FZ and Edward Orde via
        Wikimedia Commons, CC BY-SA 4.0, colour-graded. All project photos are
        Nishan Lift Solutions installations.
      </p>
    </footer>
  );
}
