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
// This is the main page of the BYKM Trading PLC website, showcasing our commitment to building a connected and prosperous Ethiopia through our diverse range of services and solutions.

export default function HomePage() {
  return <HomeContent />;
}
