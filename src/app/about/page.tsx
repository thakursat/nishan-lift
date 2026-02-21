import type { Metadata } from 'next';
import Image from 'next/image';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo, galleryImages, metrics } from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Nishan Lift Solutions, our elevator expertise, proven success metrics, and commitment to safe vertical mobility in Jaipur.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='layout px-4 pb-10 pt-32'>
        <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
          About
        </p>
        <h1 className='mt-2 text-3xl font-semibold sm:text-4xl'>
          About {companyInfo.name}
        </h1>
        <p className='mt-4 max-w-4xl text-sm text-[color:var(--color-text-muted)] sm:text-base'>
          {companyInfo.description} {companyInfo.name} is committed to superior
          craftsmanship, customer satisfaction, and long-term performance—making
          us your dependable partner for all elevator and lift service needs.
        </p>
      </section>

      <section className='layout px-4 pb-12'>
        <h2 className='text-2xl font-semibold'>Gallery</h2>
        <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          {galleryImages.map((image, index) => (
            <figure
              key={image}
              className='animate-fade overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]'
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={900}
                height={700}
                sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw'
                quality={65}
                className='h-36 w-full object-cover transition duration-700 hover:scale-105 sm:h-44'
                loading='lazy'
              />
            </figure>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-14'>
        <h2 className='text-2xl font-semibold'>Proven Success in Numbers</h2>
        <div className='mt-5 grid gap-4 sm:grid-cols-3'>
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              className='glass-panel animate-fade-up rounded-2xl p-6 text-center'
              style={{ animationDelay: `${0.12 * index}s` }}
            >
              <p className='text-3xl font-semibold text-[color:var(--color-accent)]'>
                {metric.value}
              </p>
              <p className='mt-1 text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]'>
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
