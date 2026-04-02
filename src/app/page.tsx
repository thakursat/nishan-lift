import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  Layers,
  Package,
  Settings,
  ShieldCheck,
  Star,
  Users,
  Wrench,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import GalleryImageViewer from '@/components/site/GalleryImageViewer';
import InstaReelsCarousel from '@/components/site/InstaReelsCarousel';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import {
  companyInfo,
  galleryImages,
  instaReels,
  metrics,
  productImages,
  productNames,
} from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Elevator Service in Jaipur',
  description:
    'Trusted elevator installation, modernization, and maintenance services in Jaipur for residential, commercial, and industrial buildings.',
  alternates: { canonical: '/' },
};

const services = [
  {
    Icon: Building2,
    title: 'New Installation',
    description:
      'Custom lift solutions designed for residential, commercial, and industrial buildings — safe, reliable, and code-compliant.',
  },
  {
    Icon: Layers,
    title: 'Modernization',
    description:
      'Upgrade aging elevator systems with modern components for improved performance, safety, and energy efficiency.',
  },
  {
    Icon: Wrench,
    title: 'AMC & Maintenance',
    description:
      'Scheduled upkeep and annual maintenance contracts that keep your lift running smoothly around the clock.',
  },
];

const metricIcons = [Package, Star, Users];

