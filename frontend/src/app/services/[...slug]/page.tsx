import type { Metadata } from 'next';
import { ServicesContent } from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'Services — BYKM Trading PLC',
  description: 'Four integrated business pillars — Infrastructure & Real Estate Development, Global Trade, Logistics & Transport, Hospitality, Retail & Consumer Ecosystems, and Agro-Industrialization & Natural Resources — delivering industrial sovereignty.',
  openGraph: {
    title: 'Services — BYKM Trading PLC',
    description: 'Four integrated business pillars delivering industrial sovereignty across Ethiopia.',
  },
  twitter: {
    title: 'Services — BYKM Trading PLC',
    description: 'Five integrated business pillars delivering industrial sovereignty across Ethiopia.',
  },
  alternates: {
    canonical: '/services',
  },
};

export function generateStaticParams() {
  const keywords = [
    'construction', 'engineering', 'general-contracting',
    'building-construction', 'road-construction', 'infrastructure-development',
    'trading', 'import-export', 'logistics', 'freight-forwarding', 'warehousing',
    'coffee', 'agro-processing', 'mining',
    'ict', 'telecommunications', 'printing',
    'hospitality', 'real-estate', 'eco-resorts',
  ];
  return keywords.map((slug) => ({ slug: [slug] }));
}

export default function ServicesSlugPage() {
  return <ServicesContent />;
}
