import type { Metadata } from 'next';
import { ServicesContent } from '@/components/ServicesContent';

const TITLE = 'Services — BYKM Trading PLC';
const DESC = 'Four integrated business pillars — Infrastructure & Real Estate Development, Global Trade, Logistics & Transport, Hospitality, Retail & Consumer Ecosystems, and Agro-Industrialization & Natural Resources — delivering industrial sovereignty.';
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

export default function ServicesPage() {
  return <ServicesContent />;
}
