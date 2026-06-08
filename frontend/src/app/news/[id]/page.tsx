import type { Metadata } from 'next';
import { NewsDetailContent } from '@/components/NewsDetailContent';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  try {
    const res = await fetch(`${baseUrl}/news/${params.id}`, { cache: 'no-store' });
    if (!res.ok) return { title: 'News — BYKM Trading PLC' };
    const article = await res.json();
    return {
      title: `${article.title} — BYKM Trading PLC`,
      description: article.excerpt?.substring(0, 160) || 'Read the full article.',
      openGraph: {
        title: article.title,
        description: article.excerpt?.substring(0, 160),
        type: 'article',
        publishedTime: article.publishedAt,
      },
    };
  } catch {
    return { title: 'News — BYKM Trading PLC' };
  }
}

export default function NewsDetailPage() {
  return <NewsDetailContent />;
}
