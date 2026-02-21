import type { Metadata } from 'next';

import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

import { companyInfo } from '@/constant/nishan-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Nishan Lift Solutions privacy policy, including information collection, usage, cookies, security, and user rights.',
  alternates: { canonical: '/privacy-policy' },
};

const sections = [
  {
    title: 'Information We Collect',
    items: [
      'Personal information you provide (such as name, email, phone number) when you contact us or sign up for services.',
      'Non-personal information (such as browser type, IP address, pages visited) collected automatically through cookies or analytics tools.',
    ],
  },
  {
    title: 'How We Use Information',
    items: [
      'Provide, operate, and improve our website and services.',
      'Respond to inquiries or customer support requests.',
      'Send updates, offers, or marketing communications (you can opt out anytime).',
      'Analyze website traffic and usage patterns.',
    ],
  },
  {
    title: 'Sharing of Information',
    items: [
      'We do not sell, rent, or trade your personal information.',
      'We may share data only with trusted third parties who help us operate our website, comply with legal requirements, or protect our rights.',
    ],
  },
  {
    title: 'Cookies',
    items: [
      'Our website may use cookies to enhance your browsing experience.',
      'You can adjust your browser settings to refuse cookies, but some features may not function properly.',
    ],
  },
  {
    title: 'Data Security',
    items: [
      'We implement reasonable measures to protect your personal information. However, no method of transmission over the Internet is completely secure.',
    ],
  },
  {
    title: 'Your Rights',
    items: [
      'You may request access, correction, or deletion of your personal data by contacting us through the Contact page.',
    ],
  },
  {
    title: 'Updates to This Policy',
    items: [
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className='bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'>
      <SiteHeader />

      <section className='layout px-4 pb-10 pt-32'>
        <p className='text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]'>
          Legal
        </p>
        <h1 className='mt-2 text-3xl font-semibold sm:text-4xl'>
          Privacy Policy
        </h1>
        <p className='mt-3 text-sm text-[color:var(--color-text-muted)]'>
          Effective Date: 1st January, 2025
        </p>
        <p className='mt-4 text-sm text-[color:var(--color-text-muted)] sm:text-base'>
          {companyInfo.name} (“we,” “our,” or “us”) values your privacy. This
          Privacy Policy explains how we collect, use, and protect your
          information when you visit our website.
        </p>
      </section>

      <section className='layout px-4 pb-14'>
        <div className='grid gap-4'>
          {sections.map((section, index) => (
            <article
              key={section.title}
              className='glass-panel animate-fade-up rounded-2xl p-5 sm:p-6'
              style={{ animationDelay: `${0.08 * index}s` }}
            >
              <h2 className='text-lg font-semibold text-[color:var(--color-accent)]'>
                {section.title}
              </h2>
              <ul className='mt-3 space-y-2 text-sm text-[color:var(--color-text-muted)]'>
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
