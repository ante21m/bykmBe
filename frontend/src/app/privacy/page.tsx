import type { Metadata } from 'next';

const TITLE = 'Privacy Policy — BYKM Trading PLC';
const DESC = 'BYKM Trading PLC privacy policy — how we collect, use, and protect your personal information.';

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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom py-20 max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-navy-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-navy max-w-none space-y-6 text-navy-700/80 text-base leading-relaxed">
          <p><strong>Effective Date:</strong> June 2026</p>
          <p>
            BYKM Trading PLC (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and company details when you submit contact forms or inquiries on our website.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">How We Use Your Information</h2>
          <p>
            We use the information we collect to respond to your inquiries, provide our services, improve our website, and comply with legal obligations.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Data Protection</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.
          </p>
          <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">Contact</h2>
          <p>
            For questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:info@bykmgroup.com" className="text-forest-600 underline">info@bykmgroup.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
