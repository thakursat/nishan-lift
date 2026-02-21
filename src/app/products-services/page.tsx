import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import {
  companyInfo,
  productImages,
  productNames,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Products & Services',
  description:
    'Explore elevator cabins, doors, and premium lift service offerings from Nishan Lift Solutions for residential and commercial projects.',
  alternates: { canonical: '/products-services' },
};

export default function ProductsServicesPage() {
  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='layout px-4 pb-10 pt-32'>
        <p className='animate-fade text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
          Products
        </p>
        <h1 className='animate-fade-up mt-2 text-3xl font-semibold sm:text-4xl'>
          Products by {companyInfo.name}
        </h1>
        <p className='animate-fade-up mt-4 text-sm text-[color:var(--color-text-muted)] sm:text-base'>
          Explore our carefully crafted selection of high-quality products,
          designed to meet your needs with reliability and excellence. Find the
          perfect solution today.
        </p>
      </section>

      <section className='layout px-4 pb-12'>
        <h2 className='text-xl font-semibold sm:text-2xl'>
          Best Elevator Service Products in Prithviraj Nagar (B Sector), Jaipur
          by
          {` ${companyInfo.name}`}
        </h2>

        <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {productNames.map((product, index) => (
            <article
              key={product}
              className='glass-panel animate-zoom rounded-2xl overflow-hidden'
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <Image
                src={productImages[index % productImages.length]}
                alt={product}
                width={900}
                height={600}
                sizes='(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw'
                quality={68}
                className='h-52 w-full object-cover transition duration-700 hover:scale-105'
                loading='lazy'
              />
              <div className='p-4'>
                <h3 className='text-lg font-semibold'>{product}</h3>
                <p className='mt-2 text-sm text-[color:var(--color-text-muted)]'>
                  Professional finish, safe operation, and installation support
                  for residential and commercial projects.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-14'>
        <div className='rounded-3xl bg-[color:var(--color-accent)]/10 p-7 text-center'>
          <p className='text-sm text-[color:var(--color-text-muted)]'>
            Need help selecting the right cabin or door finish?
          </p>
          <Link
            href='/contact'
            className='mt-4 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-black'
          >
            Start Exploring Now
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
