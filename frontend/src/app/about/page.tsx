import type { Metadata } from 'next';
import { AboutContent } from '@/components/AboutContent';

const TITLE = 'About — BYKM Trading PLC';
const DESC = 'The story of BYKM Trading PLC — from Besufekad BC to Ethiopia\'s premier multi-sectoral industrial corporation.';
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

export default function AboutPage() {
  return <AboutContent />;
}
