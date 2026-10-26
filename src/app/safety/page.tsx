import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { breadcrumbGraph, faqGraph } from '@/lib/structured-data';

import EmergencyGuide from '@/components/site/EmergencyGuide';
import FaqList from '@/components/site/FaqList';
import HallCallCta from '@/components/site/HallCallCta';
import JsonLd from '@/components/site/JsonLd';
import PageHero from '@/components/site/PageHero';
import { Reveal } from '@/components/site/Reveal';
import SafetyAudit from '@/components/site/SafetyAudit';
import SafetySystems from '@/components/site/SafetySystems';
import SectionHeading from '@/components/site/SectionHeading';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { faqs, safetyPillars } from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Lift Safety, Free Safety Audit & 24×7 Emergency Help',
  description:
    'How Nishan Lift Solutions keeps lifts in Jaipur safe: free lift safety audits, key safety systems explained, warning signs to watch for, and what to do if you are stuck in a lift.',
  alternates: { canonical: '/safety' },
  openGraph: {
    url: '/safety',
    title: 'Lift safety in Jaipur — free audit & 24×7 emergency help',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

const safetyFaqs = faqs.filter((faq) =>
  /emergency|safety|AMC|modernize/i.test(faq.question),
);

export default function SafetyPage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      <JsonLd data={breadcrumbGraph([{ name: 'Safety', path: '/safety' }])} />
      <JsonLd data={faqGraph(safetyFaqs)} />
      <SiteHeader />
      <PageHero
        eyebrow='Lift safety'
        title='Every ride safe, every single day.'
        accent='safe,'
        description='Safety is the reason we exist. Here is how we keep lifts safe — and what you can do to help.'
        image='/images/site/pro/lobby-stone.webp'
        imageAlt='Lift lobby with stainless steel landing doors'
      />

      <section
        data-floor='1'
        data-floor-name='Our approach'
        className='py-24 sm:py-36'
      >
        <div className='layout grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20'>
          <SectionHeading
            eyebrow='Our approach'
            title='Safe design, regular care, fast help.'
            accent='Safe'
          />
          <ol className='grid gap-10'>
            {safetyPillars.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                as='li'
                delay={index * 0.1}
                className='grid grid-cols-[auto_1fr] gap-6 border-t border-(--color-border) pt-8'
              >
                <span className='text-sm font-semibold text-(--color-accent)'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <h3 className='text-xl font-semibold'>{pillar.title}</h3>
                  <p className='mt-3 leading-relaxed text-(--color-text-muted)'>
                    {pillar.description}
                  </p>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <SafetySystems floor='2' />
      <SafetyAudit floor='3' />

      <div className='bg-(--color-surface)'>
        <EmergencyGuide floor='4' />
      </div>

      <section data-floor='5' data-floor-name='FAQ' className='py-24 sm:py-36'>
        <div className='layout grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
          <div>
            <SectionHeading
              eyebrow='Safety questions'
              title='Answers before you need them.'
              accent='Answers'
            />
            <Reveal delay={0.2}>
              <Link
                href='/contact'
                className='group mt-10 inline-flex items-center gap-2 text-sm font-semibold'
              >
                Ask an engineer
                <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <FaqList faqs={safetyFaqs} />
          </Reveal>
        </div>
      </section>

      <HallCallCta floor='6' />
      <SiteFooter />
    </main>
  );
}
