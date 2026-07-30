import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import { api, type HomeSection } from '@/lib/api';

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

export default async function HomePage() {
  let sections: HomeSection[] = [];
  try {
    sections = await api.getHomeSections();
  } catch {
  }
  return <HomeContent sections={sections} />;
}
