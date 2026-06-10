import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

const TITLE = 'Contact — BYKM Trading PLC';
const DESC = 'Get in touch with BYKM Trading PLC. Reach our headquarters in Addis Ababa for partnerships, construction, trade, careers, or general inquiries.';
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

export default function ContactPage() {
  return <ContactClient />;
}
