import { Clock, MapPin, Navigation } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import { breadcrumbGraph } from '@/lib/structured-data';

import GalleryImageViewer from '@/components/site/GalleryImageViewer';
import HallCallCta from '@/components/site/HallCallCta';
import JsonLd from '@/components/site/JsonLd';
import PageHero from '@/components/site/PageHero';
import { CountUp, DoorImage, Reveal } from '@/components/site/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import {
  appreciationLetters,
  companyInfo,
  galleryImages,
  metrics,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Nishan Lift Solutions — Jaipur lift installation, modernization and maintenance specialists led by Amit Sharma, open 24 hours with a 4.8 Google rating.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About Nishan Lift Solutions',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function AboutPage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      <JsonLd data={breadcrumbGraph([{ name: 'About', path: '/about' }])} />
      <SiteHeader />
      <PageHero
        eyebrow='About us'
        title='A Jaipur lift company built on trust.'
        accent='trust.'
        description={companyInfo.tagline}
        image='/images/site/pro/landing-marble.webp'
        imageAlt='Stainless steel lift landing set in marble by Nishan Lift Solutions'
      />

      <section
        data-floor='1'
        data-floor-name='Who we are'
        className='py-24 sm:py-36'
      >
        <div className='layout grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20'>
          <div>
            <SectionHeading
              eyebrow='Who we are'
              title='Craftsmanship that moves people safely.'
              accent='safely.'
            />
            <Reveal delay={0.15}>
              <p className='mt-8 leading-relaxed text-(--color-text-muted) sm:text-lg'>
                {companyInfo.description}
              </p>
              <p className='mt-5 leading-relaxed text-(--color-text-muted) sm:text-lg'>
                {companyInfo.commitment}
              </p>
            </Reveal>
          </div>
          <figure>
            <DoorImage
              src='/images/site/pro/founder.webp'
              alt={`${companyInfo.owner}, founder of ${companyInfo.name}`}
              className='aspect-[4/5] rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]'
              imageClassName='object-[center_20%]'
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
            <figcaption className='mt-4 text-sm'>
              <span className='font-semibold'>{companyInfo.owner}</span>
              <span className='text-(--color-text-muted)'>
                {' '}
                · Founder, {companyInfo.name}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        data-floor='2'
        data-floor-name='In numbers'
        className='border-y border-(--color-border) bg-(--color-surface) py-16'
      >
        <ul className='layout grid grid-cols-2 gap-10 lg:grid-cols-4'>
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} as='li' delay={index * 0.08}>
              <CountUp
                value={metric.value}
                decimals={metric.decimals}
                suffix={metric.suffix}
                className='text-4xl font-semibold tracking-tight sm:text-5xl'
              />
              <p className='mt-2 text-sm text-(--color-text-muted)'>
                {metric.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        data-floor='3'
        data-floor-name='Recognition'
        className='py-24 sm:py-36'
      >
        <div className='layout'>
          <SectionHeading
            eyebrow='Recognition'
            title='Trusted by businesses and architects.'
            accent='Trusted'
            description='Letters of appreciation from clients we have built for.'
          />
          <ul className='mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6'>
            {appreciationLetters.map((letter, index) => (
              <Reveal key={letter.from} as='li' delay={index * 0.1}>
                <figure>
                  <div className='relative aspect-[3/4] overflow-hidden rounded-2xl border border-(--color-border) bg-white'>
                    <Image
                      src={letter.image}
                      alt={`Letter of appreciation from ${letter.from}`}
                      fill
                      sizes='(max-width: 768px) 50vw, 360px'
                      className='object-cover object-top'
                    />
                  </div>
                  <figcaption className='mt-3 text-sm font-semibold'>
                    {letter.from}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        data-floor='4'
        data-floor-name='Visit us'
        className='bg-(--color-surface) py-24 sm:py-36'
      >
        <div className='layout grid gap-16 lg:grid-cols-2 lg:gap-20'>
          <div>
            <SectionHeading
              eyebrow='Visit or call'
              title='Open 24 hours, every day.'
              accent='24'
              description='You can contact us anytime with your query — or visit our office in Jaipur.'
            />
            <Reveal delay={0.15} className='mt-10 space-y-5 text-sm'>
              <p className='flex gap-3'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)' />
                {companyInfo.address}
              </p>
              <a
                href={companyInfo.directionsUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-full bg-(--color-ink) px-6 py-3 text-sm font-semibold text-white'
              >
                <Navigation className='h-4 w-4' />
                Get directions
              </a>
            </Reveal>
            <Reveal delay={0.25} className='mt-12'>
              <div className='flex items-center justify-between border-b border-(--color-border) pb-4'>
                <p className='font-semibold'>Business hours</p>
                <span className='flex items-center gap-2 text-sm font-medium text-green-700'>
                  <Clock className='h-4 w-4' />
                  Open now
                </span>
              </div>
              <ul className='mt-2'>
                {days.map((day) => (
                  <li
                    key={day}
                    className='flex justify-between border-b border-(--color-border) py-3 text-sm'
                  >
                    <span>{day}</span>
                    <span className='text-(--color-text-muted)'>24 hours</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <DoorImage
            src='/images/site/pro/shopfront.webp'
            alt='Nishan Lift Solutions office in Jaipur'
            className='aspect-[4/5] rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]'
            sizes='(max-width: 1024px) 100vw, 50vw'
          />
        </div>
      </section>

      <section
        data-floor='5'
        data-floor-name='Gallery'
        className='py-24 sm:py-36'
      >
        <div className='layout'>
          <SectionHeading
            eyebrow='Gallery'
            title='Recent installations.'
            accent='installations.'
          />
          <div className='mt-16'>
            <GalleryImageViewer images={galleryImages} />
          </div>
        </div>
      </section>

      <HallCallCta floor='6' />
      <SiteFooter />
    </main>
  );
}
