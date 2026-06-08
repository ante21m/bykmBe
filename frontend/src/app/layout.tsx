import type { Metadata } from 'next';
import { Playfair_Display, Lato, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/Toaster';
import { SmartChat } from '@/components/SmartChat';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { ReduxProvider } from '@/components/ReduxProvider';
import { SiteShell } from '@/components/SiteShell';
import { JsonLd } from '@/components/JsonLd';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const SITE_URL = 'https://bykmtrading.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | BYKM Trading PLC',
    default: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
  },
  description:
    'BYKM Trading PLC is a premier multi-sectoral Ethiopian corporation driving industrial sovereignty through five integrated strategic pillars: Agro-Industrialization, Infrastructure, Global Trade, Digital Economy, and Hospitality.',
  keywords: [
    'BYKM Trading',
    'BYKM Trading PLC',
    'Ethiopia',
    'construction company Ethiopia',
    'agro-industrialization',
    'infrastructure development',
    'global trade logistics',
    'Addis Ababa',
    'Ethiopian corporation',
    'industrial development',
    'Grade-4 contractor',
    'Green Legacy',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_ET',
    alternateLocale: ['am_ET'],
    url: SITE_URL,
    siteName: 'BYKM Trading PLC',
    title: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
    description:
      'A premier multi-sectoral Ethiopian corporation driving national industrial sovereignty across infrastructure, agro-industry, trade, digital economy, and hospitality.',
    images: [
      {
        url: '/images/logo-bykm.jpg',
        width: 600,
        height: 600,
        alt: 'BYKM Trading PLC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
    description:
      'A premier multi-sectoral Ethiopian corporation driving national industrial sovereignty.',
    images: ['/images/logo-bykm.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      am: SITE_URL,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${jetbrains.variable}`}
    >
      <body className="bg-[#f5f4ef] text-navy-900 font-body antialiased">
        <ReduxProvider>
          <LanguageProvider>
            <JsonLd />
            <SiteShell>{children}</SiteShell>
            <Toaster />
            <SmartChat />
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
