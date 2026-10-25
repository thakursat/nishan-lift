import type { Metadata } from 'next';

import { breadcrumbGraph } from '@/lib/structured-data';

import JsonLd from '@/components/site/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us — 24×7 Lift Service in Jaipur',
  description:
    'Get in touch with Nishan Lift Solutions for lift installation, modernization, service support, and maintenance consultations in Jaipur.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: '/contact',
    title: 'Contact Nishan Lift Solutions — 24×7 Lift Service in Jaipur',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Contact', path: '/contact' }])} />
      {children}
    </>
  );
}
