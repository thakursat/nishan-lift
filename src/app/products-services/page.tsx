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
    <main className='relative min-h-screen bg-(--) text-(--)'>
      {/* Global Background Pattern */}
      <div className='fixed inset-0 z-[-1] pointer-events-none opacity-[0.03]' style={{ backgroundImage: 'radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
      <div className='fixed top-0 left-0 w-[600px] h-[600px] bg-(--)/5 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>
      <div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-(--)/5 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>

      <SiteHeader />

      <section className='layout px-4 pb-12 pt-36 text-center'>
        <p className='animate-fade text-sm font-bold uppercase tracking-widest text-(--)'>
          Products & Services
        </p>
        <h1 className='animate-fade-up mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight'>
          Premium Elevations by <span className='text-(--color-accent)'>{companyInfo.name}</span>
        </h1>
        <p className='animate-fade-up mx-auto mt-6 max-w-2xl text-base text-(--) sm:text-lg'>
          Explore our carefully crafted selection of high-quality lift cabins, doors,
          and robust systems designed for performance, safety, and modern architecture.
        </p>
      </section>

      <section className='layout px-4 pb-16'>
        <div className='mb-10 text-center'>
          <h2 className='text-2xl font-extrabold sm:text-3xl text-(--)'>
            Our Curated Offerings
          </h2>
        </div>

        <div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {productNames.map((product, index) => (
            <article
              key={product}
              className='group glass-panel animate-zoom rounded-[2rem] overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl'
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <Image
                src={productImages[index % productImages.length]}
                alt={product}
                width={900}
                height={600}
                sizes='(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw'
                quality={68}
                className='h-56 w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105'
                loading='lazy'
              />
              <div className='p-6'>
                <h3 className='text-xl font-bold'>{product}</h3>
                <p className='mt-3 text-sm leading-relaxed text-(--) group-hover:text-(--) transition-colors'>
                  Professional finish, safe operation, and precision engineering
                  for residential and commercial projects.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-20'>
        <div className='relative overflow-hidden rounded-[2.5rem] bg-(--) border border-(--) p-10 sm:p-14 text-center shadow-xl'>
          <div className='absolute inset-0 bg-linear-to-br from-(--)/5 to-transparent' />
          <div className='relative z-10'>
            <h2 className='text-3xl font-extrabold sm:text-4xl'>Need Custom Specifications?</h2>
            <p className='mx-auto mt-4 max-w-xl text-base text-(--)'>
              Our engineers collaborate closely to deliver bespoke finishes and specialized technical solutions.
            </p>
            <Link
              href='/contact'
              className='group mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-(--color-accent-strong) hover:shadow-[0_10px_40px_rgba(158,0,0,0.3)]'
            >
              Consult with Experts
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
