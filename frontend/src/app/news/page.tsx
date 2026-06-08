import type { Metadata } from 'next';
import { NewsContent } from '@/components/NewsContent';

export const metadata: Metadata = {
  title: 'News — BYKM Trading PLC',
  description: 'Latest news, announcements, and corporate updates from BYKM Trading PLC.',
  openGraph: {
    title: 'News — BYKM Trading PLC',
    description: 'Latest news, announcements, and corporate updates from BYKM Trading PLC.',
  },
  twitter: {
    title: 'News — BYKM Trading PLC',
    description: 'Latest news, announcements, and corporate updates from BYKM Trading PLC.',
  },
};

export default function NewsPage() {
  return <NewsContent />;
}
