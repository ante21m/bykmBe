import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bykmgroup.com';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const pillarSlugs = ['infrastructure', 'logistics', 'agro', 'digital', 'hospitality'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  for (const slug of pillarSlugs) {
    entries.push({
      url: `${BASE_URL}/services?pillar=${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // keyword-specific landing paths — these redirect to the main services page via canonical
  const keywordPaths = [
    // Infrastructure & Construction
    { path: '/services/construction', priority: 0.7 },
    { path: '/services/engineering', priority: 0.7 },
    { path: '/services/general-contracting', priority: 0.7 },
    { path: '/services/building-construction', priority: 0.6 },
    { path: '/services/road-construction', priority: 0.6 },
    { path: '/services/infrastructure-development', priority: 0.6 },
    // Trade & Logistics
    { path: '/services/trading', priority: 0.7 },
    { path: '/services/import-export', priority: 0.7 },
    { path: '/services/logistics', priority: 0.7 },
    { path: '/services/freight-forwarding', priority: 0.6 },
    { path: '/services/warehousing', priority: 0.6 },
    // Agro & Resources
    { path: '/services/coffee', priority: 0.7 },
    { path: '/services/agro-processing', priority: 0.6 },
    { path: '/services/mining', priority: 0.6 },
    // Digital & Media
    { path: '/services/ict', priority: 0.6 },
    { path: '/services/telecommunications', priority: 0.6 },
    { path: '/services/printing', priority: 0.5 },
    // Hospitality & Retail
    { path: '/services/hospitality', priority: 0.6 },
    { path: '/services/real-estate', priority: 0.6 },
    { path: '/services/eco-resorts', priority: 0.5 },
  ];
  for (const kp of keywordPaths) {
    entries.push({
      url: `${BASE_URL}${kp.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: kp.priority,
    });
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/news`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const news: { id: string; updatedAt?: string }[] = await res.json();
      for (const article of news) {
        entries.push({
          url: `${BASE_URL}/news/${article.id}`,
          lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch {
    // news API unreachable — serve static sitemap only
  }

  return entries;
}
