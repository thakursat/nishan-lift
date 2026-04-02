import {
  Bell,
  Database,
  Globe,
  Lock,
  Scale,
  Share2,
  ShieldCheck,
  UserCheck,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ElementType } from 'react';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo } from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Nishan Lift Solutions privacy policy, including information collection, usage, cookies, security, and user rights.',
  alternates: { canonical: '/privacy-policy' },
};

const sections: { title: string; Icon: ElementType; items: string[] }[] = [
  {
    title: 'Information We Collect',
    Icon: Database,
    items: [
      'Personal information you provide (such as name, email, phone number) when you contact us or sign up for services.',
      'Non-personal information (such as browser type, IP address, pages visited) collected automatically through cookies or analytics tools.',
    ],
  },
  {
    title: 'How We Use Information',
    Icon: Zap,
    items: [
      'Provide, operate, and improve our website and services.',
      'Respond to inquiries or customer support requests.',
      'Send updates, offers, or marketing communications (you can opt out anytime).',
      'Analyze website traffic and usage patterns.',
    ],
  },
  {
    title: 'Sharing of Information',
    Icon: Share2,
    items: [
      'We do not sell, rent, or trade your personal information.',
      'We may share data only with trusted third parties who help us operate our website, comply with legal requirements, or protect our rights.',
    ],
  },
  {
    title: 'Cookies',
    Icon: Globe,
    items: [
      'Our website may use cookies to enhance your browsing experience.',
      'You can adjust your browser settings to refuse cookies, but some features may not function properly.',
    ],
  },
  {
    title: 'Data Security',
    Icon: Lock,
    items: [
      'We implement reasonable measures to protect your personal information. However, no method of transmission over the Internet is completely secure.',
    ],
  },
  {
    title: 'Your Rights',
    Icon: UserCheck,
    items: [
      'You may request access, correction, or deletion of your personal data by contacting us through the Contact page.',
    ],
  },
  {
    title: 'Updates to This Policy',
    Icon: Bell,
    items: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className='relative min-h-screen bg-(--color-bg) text-(--color-text-primary)'>
      {/* Global Background Pattern */}
      <div
        className='fixed inset-0 z-[-1] pointer-events-none opacity-[0.03]'
        style={{
          backgroundImage:
            'radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className='fixed top-0 left-0 w-150 h-150 bg-(--color-accent)/5 blur-[120px] rounded-full pointer-events-none z-[-1]' />
      <div className='fixed bottom-0 right-0 w-150 h-150 bg-(--color-accent)/5 blur-[120px] rounded-full pointer-events-none z-[-1]' />

      <SiteHeader />

      {/* Hero */}
      <section className='relative layout px-4 pb-12 pt-36 text-center'>
        <div className='mb-6 flex justify-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-xs font-semibold uppercase tracking-widest text-(--color-accent)'>
            <Scale size={13} />
            Legal Document
          </span>
        </div>
        <h1 className='animate-fade-up text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
          Privacy{' '}
          <span className='text-(--color-accent)'>Policy</span>
        </h1>
        <p className='animate-fade-up animation-delay-100 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-(--color-text-muted) sm:text-lg'>
          {companyInfo.name} values your privacy. This policy explains how we
          collect, use, and protect your information when you visit our website.
        </p>
        <p className='mt-4 text-xs font-semibold uppercase tracking-widest text-(--color-text-muted)'>
          Effective Date: 1st January, 2025
        </p>

        {/* Stats row */}
        <div className='mt-10 flex flex-wrap justify-center gap-6'>
          {[
            { label: 'Sections', value: `${sections.length}` },
            { label: 'No Data Selling', value: '0' },
            { label: 'Your Rights Protected', value: '100%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className='glass-panel animate-zoom rounded-2xl px-6 py-4 text-center'
            >
              <p className='text-2xl font-black text-(--color-accent)'>
                {stat.value}
              </p>
              <p className='mt-1 text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className='layout px-4 pb-16'>
        <div className='grid gap-5'>
          {sections.map((section, index) => {
            const { Icon } = section;
            return (
              <article
                key={section.title}
                className='group glass-panel animate-fade-up relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-8'
                style={{ animationDelay: `${0.07 * index}s` }}
              >
                {/* Background icon */}
                <Icon className='absolute -right-4 -bottom-4 h-32 w-32 text-(--color-accent) opacity-[0.04] transition-transform duration-500 group-hover:scale-110' />

                <div className='relative z-10 flex items-start gap-5'>
                  {/* Number + icon */}
                  <div className='flex shrink-0 flex-col items-center gap-2'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-(--color-accent)/10 text-(--color-accent)'>
                      <Icon size={22} />
                    </div>
                    <span className='text-[10px] font-black tabular-nums text-(--color-text-muted)'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className='flex-1'>
                    <h2 className='text-lg font-bold sm:text-xl'>
                      {section.title}
                    </h2>
                    <ul className='mt-3 space-y-2.5'>
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className='flex items-start gap-2.5 text-sm leading-relaxed text-(--color-text-muted)'
                        >
                          <ShieldCheck
                            size={14}
                            className='mt-0.5 shrink-0 text-(--color-accent)'
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className='layout px-4 pb-20'>
        <div className='relative overflow-hidden rounded-[2.5rem] bg-(--color-accent) border border-(--color-accent) p-10 text-center shadow-2xl sm:p-14'>
          <div className='absolute inset-0 bg-linear-to-br from-transparent to-black/10' />
          <div className='relative z-10'>
            <div className='mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white'>
              <UserCheck size={28} />
            </div>
            <h2 className='text-2xl font-extrabold text-white sm:text-3xl'>
              Questions About Your Data?
            </h2>
            <p className='mx-auto mt-4 max-w-md text-sm text-white/80'>
              Reach out to us and we&apos;ll help with any data access,
              correction, or deletion requests promptly.
            </p>
            <Link
              href='/contact'
              className='group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-(--color-accent) shadow-lg transition-all hover:scale-105 hover:shadow-xl'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
