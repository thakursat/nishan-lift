import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  HardHat,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { faqGraph } from '@/lib/structured-data';

import BeforeAfter from '@/components/site/BeforeAfter';
import EmergencyGuide from '@/components/site/EmergencyGuide';
import FaqList from '@/components/site/FaqList';
import HallCallCta from '@/components/site/HallCallCta';
import Hero from '@/components/site/Hero';
import JsonLd from '@/components/site/JsonLd';
import ProductRail from '@/components/site/ProductRail';
import { DoorImage, Reveal } from '@/components/site/Reveal';
import ReviewsGrid from '@/components/site/ReviewsGrid';
import SafetyAudit from '@/components/site/SafetyAudit';
import SafetySystems from '@/components/site/SafetySystems';
import SectionHeading from '@/components/site/SectionHeading';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import {
  companyInfo,
  elevatorTypes,
  faqs,
  featuredServices,
  products,
  rating,
  reviews,
  safetyPillars,
  services,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: {
    absolute:
      'Nishan Lift Solutions | Safe Lift Installation, AMC & 24×7 Repair in Jaipur',
  },
  description:
    'Nishan Lift Solutions — safe lift installation, modernization, AMC, free safety audits and 24×7 emergency lift repair across Jaipur, Ajmer, Sikar and Jhunjhunu. Rated 4.8 on Google.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Nishan Lift Solutions | Safe, reliable lifts in Jaipur',
    description:
      'Lift installation, modernization, AMC, free safety audits and 24×7 emergency repair across Jaipur, Ajmer, Sikar and Jhunjhunu.',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

const pillarIcons = [ShieldCheck, HardHat, Clock];

const work = [
  {
    src: '/images/site/pro/cabin-signature.webp',
    alt: 'Nishan Lift signature SS cabin with patterned panels',
  },
  {
    src: '/images/site/pro/landing-granite.webp',
    alt: 'Stainless steel landing door set in black granite',
  },
  {
    src: '/images/site/pro/landing-wood.webp',
    alt: 'Brushed steel landing door with wood-finish surround',
  },
  {
    src: '/images/site/pro/cabin-ceiling.webp',
    alt: 'Lift cabin with decorative laser-cut ceiling',
  },
];

const featuredReviews = ['Ashish Sharma', 'Harsh Bhandari', 'Neha Sharma'];

export default function HomePage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      <SiteHeader />
      <Hero />

      {/* Safety pillars */}
      <section
        data-floor='1'
        data-floor-name='Our promise'
        className='py-24 sm:py-36'
      >
        <div className='layout'>
          <SectionHeading
            eyebrow='Safety first'
            title='Safety is engineered in, not added on.'
            accent='Safety'
            description={companyInfo.commitment}
          />
          <ul className='mt-16 grid gap-12 sm:grid-cols-3 sm:gap-10'>
            {safetyPillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <Reveal key={pillar.title} as='li' delay={index * 0.1}>
                  <span className='flex h-12 w-12 items-center justify-center rounded-full bg-(--color-accent)/10 text-(--color-accent)'>
                    <Icon className='h-5 w-5' />
                  </span>
                  <h3 className='mt-6 text-xl font-semibold'>{pillar.title}</h3>
                  <p className='mt-3 leading-relaxed text-(--color-text-muted)'>
                    {pillar.description}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <SafetyAudit floor='2' />
      <SafetySystems floor='3' />

      {/* Services */}
      <section
        data-floor='4'
        data-floor-name='Services'
        className='py-24 sm:py-36'
      >
        <div className='layout'>
          <div className='flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
            <SectionHeading
              eyebrow='What we do'
              title='From the first drawing to every service visit after.'
              accent='every'
            />
            <Reveal>
              <Link
                href='/products-services'
                className='group inline-flex items-center gap-2 text-sm font-semibold'
              >
                All services
                <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />
              </Link>
            </Reveal>
          </div>

          <ul className='mt-16 grid gap-14 md:grid-cols-3 md:gap-8'>
            {featuredServices.map((service, index) => (
              <Reveal key={service.title} as='li' delay={index * 0.1}>
                <DoorImage
                  src={service.image}
                  alt={service.title}
                  className='aspect-[4/3] rounded-2xl'
                  sizes='(max-width: 768px) 100vw, 33vw'
                />
                <h3 className='mt-6 text-xl font-semibold'>{service.title}</h3>
                <p className='mt-3 text-sm leading-relaxed text-(--color-text-muted)'>
                  {service.description}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className='mt-20 grid gap-10 border-t border-(--color-border) pt-10 sm:grid-cols-2'>
            <div>
              <p className='text-sm font-semibold'>Also available</p>
              <ul className='mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-(--color-text-muted) min-[420px]:grid-cols-2'>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className='text-sm font-semibold'>Lifts we build</p>
              <ul className='mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-(--color-text-muted) min-[420px]:grid-cols-2'>
                {elevatorTypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Work */}
      <section
        data-floor='5'
        data-floor-name='Our work'
        className='bg-(--color-surface) py-24 sm:py-36'
      >
        <div className='layout'>
          <SectionHeading
            eyebrow='Our work'
            title='Finished to last, in steel, glass and stone.'
            accent='last,'
            description='A few recent installations from our projects across Rajasthan.'
          />
          <ul className='mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
            {work.map((item, index) => (
              <Reveal
                key={item.src}
                as='li'
                delay={index * 0.08}
                className={index % 2 === 1 ? 'lg:mt-16' : undefined}
              >
                <DoorImage
                  src={item.src}
                  alt={item.alt}
                  className='aspect-[3/4] rounded-2xl'
                  sizes='(max-width: 1024px) 50vw, 25vw'
                />
              </Reveal>
            ))}
          </ul>

          <div className='mt-28 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20'>
            <div>
              <SectionHeading
                eyebrow='Modernization'
                title='An old cage lift, made safe again.'
                accent='safe'
                description='Drag the handle to compare. A collapsible gate and open cage were replaced with an automatic stainless steel door and a digital car operating panel.'
              />
              <Reveal delay={0.2}>
                <Link
                  href='/contact'
                  className='group mt-10 inline-flex items-center gap-2 text-sm font-semibold'
                >
                  Ask about modernizing your lift
                  <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />
                </Link>
              </Reveal>
            </div>
            <Reveal className='mx-auto w-full max-w-md lg:max-w-none'>
              <BeforeAfter
                before='/images/site/before.webp'
                after='/images/site/after.webp'
                alt='lift modernization in Jaipur'
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        data-floor='6'
        data-floor-name='Products'
        className='py-24 sm:py-36'
      >
        <div className='layout'>
          <div className='flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
            <SectionHeading
              eyebrow='Cabins & doors'
              title='Finishes for every building.'
              accent='every'
            />
            <Reveal>
              <Link
                href='/products-services?tab=products'
                className='group inline-flex items-center gap-2 text-sm font-semibold'
              >
                View all products
                <ArrowUpRight className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </Link>
            </Reveal>
          </div>
          <div className='mt-16'>
            <ProductRail products={products.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        data-floor='7'
        data-floor-name='Reviews'
        className='bg-(--color-surface) py-24 sm:py-36'
      >
        <div className='layout'>
          <div className='flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
            <SectionHeading
              eyebrow='Google reviews'
              title={`Rated ${rating.score} by the buildings we serve.`}
              accent={String(rating.score)}
            />
            <Reveal>
              <a
                href={companyInfo.reviewsUrl}
                target='_blank'
                rel='noreferrer'
                className='group inline-flex items-center gap-2 text-sm font-semibold'
              >
                Read all {rating.count}+ reviews
                <ArrowUpRight className='h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </a>
            </Reveal>
          </div>
          <div className='mt-16'>
            <ReviewsGrid
              reviews={reviews.filter((review) =>
                featuredReviews.includes(review.name),
              )}
            />
          </div>
        </div>
      </section>

      <EmergencyGuide floor='8' />

      {/* FAQ */}
      <section
        data-floor='9'
        data-floor-name='FAQ'
        className='bg-(--color-surface) py-24 sm:py-36'
      >
        <JsonLd data={faqGraph()} />
        <div className='layout grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
          <SectionHeading
            eyebrow='Questions, answered'
            title='What building owners ask us.'
            accent='ask'
            description={`Still unsure? Call ${companyInfo.phone} — someone picks up 24 hours a day.`}
          />
          <Reveal>
            <FaqList faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <HallCallCta floor='10' />
      <SiteFooter />
    </main>
  );
}
