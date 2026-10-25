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
  companyInfo,
  galleryImages,
  highlights,
  metrics,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet Nishan Lift Solutions — Jaipur lift installation, modernization and maintenance specialists, open 24 hours with a 4.8 Google rating.',
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
        eyebrow='Our story'
        title='About Nishan Lift Solutions'
        accent='Nishan'
        description={companyInfo.tagline}
        image='/images/site/shopfront.webp'
        imageAlt='Nishan Lift Solutions office in Jaipur'
      />

      <section
        data-floor='1'
        data-floor-name='Who we are'
        className='py-20 sm:py-28'
      >
        <div className='layout grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center'>
          <div>
            <SectionHeading
              floor='1'
              eyebrow='Who we are'
              title='Craftsmanship that moves people'
              accent='moves'
            />
            <Reveal delay={0.15}>
              <p className='mt-6 text-base leading-relaxed text-(--color-text-muted) sm:text-lg'>
                {companyInfo.description}
              </p>
              <p className='mt-4 text-base leading-relaxed text-(--color-text-muted) sm:text-lg'>
                {companyInfo.commitment}
              </p>
            </Reveal>
            <ul className='mt-8 flex flex-wrap gap-2'>
              {highlights.map((highlight, index) => (
                <Reveal key={highlight} as='li' delay={index * 0.05}>
                  <span className='inline-flex rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-semibold'>
                    {highlight}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className='grid grid-cols-5 gap-3'>
            <DoorImage
              src='/images/site/owner.webp'
              alt={`${companyInfo.owner}, founder of ${companyInfo.name}`}
              className='col-span-3 aspect-[3/4] rounded-[2rem]'
              sizes='(max-width: 1024px) 60vw, 30vw'
            />
            <div className='col-span-2 flex flex-col gap-3'>
              <DoorImage
                src='/images/site/owner-award.webp'
                alt={`${companyInfo.owner} receiving an industry award`}
                className='aspect-square rounded-[1.5rem]'
                sizes='(max-width: 1024px) 40vw, 20vw'
              />
              <Reveal
                from='right'
                className='steel-dark flex flex-1 flex-col justify-end rounded-[1.5rem] p-4 text-white'
              >
                <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50'>
                  Founder
                </p>
                <p className='font-display mt-1 text-2xl leading-none font-extrabold uppercase'>
                  {companyInfo.owner}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        data-floor='2'
        data-floor-name='In numbers'
        className='bg-(--color-ink) py-16 text-white'
      >
        <div className='layout grid grid-cols-2 gap-6 lg:grid-cols-4'>
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08}>
              <div className='rounded-3xl bg-black p-5 ring-1 ring-white/10'>
                <CountUp
                  value={metric.value}
                  decimals={metric.decimals}
                  suffix={metric.suffix}
                  className='led text-5xl'
                />
                <p className='mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50'>
                  {metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        data-floor='3'
        data-floor-name='Visit us'
        className='py-20 sm:py-28'
      >
        <div className='layout grid gap-10 lg:grid-cols-2 lg:items-start'>
          <div>
            <SectionHeading
              floor='3'
              eyebrow='Plan your visit or enquiry'
              title='Know when to reach us'
              accent='reach'
              description='We’d love to hear from you. Here’s when you can reach us — and you can contact us anytime during the day with your query.'
            />
            <Reveal delay={0.2} className='mt-8 space-y-3 text-sm'>
              <p className='flex gap-3'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-(--color-accent)' />
                {companyInfo.address}
              </p>
              <a
                href={companyInfo.directionsUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-5 py-2.5 text-xs font-bold text-white'
              >
                <Navigation className='h-3.5 w-3.5' />
                Get directions
              </a>
            </Reveal>
          </div>

          {/* Business hours as a lobby directory board */}
          <Reveal from='right'>
            <div className='steel-dark rounded-[2rem] p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-8'>
              <div className='flex items-center justify-between border-b border-white/10 pb-4'>
                <p className='font-display text-xl font-extrabold uppercase tracking-wide'>
                  Business hours
                </p>
                <span className='flex items-center gap-2 rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-400'>
                  <Clock className='h-3.5 w-3.5' />
                  Open now
                </span>
              </div>
              <ul className='mt-4 grid gap-1'>
                {days.map((day) => (
                  <li
                    key={day}
                    className='flex items-baseline gap-3 py-1.5 text-sm'
                  >
                    <span className='text-white/80'>{day}</span>
                    <span className='flex-1 border-b border-dotted border-white/15' />
                    <span className='led text-base'>24 HRS</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        data-floor='4'
        data-floor-name='Gallery'
        className='bg-(--color-surface) py-20 sm:py-28'
      >
        <div className='layout'>
          <SectionHeading
            floor='4'
            eyebrow='Our photo gallery'
            title='Work & installations'
            accent='installations'
          />
          <Reveal className='relative mt-10 aspect-[21/9] overflow-hidden rounded-[2rem]'>
            <Image
              src='/images/site/capsule.webp'
              alt='Capsule lift with golden glass panels'
              fill
              sizes='100vw'
              className='object-cover'
            />
          </Reveal>
          <div className='mt-6'>
            <GalleryImageViewer images={galleryImages} initialCount={16} />
          </div>
        </div>
      </section>

      <HallCallCta floor='5' />
      <SiteFooter />
    </main>
  );
}
