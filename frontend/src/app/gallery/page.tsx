import type { Metadata } from 'next';
import { GalleryContent } from '@/components/GalleryContent';

const TITLE = 'Gallery — BYKM Trading PLC';
const DESC = 'Explore BYKM\'s project gallery showcasing infrastructure, green initiatives, and industrial development across Ethiopia.';
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

export default function GalleryPage() {
  return <GalleryContent />;
}
