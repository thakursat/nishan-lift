import { Metadata, Viewport } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import { elevatorTheme } from '@/styles/theme';

import { siteConfig } from '@/constant/config';
import { companyInfo } from '@/constant/nishan-content';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  applicationName: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: 'business',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  authors: [{ name: siteConfig.title }],
  creator: siteConfig.title,
  publisher: siteConfig.title,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.title} - Elevator Services`,
      },
    ],
    type: 'website',
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@satyamsingh',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

const themeVariables: React.CSSProperties & Record<string, string> = {
  '--color-bg': elevatorTheme.colors.background,
  '--color-surface': elevatorTheme.colors.surface,
  '--color-text-primary': elevatorTheme.colors.textPrimary,
  '--color-text-muted': elevatorTheme.colors.textMuted,
  '--color-accent': elevatorTheme.colors.accent,
  '--color-accent-strong': elevatorTheme.colors.accentStrong,
  '--color-border': elevatorTheme.colors.border,
  '--color-highlight': elevatorTheme.colors.highlight,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    image: `${siteConfig.url}/images/logo.png`,
    url: siteConfig.url,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.shortAddress,
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302021',
      addressCountry: 'IN',
    },
    areaServed: 'Jaipur',
    sameAs: ['https://www.linkedin.com/in/satyam-singh/'],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
  };

  return (
    <html lang='en'>
      <body
        style={themeVariables}
        className='min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}
