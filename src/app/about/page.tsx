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
    <main className='relative min-h-screen bg-(--) text-(--)'>
      {/* Global Background Pattern */}
      <div
        className='fixed inset-0 z-[-1] pointer-events-none opacity-[0.03]'
        style={{
          backgroundImage:
            'radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
      <div className='fixed top-0 left-0 w-[600px] h-[600px] bg-(--)/5 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>
      <div className='fixed bottom-0 right-0 w-[600px] h-[600px] bg-(--)/5 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>

      <SiteHeader />

      <section className='relative layout px-4 pb-12 pt-36 text-center'>
        <p className='text-sm font-bold uppercase tracking-widest text-(--)'>
          Our Story
        </p>
        <h1 className='mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-(--)'>
          About{' '}
          <span className='text-(--color-accent)'>
            {companyInfo.name}
          </span>
        </h1>
        <p className='mx-auto mt-6 max-w-3xl text-base leading-relaxed text-(--) sm:text-lg'>
          {companyInfo.description} {companyInfo.name} is committed to superior
          craftsmanship, customer satisfaction, and long-term performance—making
          us your dependable partner for all elevator and lift service needs.
        </p>
      </section>

      <section className='layout px-4 pb-16'>
        <div className='mb-10 text-center'>
          <p className='text-sm font-bold uppercase tracking-widest text-(--)'>
            Our Portfolio
          </p>
          <h2 className='mt-3 text-3xl font-extrabold sm:text-4xl'>
            Work & Installations
          </h2>
          <p className='mt-3 text-base text-(--)'>
            A visual record of our completed elevator projects across Jaipur.
          </p>
        </div>
        <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
          {galleryImages.map((image, index) => (
            <figure
              key={image}
              className='group animate-fade overflow-hidden rounded-3xl border border-(--) bg-(--) shadow-sm hover:shadow-xl transition-all duration-300'
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={900}
                height={700}
                sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw'
                quality={65}
                className='h-40 w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 sm:h-48'
                loading='lazy'
              />
            </figure>
          ))}
        </div>
      </section>

      <section className='layout px-4 pb-20'>
        <div className='mb-10 text-center'>
          <h2 className='text-3xl font-extrabold sm:text-4xl'>
            Proven Success in Numbers
          </h2>
        </div>
        <div className='grid gap-6 sm:grid-cols-3 relative'>
          {/* Connecting line */}
          <div className='hidden md:block absolute top-[50%] left-10 right-10 h-px bg-linear-to-r from-transparent via-(--) to-transparent z-0'></div>
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              className='group glass-panel relative z-10 animate-fade-up rounded-3xl p-8 text-center transition-transform hover:-translate-y-1 hover:shadow-2xl'
              style={{ animationDelay: `${0.12 * index}s` }}
            >
              <div className='flex items-baseline justify-center gap-1'>
                <p className='text-5xl font-black tracking-tighter text-(--)'>
                  {metric.value.replace('+', '')}
                </p>
                <span className='text-3xl font-black text-(--)'>
                  +
                </span>
              </div>
              <p className='mt-2 text-xs font-bold uppercase tracking-[0.2em] text-(--)'>
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
