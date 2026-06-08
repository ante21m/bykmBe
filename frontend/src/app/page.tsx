import type { Metadata } from 'next';
import { HomeContent } from '@/components/HomeContent';
import type { RawHomeSection } from '@/lib/home-data';

export const metadata: Metadata = {
  title: 'BYKM Trading PLC — Architecting Ethiopia\'s Integrated Future',
};

async function fetchHomeSections(): Promise<RawHomeSection[] | null> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const res = await fetch(`${base}/home`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const sections = await fetchHomeSections();
  return <HomeContent sections={sections || undefined} />;
}
