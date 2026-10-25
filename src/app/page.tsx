import { ArrowUpRight, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { faqGraph } from '@/lib/structured-data';

import BeforeAfter from '@/components/site/BeforeAfter';
import Engineering from '@/components/site/Engineering';
import FaqList from '@/components/site/FaqList';
import GalleryImageViewer from '@/components/site/GalleryImageViewer';
import HallCallCta from '@/components/site/HallCallCta';
import Hero from '@/components/site/Hero';
import InstaReelsCarousel from '@/components/site/InstaReelsCarousel';
import JsonLd from '@/components/site/JsonLd';
import Marquee from '@/components/site/Marquee';
import ProductRail from '@/components/site/ProductRail';
import { Reveal } from '@/components/site/Reveal';
import ReviewsWall from '@/components/site/ReviewsWall';
import SectionHeading from '@/components/site/SectionHeading';
import ServiceStack from '@/components/site/ServiceStack';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import {
  appreciationLetters,
  companyInfo,
  elevatorTypes,
  faqs,
  featuredServices,
  galleryImages,
  highlights,
  instaReels,
  products,
  rating,
  reviews,
  services,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: {
    absolute:
      'Nishan Lift Solutions | Lift Installation, AMC & Modernization in Jaipur',
  },
  description:
    'Nishan Lift Solutions — premium lift installation, modernization, AMC and 24×7 emergency repair across Jaipur, Ajmer, Sikar and Jhunjhunu. Rated 4.8 on Google.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Nishan Lift Solutions | Lift & Elevator Company in Jaipur',
    description:
      'Lift installation, modernization, AMC and 24×7 emergency repair across Jaipur, Ajmer, Sikar and Jhunjhunu.',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

export default function HomePage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      <SiteHeader />
      <Hero />

      {/* What we do */}
      <section
        data-floor='1'
        data-floor-name='Services'
        className='relative py-20 sm:py-28'
      >
        <Marquee
          items={services}
          className='font-display mb-16 -rotate-2 bg-(--color-accent) py-4 text-2xl font-extrabold uppercase text-white shadow-xl sm:text-3xl'
        />
        <div className='layout'>
          <SectionHeading
            floor='1'
            eyebrow='What we do'
            title='Services from the best lift service in Jaipur'
            accent='Jaipur'
            description={`${companyInfo.description}`}
          />
          <div className='mt-12'>
            <ServiceStack services={featuredServices} />
          </div>

          <div className='mt-16'>
            <Reveal>
              <p className='text-xs font-bold uppercase tracking-[0.35em] text-(--color-text-muted)'>
                Elevators we build
              </p>
            </Reveal>
            <ul className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {elevatorTypes.map((type, index) => (
                <Reveal key={type} as='li' delay={(index % 4) * 0.06}>
                  <div className='group flex h-full items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-surface) p-3 transition hover:-translate-y-1 hover:border-(--color-accent)/40 hover:shadow-lg'>
                    <span className='steel font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-black/70 shadow-[inset_0_2px_3px_rgba(255,255,255,0.7),0_3px_8px_rgba(0,0,0,0.2)]'>
                      <span className='flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-black/10 transition group-hover:ring-[#ff3b3b] group-hover:shadow-[0_0_14px_rgba(255,40,40,0.8)]'>
                        {index + 1}
                      </span>
                    </span>
                    <span className='text-sm leading-tight font-semibold'>
                      {type}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        data-floor='2'
        data-floor-name='Products'
        className='relative bg-(--color-surface) py-20 sm:py-28'
      >
        <div className='layout'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
            <SectionHeading
              floor='2'
              eyebrow='Cabins & doors'
              title='Products crafted in steel & glass'
              accent='steel'
              description='Golden, mirror and brushed finishes for cabins and landing doors — swipe through the range.'
            />
            <Link
              href='/products-services?tab=products'
              className='group flex shrink-0 items-center gap-2 text-sm font-bold text-(--color-accent)'
            >
              View all products
              <ArrowUpRight className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </Link>
          </div>
          <div className='mt-10'>
            <ProductRail products={products} />
          </div>
        </div>
      </section>

      {/* Modernization */}
      <section
        data-floor='3'
        data-floor-name='Modernization'
        className='relative py-20 sm:py-28'
      >
        <div className='layout grid gap-12 lg:grid-cols-2 lg:items-center'>
          <div>
            <SectionHeading
              floor='3'
              eyebrow='Before → after'
              title='Old lift. New life.'
              accent='New'
              description='Drag the handle to see a real Nishan Lift modernization — collapsible gate and open cage replaced with an automatic stainless car door and digital COP.'
            />
            <ul className='mt-8 grid gap-2.5'>
              {highlights.map((highlight, index) => (
                <Reveal key={highlight} as='li' delay={index * 0.06}>
                  <span className='flex items-center gap-3 text-sm font-semibold'>
                    <span className='flex h-6 w-6 items-center justify-center rounded-full bg-(--color-accent) text-[10px] text-white'>
                      ▲
                    </span>
                    {highlight}
                  </span>
                </Reveal>
              ))}
            </ul>
            <div className='mt-10 grid max-w-md grid-cols-2 gap-3'>
              {appreciationLetters.map((letter, index) => (
                <Reveal key={letter.from} delay={index * 0.1}>
                  <figure className='group relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) p-2'>
                    <div className='relative aspect-[3/4] overflow-hidden rounded-xl'>
                      <Image
                        src={letter.image}
                        alt={`Letter of appreciation from ${letter.from}`}
                        fill
                        sizes='(max-width: 1024px) 45vw, 22vw'
                        className='object-cover object-top transition duration-700 group-hover:scale-105'
                      />
                    </div>
                    <figcaption className='px-1 pt-2 text-xs font-semibold'>
                      Appreciation · {letter.from}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal
            from='right'
            className='mx-auto w-full max-w-md lg:max-w-none'
          >
            <BeforeAfter
              before='/images/site/before.webp'
              after='/images/site/after.webp'
              alt='lift modernization in Jaipur'
            />
          </Reveal>
        </div>
      </section>

      <Engineering />

      {/* Reviews */}
      <section
        data-floor='5'
        data-floor-name='Reviews'
        className='relative overflow-hidden py-20 sm:py-28'
      >
        <div className='layout'>
          <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
            <SectionHeading
              floor='5'
              eyebrow='Google reviews'
              title='Rated 4.8 by the buildings we serve'
              accent='4.8'
            />
            <Reveal from='right'>
              <a
                href={companyInfo.reviewsUrl}
                target='_blank'
                rel='noreferrer'
                className='flex items-center gap-4 rounded-3xl bg-(--color-ink) p-4 pr-6 text-white transition hover:-translate-y-1'
              >
                <span className='rounded-2xl bg-black px-4 py-2 ring-1 ring-white/10'>
                  <span className='led text-4xl'>{rating.score}</span>
                </span>
                <span>
                  <span className='flex gap-0.5'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className='h-4 w-4 fill-amber-400 text-amber-400'
                      />
                    ))}
                  </span>
                  <span className='mt-1 block text-xs text-white/60'>
                    {rating.count}+ reviews · Read all on Google
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
          <div className='mt-12'>
            <ReviewsWall reviews={reviews} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section
        data-floor='6'
        data-floor-name='Gallery'
        className='relative bg-(--color-surface) py-20 sm:py-28'
      >
        <div className='layout'>
          <SectionHeading
            floor='6'
            eyebrow='Our photo gallery'
            title='Installed, finished, handed over'
            accent='finished,'
            description='Real cabins, landings and machine rooms from our projects across Rajasthan.'
          />
          <div className='mt-10'>
            <GalleryImageViewer images={galleryImages} initialCount={12} />
          </div>
          <div className='mt-20'>
            <Reveal>
              <p className='text-xs font-bold uppercase tracking-[0.35em] text-(--color-text-muted)'>
                On Instagram · @{companyInfo.instagram}
              </p>
            </Reveal>
            <div className='mt-5'>
              <InstaReelsCarousel items={instaReels} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        data-floor='7'
        data-floor-name='FAQ'
        className='relative py-20 sm:py-28'
      >
        <JsonLd data={faqGraph()} />
        <div className='layout grid gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
          <SectionHeading
            floor='7'
            eyebrow='Questions, answered'
            title='Lift questions we hear every day'
            accent='every'
            description={`Still unsure? Call ${companyInfo.phone} — someone picks up 24 hours a day.`}
          />
          <Reveal>
            <FaqList faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <HallCallCta floor='8' />
      <SiteFooter />
    </main>
  );
}
