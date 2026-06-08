import type { MetadataRoute } from 'next';

const BASE_URL = 'https://bykmtrading.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/news', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${apiUrl}/news`, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const news: { id: string; slug?: string; updatedAt?: string }[] = await res.json();
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
