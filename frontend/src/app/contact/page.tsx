import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — BYKM Trading PLC',
  description:
    'Get in touch with BYKM Trading PLC. Reach our headquarters in Addis Ababa for partnerships, construction, trade, careers, or general inquiries.',
  openGraph: {
    title: 'Contact — BYKM Trading PLC',
    description: 'Contact BYKM Trading PLC headquarters in Addis Ababa, Ethiopia.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
