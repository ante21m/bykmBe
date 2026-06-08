import type { Metadata } from 'next';
import { ServicesContent } from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'Services — BYKM Trading PLC',
  description: 'Five integrated business pillars — Infrastructure, Global Trade & Logistics, Agro-Industrialization, Digital Economy, and Hospitality — delivering industrial sovereignty.',
  openGraph: {
    title: 'Services — BYKM Trading PLC',
    description: 'Five integrated business pillars delivering industrial sovereignty across Ethiopia.',
  },
  twitter: {
    title: 'Services — BYKM Trading PLC',
    description: 'Five integrated business pillars delivering industrial sovereignty across Ethiopia.',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
