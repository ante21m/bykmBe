import type { Metadata } from 'next';
import { AboutContent } from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About — BYKM Trading PLC',
  description: 'The story of BYKM Trading PLC — from Besufekad BC to Ethiopia\'s premier multi-sectoral industrial corporation.',
  openGraph: {
    title: 'About — BYKM Trading PLC',
    description: 'The story of BYKM Trading PLC — from Besufekad BC to Ethiopia\'s premier multi-sectoral industrial corporation.',
  },
  twitter: {
    title: 'About — BYKM Trading PLC',
    description: 'The story of BYKM Trading PLC — from Besufekad BC to Ethiopia\'s premier multi-sectoral industrial corporation.',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
