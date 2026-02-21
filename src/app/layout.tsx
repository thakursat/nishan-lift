import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import { elevatorTheme } from '@/styles/theme';

import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
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
  return (
    <html lang='en'>
      <body
        style={themeVariables}
        className='min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text-primary)]'
      >
        {children}
      </body>
    </html>
  );
}
