import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import {
  companyInfo,
  galleryImages,
  metrics,
  productImages,
  productNames,
  testimonials,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Elevator Service in Jaipur',
  description:
    'Trusted elevator installation, modernization, and maintenance services in Jaipur for residential, commercial, and industrial buildings.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='relative isolate min-h-[70vh] overflow-hidden pt-28 sm:pt-32'>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
          poster='/images/optimized/new-tab.png'
          className='absolute inset-0 h-full w-full object-cover'
        >
          <source src='/videos/optimized/video.mp4' type='video/mp4' />
          <source src='/videos/video.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70' />

        <div className='layout relative flex min-h-[70vh] items-center justify-center px-4 pb-4 sm:pb-8'>
          <article className='animate-fade-up mx-auto max-w-3xl text-center text-white'>
            <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
              Elevator Service in Jaipur
            </p>
            <h1 className='mt-4 text-3xl font-semibold leading-tight sm:text-5xl'>
              {companyInfo.name}
            </h1>
            <p className='animation-delay-100 animate-fade-up mt-4 text-sm text-white/85 sm:text-base'>
              Premium lift installation, modernization, and maintenance for
              residential, commercial, and industrial buildings.
            </p>
            <div className='animation-delay-200 animate-fade-up mt-6 flex flex-wrap justify-center gap-3'>
              <Link
                href='/contact'
                className='rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90'
              >
                Contact Us
              </Link>
              <Link
                href='/products-services'
                className='rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]'
              >
                Explore Services
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className='layout px-4 pt-8 pb-12 sm:pt-10'>
        <div className='grid gap-4 sm:grid-cols-3'>
          {metrics.map((item, index) => (
            <article
              key={item.label}
              className={`glass-panel animate-fade-up rounded-2xl p-5 text-center animation-delay-${
                (index + 1) * 100
              }`}
            >
              <p className='text-3xl font-semibold text-[color:var(--color-accent)]'>
                {item.value}
              </p>
              <p className='mt-1 text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]'>
                {item.label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-12'>
        <div className='mb-5 flex items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-accent)]'>
              Discover what we offer
            </p>
            <h2 className='mt-2 text-2xl font-semibold'>
              Elevator Service Products by {companyInfo.name}
            </h2>
          </div>
          <Link
            href='/products-services'
            className='text-sm font-semibold text-[color:var(--color-accent)]'
          >
            Show all
          </Link>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {productNames.slice(0, 6).map((product, index) => (
            <article
              key={product}
              className='glass-panel animate-zoom rounded-2xl overflow-hidden animation-delay-100'
            >
              <Image
                src={productImages[index]}
                alt={product}
                width={900}
                height={600}
                sizes='(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw'
                quality={68}
                className='h-40 w-full object-cover transition duration-700 hover:scale-105'
                loading='lazy'
              />
              <div className='p-4'>
                <h3 className='font-semibold'>{product}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-12'>
        <p className='text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-accent)]'>
          Gallery
        </p>
        <h2 className='mt-2 text-2xl font-semibold'>
          As many visuals as possible
        </h2>

        <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
          {galleryImages.slice(0, 8).map((image, index) => (
            <figure
              key={image}
              className='animate-fade rounded-2xl overflow-hidden border border-[color:var(--color-border)] bg-[color:var(--color-surface)]'
              style={{ animationDelay: `${0.08 * index}s` }}
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

      <section className='layout px-4 pb-12'>
        <p className='text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--color-accent)]'>
          Why customers love {companyInfo.name}
        </p>
        <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className='glass-panel animate-fade-up rounded-2xl p-5'
              style={{ animationDelay: `${0.12 * index}s` }}
            >
              <p className='text-sm font-semibold'>{testimonial.name}</p>
              <p className='text-xs text-[color:var(--color-text-muted)]'>
                {testimonial.when}
              </p>
              <p className='mt-3 text-sm text-[color:var(--color-text-muted)]'>
                {testimonial.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-14'>
        <div
          className='animate-zoom rounded-3xl p-8 text-center text-black'
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(158,0,0,0.88), rgba(196,0,0,0.65), rgba(255,77,77,0.5))',
          }}
        >
          <h2 className='text-2xl font-semibold'>Get in Touch</h2>
          <p className='mt-2 text-sm text-black/80'>
            Contact us today for more information about our services.
          </p>
          <Link
            href='/contact'
            className='mt-5 inline-flex rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-[color:var(--color-accent)] transition hover:opacity-90'
          >
            Contact Us
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