export default function HomePage() {
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

      {/* Hero */}
      <section className='relative isolate min-h-[92vh] overflow-hidden pt-28 sm:pt-32'>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='metadata'
          poster='/images/optimized/new-tab.png'
          className='absolute inset-0 h-full w-full object-cover scale-[1.02] transform'
        >
          <source src='/videos/optimized/video.mp4' type='video/mp4' />
          <source src='/videos/video.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-linear-to-b from-black/80 via-black/50 to-(--)/95' />

        {/* Subtle mesh overlay on video */}
        <div className='absolute inset-0 bg-[url(/images/grid-pattern.svg)] opacity-20'></div>

        <div className='layout relative flex min-h-[92vh] flex-col items-center justify-center px-4 pb-8 sm:pb-12 pt-16'>
          {/* Floating Aesthetic Elements */}
          <div className='absolute left-10 top-1/3 hidden lg:flex animate-fade-up animation-delay-300 floating-card flex-col items-center gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/20 text-white shadow-2xl'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-(--)/80 text-white'>
              <ShieldCheck className='h-6 w-6' />
            </div>
            <span className='text-sm font-semibold tracking-wide'>
              100% Safety
            </span>
          </div>

          <div
            className='absolute right-10 bottom-1/3 hidden lg:flex animate-fade-up animation-delay-400 floating-card flex-col items-center gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/20 text-white shadow-2xl'
            style={{ animationDelay: '1.5s' }}
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white'>
              <Activity className='h-6 w-6 text-(--)' />
            </div>
            <span className='text-sm font-semibold tracking-wide'>
              Zero Downtime
            </span>
          </div>

          <article className='animate-fade-up relative z-10 mx-auto max-w-4xl text-center text-white'>
            <div className='mb-6 flex justify-center'>
              <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-md'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
                </span>
                Trusted by 300+ Clients
              </span>
            </div>

            <h1 className='text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl drop-shadow-2xl'>
              Elevating Mobility with{' '}
              <span className='text-(--color-highlight)'>
                {companyInfo.name}
              </span>
            </h1>
            <p className='animation-delay-100 animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md sm:text-xl'>
              Premium engineering and flawless installation for elevators that
              define modern architecture and safety standards.
            </p>

            <div className='animation-delay-200 animate-fade-up mt-10 flex flex-wrap justify-center gap-5'>
              <Link
                href='/contact'
                className='group relative flex items-center gap-2 rounded-full bg-(--color-accent) px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(158,0,0,0.4)] transition-all hover:-translate-y-1 hover:bg-(--color-accent-strong) hover:shadow-[0_0_60px_rgba(158,0,0,0.6)]'
              >
                Schedule Consultation
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
              <Link
                href='/products-services'
                className='group flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/20'
              >
                Our Portfolio
              </Link>
            </div>

            <div className='mt-14 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/80 border-t border-white/10 pt-8'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-(--)' />
                <span>ISO Certified Quality</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-(--)' />
                <span>Expert Engineers</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-5 w-5 text-(--)' />
                <span>24/7 AMC Support</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Services */}
      <section className='relative layout px-4 pt-20 pb-10'>
        <div className='mb-12 text-center'>
          <span className='text-sm font-bold uppercase tracking-widest text-(--)'>
            Our Expertise
          </span>
          <h2 className='mt-3 text-3xl font-extrabold sm:text-4xl'>
            Engineered for Excellence
          </h2>
        </div>
        <div className='grid gap-6 sm:grid-cols-3'>
          {services.map(({ Icon, title, description }, index) => (
            <article
              key={title}
              className={`group glass-panel relative animate-fade-up overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl animation-delay-${(index + 1) * 100}`}
            >
              {/* Background oversized icon for modern feel */}
              <Icon className='absolute -right-6 -bottom-6 h-40 w-40 text-(--) opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:text-(--) group-hover:opacity-10' />

              <div className='relative z-10'>
                <div className='mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-(--) to-(--) text-white shadow-lg'>
                  <Icon size={28} />
                </div>
                <h3 className='text-xl font-bold'>{title}</h3>
                <p className='mt-3 text-base leading-relaxed text-(--)'>
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className='relative layout px-4 pt-10 pb-16'>
        {/* Subtle background connecting line */}
        <div className='hidden md:block absolute top-[60%] left-10 right-10 h-px bg-linear-to-r from-transparent via-(--) to-transparent z-0'></div>

        <div className='relative z-10 grid gap-6 sm:grid-cols-3'>
          {metrics.map((item, index) => {
            const Icon = metricIcons[index];
            return (
              <article
                key={item.label}
                className={`group glass-panel flex flex-col items-center animate-fade-up rounded-3xl p-8 text-center transition-transform hover:scale-105 animation-delay-${
                  (index + 1) * 100
                }`}
              >
                <div className='mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-(--) shadow-inner ring-1 ring-(--) text-(--) group-hover:bg-(--) group-hover:text-white transition-colors duration-300'>
                  <Icon size={28} />
                </div>
                <div className='flex items-baseline justify-center gap-1'>
                  <p className='text-5xl font-black text-(--) tracking-tighter'>
                    {item.value.replace('+', '')}
                  </p>
                  <span className='text-3xl font-black text-(--)'>+</span>
                </div>
                <p className='mt-2 tracking-[0.2em] text-xs font-bold uppercase text-(--)'>
                  {item.label}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Products */}
      <section className='layout px-4 pb-12'>
        <div className='mb-6 flex items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.4em] text-(--)'>
              Discover what we offer
            </p>
            <h2 className='mt-2 text-2xl font-semibold'>
              Elevator Products by {companyInfo.name}
            </h2>
            <p className='mt-1 text-sm text-(--)'>
              Premium cabin and door designs for every building type.
            </p>
          </div>
          <Link
            href='/products-services'
            className='shrink-0 text-sm font-semibold text-(--) transition hover:opacity-75'
          >
            View all →
          </Link>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {productNames.slice(0, 6).map((product, index) => (
            <article
              key={product}
              className='glass-panel animate-zoom overflow-hidden rounded-2xl animation-delay-100'
            >
              <div className='overflow-hidden'>
                <Image
                  src={productImages[index]}
                  alt={product}
                  width={900}
                  height={600}
                  sizes='(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw'
                  quality={68}
                  className='h-48 w-full object-cover transition duration-500 hover:scale-105'
                  loading='lazy'
                />
              </div>
              <div className='p-4'>
                <h3 className='text-sm font-semibold'>{product}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className='layout px-4 pb-12'>
        <p className='text-xs font-semibold uppercase tracking-[0.4em] text-(--)'>
          Our Portfolio
        </p>
        <h2 className='mt-2 text-2xl font-semibold'>Work & Installations</h2>
        <p className='mt-1 text-sm text-(--)'>
          A look at our completed lift installations across Jaipur and beyond.
        </p>
        <GalleryImageViewer images={galleryImages.slice(0, 8)} />
      </section>

      {/* Testimonials */}
      <section className='layout px-4 pb-12'>
        <p className='text-xs font-semibold uppercase tracking-[0.4em] text-(--)'>
          Customer Testimonials
        </p>
        <h2 className='mt-2 text-2xl font-semibold'>Hear From Our Customers</h2>
        <p className='mt-2 max-w-2xl text-sm text-(--)'>
          Watch real customer experiences with our installation, modernization,
          and maintenance services.
        </p>
        <div className='mt-5'>
          <InstaReelsCarousel items={instaReels} />
        </div>
      </section>

      {/* CTA */}
      <section className='layout px-4 pb-20 pt-10'>
        <div className='relative animate-zoom overflow-hidden rounded-[2.5rem] bg-(--) border border-(--) p-12 text-center shadow-2xl'>
          {/* Background decorative elements for CTA */}
          <Settings className='absolute -left-10 -bottom-10 h-64 w-64 text-(--) opacity-5 animate-[spin_40s_linear_infinite]' />
          <div className='absolute inset-0 bg-linear-to-br from-transparent to-(--)/5' />

          <div className='relative z-10'>
            <div className='mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-(--)/10 text-(--)'>
              <Building2 size={32} />
            </div>
            <p className='text-sm font-bold uppercase tracking-[0.3em] text-(--)'>
              Ready to elevate your space?
            </p>
            <h2 className='mt-4 text-4xl font-black md:text-5xl'>
              Get in Touch Today
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-lg text-(--)'>
              Contact us for a free consultation and let our engineering team
              design the perfect elevator solution for your project.
            </p>
            <Link
              href='/contact'
              className='group mt-8 inline-flex items-center gap-3 rounded-full bg-(--color-accent) px-10 py-5 text-base font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-(--color-accent-strong) hover:shadow-2xl'
            >
              Start Your Project
              <ArrowRight className='h-5 w-5 transition-transform group-hover:translate-x-2' />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
