import type { Metadata } from 'next';
import { NewsDetailContent } from '@/components/NewsDetailContent';

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  try {
    const res = await fetch(`${baseUrl}/news/${id}`, { cache: 'no-store' });
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

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  return <NewsDetailContent id={id} />;
}
