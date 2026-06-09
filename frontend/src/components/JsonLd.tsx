export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bykmgroup.com/#organization',
        name: 'BYKM Trading PLC',
        url: 'https://bykmgroup.com',
        logo: 'https://bykmgroup.com/images/logo-bykm.jpg',
        description:
          'BYKM Trading PLC is a premier multi-sectoral Ethiopian corporation driving industrial sovereignty through five integrated strategic pillars: Infrastructure, Agro-Industrialization, Global Trade, Digital Economy, and Hospitality.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Yeka Sub-City, Woreda 08',
          addressLocality: 'Addis Ababa',
          addressCountry: 'ET',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+251-XXX-XXXXXXX',
          contactType: 'customer service',
          email: 'bykmgroup@gmail.com',
        },
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bykmgroup.com/#website',
        url: 'https://bykmgroup.com',
        name: 'BYKM Trading PLC',
        description:
          'Architecting Ethiopia\'s Integrated Future — multi-sectoral industrial corporation.',
        publisher: { '@id': 'https://bykmgroup.com/#organization' },
        inLanguage: ['en', 'am'],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://bykmgroup.com/#webpage',
        url: 'https://bykmgroup.com',
        name: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
        isPartOf: { '@id': 'https://bykmgroup.com/#website' },
        about: { '@id': 'https://bykmgroup.com/#organization' },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
