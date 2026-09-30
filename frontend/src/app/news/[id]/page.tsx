import type { Metadata } from 'next';
import { NewsDetailContent } from '@/components/NewsDetailContent';

const FALLBACK_TITLE = 'News — BYKM Trading PLC';

/**
 * `params` is a Promise in the App Router (Next 15+). Reading `params.id`
 * without awaiting it yields `undefined`, so the request below used to go
 * out as `/news/undefined`, 404, and silently fall back to the generic
 * title — every article page shipped the same <title> to crawlers.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  if (!id) return { title: FALLBACK_TITLE };

  try {
    const res = await fetch(`${baseUrl}/news/${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });
    // Covers 404 and any server error. A missing article should not be
    // reported as a crash, and a crash should not be reported as missing.
    if (!res.ok) return { title: FALLBACK_TITLE };

    const article = await res.json();
    if (!article?.title) return { title: FALLBACK_TITLE };

    const description = article.excerpt?.substring(0, 160) || undefined;

    return {
      title: `${article.title} — BYKM Trading PLC`,
      description,
      openGraph: {
        title: article.title,
        description,
        type: 'article',
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    // Network unreachable, or a non-JSON error body from the edge.
    return { title: FALLBACK_TITLE };
  }
}

export default function NewsDetailPage() {
  return <NewsDetailContent />;
}
