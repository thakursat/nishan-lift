import type { Metadata } from 'next';
import { Suspense } from 'react';

import { breadcrumbGraph } from '@/lib/structured-data';

import CatalogExplorer from '@/components/site/CatalogExplorer';
import HallCallCta from '@/components/site/HallCallCta';
import JsonLd from '@/components/site/JsonLd';
import Marquee from '@/components/site/Marquee';
import PageHero from '@/components/site/PageHero';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { elevatorTypes } from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Lift Products & Services in Jaipur',
  description:
    'Lift installation, modernization, AMC, repairs, oil filtration and pressure testing, plus SS golden, mirror-finish and MS cabins and doors from Nishan Lift Solutions, Jaipur.',
  alternates: { canonical: '/products-services' },
  openGraph: {
    url: '/products-services',
    title: 'Lift Products & Services in Jaipur',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

export default function ProductsServicesPage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      <JsonLd
        data={breadcrumbGraph([
          { name: 'Products & Services', path: '/products-services' },
        ])}
      />
      <SiteHeader />
      <PageHero
        eyebrow='Products & Services'
        title='Products and services from the best lift service in Jaipur'
        accent='Jaipur'
        description='Explore Lift Service and Elevator Manufacturer offerings from Nishan Lift Solutions. Ask us about availability, details or your specific needs.'
        image='/images/site/gallery/02.webp'
        imageAlt='Golden finish lift cabin by Nishan Lift Solutions'
      />

      <Marquee
        items={elevatorTypes}
        className='font-display bg-(--color-accent) py-4 text-2xl font-extrabold uppercase text-white'
      />

      <section
        data-floor='1'
        data-floor-name='Catalogue'
        className='layout py-16 sm:py-24'
      >
        <Suspense>
          <CatalogExplorer />
        </Suspense>
      </section>

      <HallCallCta floor='2' />
      <SiteFooter />
    </main>
  );
}
