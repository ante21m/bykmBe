const BASE_URL = 'https://bykmgroup.com';

const org = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'BYKM Trading PLC',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-bykm.jpg`,
  description:
    'BYKM Trading PLC is a premier multi-sectoral Ethiopian corporation driving industrial sovereignty through five integrated strategic pillars: Infrastructure, Agro-Industrialization, Global Trade, Digital Economy, and Hospitality.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yeka Sub-City, Woreda 08',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+251-XXX-XXXXXXX',
      contactType: 'customer service',
      email: 'bykmgroup@gmail.com',
      availableLanguage: ['English', 'Amharic'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+251-XXX-XXXXXXX',
      contactType: 'sales',
      email: 'bykmgroup@gmail.com',
    },
  ],
  sameAs: [
    'https://linkedin.com/company/bykm-trading',
    'https://facebook.com/bykmtrading',
    'https://twitter.com/bykmtrading',
  ],
  foundingDate: '2000',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 200 },
  areaServed: 'ET',
};

const website = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'BYKM Trading PLC',
  description: 'Architecting Ethiopia\'s Integrated Future — multi-sectoral industrial corporation.',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['en', 'am'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const webPage = {
  '@type': 'WebPage',
  '@id': `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
  isPartOf: { '@id': `${BASE_URL}/#website` },
  about: { '@id': `${BASE_URL}/#organization` },
  description: 'Ethiopian multi-sectoral corporation — Infrastructure, Agro-Industry, Global Trade, Digital Economy & Hospitality.',
};

const breadcrumb = {
  '@type': 'BreadcrumbList',
  '@id': `${BASE_URL}/#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/about` },
    { '@type': 'ListItem', position: 3, name: 'Services', item: `${BASE_URL}/services` },
    { '@type': 'ListItem', position: 4, name: 'Projects', item: `${BASE_URL}/projects` },
    { '@type': 'ListItem', position: 5, name: 'Contact', item: `${BASE_URL}/contact` },
  ],
};

const localBusiness = {
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  parentOrganization: { '@id': `${BASE_URL}/#organization` },
  name: 'BYKM Trading PLC',
  image: `${BASE_URL}/images/logo-banner.png`,
  url: BASE_URL,
  telephone: '+251-XXX-XXXXXXX',
  email: 'bykmgroup@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Yeka Sub-City, Woreda 08',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '13:00' },
  ],
  priceRange: '$$',
};

const faq = {
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is BYKM Trading PLC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BYKM Trading PLC is a multi-sectoral Ethiopian corporation engaged in infrastructure development, agro-industrialization, global trade, digital economy, and hospitality services.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does BYKM Trading PLC offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BYKM offers Grade-4 general contracting, import/export logistics, coffee value chain management, ICT infrastructure, telecommunications, hospitality, and real estate development.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is BYKM Trading PLC headquartered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BYKM Trading PLC is headquartered in Yeka Sub-City, Woreda 08, Addis Ababa, Ethiopia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is BYKM Trading PLC a licensed general contractor in Ethiopia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, BYKM Trading PLC holds a Grade-4 General Contracting (GC-4) license for building, road, water, and electro-mechanical engineering in Ethiopia.',
      },
    },
  ],
};

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [org, website, webPage, breadcrumb, localBusiness, faq],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
