import { Metadata, Viewport } from 'next';
import { Big_Shoulders } from 'next/font/google';
import * as React from 'react';

import '@/styles/globals.css';

import { siteGraph } from '@/lib/structured-data';

import JsonLd from '@/components/site/JsonLd';
import LiftIntro from '@/components/site/LiftIntro';
import MobileActionBar from '@/components/site/MobileActionBar';

import { siteConfig } from '@/constant/config';
import { elevatorTheme } from '@/styles/theme';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.title} | Lift & Elevator Company in Jaipur`,
    template: `%s | ${siteConfig.title}`,
  },
  applicationName: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  category: 'business',
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Jaipur',
  },
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

const displayFont = Big_Shoulders({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const themeVariables: React.CSSProperties & Record<string, string> = {
  '--color-bg': elevatorTheme.colors.background,
  '--color-surface': elevatorTheme.colors.surface,
  '--color-text-primary': elevatorTheme.colors.textPrimary,
  '--color-text-muted': elevatorTheme.colors.textMuted,
  '--color-accent': elevatorTheme.colors.accent,
  '--color-accent-strong': elevatorTheme.colors.accentStrong,
  '--color-border': elevatorTheme.colors.border,
  '--color-highlight': elevatorTheme.colors.highlight,
  '--color-ink': elevatorTheme.colors.ink,
  '--color-ink-soft': elevatorTheme.colors.inkSoft,
  '--color-steel': elevatorTheme.colors.steel,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={displayFont.variable}
      data-scroll-behavior='smooth'
    >
      <body
        style={themeVariables}
        className='min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'
      >
        <LiftIntro />
        <JsonLd data={siteGraph()} />
        {children}
        <MobileActionBar />
      </body>
    </html>
  );
}
