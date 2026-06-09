import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';

export const metadata: Metadata = {
  title: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
  openGraph: {
    images: [{ url: '/images/logo-bykm.jpg', width: 600, height: 600, alt: 'BYKM Trading PLC' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/logo-bykm.jpg'],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
