import type { Metadata } from 'next';
import { NewsContent } from '@/components/NewsContent';

const TITLE = 'News — BYKM Trading PLC';
const DESC = 'Latest news, announcements, and corporate updates from BYKM Trading PLC.';
const OG_IMAGE = { url: '/images/logo-bykm.jpg', width: 600, height: 600, alt: 'BYKM Trading PLC' };

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/images/logo-bykm.jpg'],
  },
};

export default function NewsPage() {
  return <NewsContent />;
}
