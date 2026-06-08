import type { Metadata } from 'next';
import { GalleryContent } from '@/components/GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery — BYKM Trading PLC',
  description: 'Explore BYKM\'s project gallery showcasing infrastructure, green initiatives, and industrial development across Ethiopia.',
  openGraph: {
    title: 'Gallery — BYKM Trading PLC',
    description: 'Explore BYKM\'s project gallery showcasing infrastructure, green initiatives, and industrial development.',
  },
  twitter: {
    title: 'Gallery — BYKM Trading PLC',
    description: 'Explore BYKM\'s project gallery showcasing infrastructure, green initiatives, and industrial development.',
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
