import type { Metadata } from 'next';

const TITLE = 'Terms of Service — BYKM Trading PLC';
const DESC = 'BYKM Trading PLC terms of service — conditions governing the use of our website and services.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    images: [{ url: '/images/logo-bykm.jpg', width: 600, height: 600, alt: 'BYKM Trading PLC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/images/logo-bykm.jpg'],
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-20 max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-navy-900 mb-8">Terms of Service</h1>
        <div className="prose prose-navy max-w-none space-y-6 text-navy-700/80 text-base leading-relaxed">
          <p><strong>Effective Date:</strong> June 2026</p>
          <p>
            By accessing or using the BYKM Trading PLC website, you agree to comply with and be bound by these Terms of Service.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Use of the Site</h2>
          <p>
            You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the site.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, images, and software — is the property of BYKM Trading PLC and is protected by applicable intellectual property laws.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Limitation of Liability</h2>
          <p>
            BYKM Trading PLC shall not be liable for any damages arising from the use of or inability to use our website or services.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Changes to Terms</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:info@bykmgroup.com" className="text-forest-600 underline">info@bykmgroup.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
