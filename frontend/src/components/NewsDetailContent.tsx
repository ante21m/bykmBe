'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsItemQuery } from '@/lib/redux/api';
import DOMPurify from 'isomorphic-dompurify';

export function NewsDetailContent() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useTranslation();
  const { data: article, isLoading, error } = useGetNewsItemQuery(id);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  if (isLoading) {
    return (
    <main className="relative min-h-screen bg-[#080616] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(34,120,50,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="geo-shape w-96 h-96 -top-20 right-[-80px] rotate-12 opacity-20" />
      <div className="geo-shape w-48 h-48 bottom-1/3 left-[-40px] rotate-45 opacity-10" />
      <div className="relative z-10">
      <div className="h-28" />
        <div className="container-custom flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-forest-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    </main>
    );
  }

  if (error || !article) {
    return (
    <main className="relative min-h-screen bg-[#080616] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(34,120,50,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="geo-shape w-96 h-96 -top-20 right-[-80px] rotate-12 opacity-20" />
      <div className="geo-shape w-48 h-48 bottom-1/3 left-[-40px] rotate-45 opacity-10" />
      <div className="relative z-10">
      <div className="h-28" />
        <div className="container-custom text-center py-20">
          <p className="text-red-400 text-sm">
            {lang === 'en' ? 'Article not found.' : 'ጽሑፍ አልተገኘም።'}
          </p>
          <Link href="/news" className="text-forest-400 text-sm mt-4 inline-block hover:text-forest-300">
            &larr; {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
          </Link>
        </div>
      </div>
    </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#080616] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(34,120,50,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="geo-shape w-96 h-96 -top-20 right-[-80px] rotate-12 opacity-20" />
      <div className="geo-shape w-48 h-48 bottom-1/3 left-[-40px] rotate-45 opacity-10" />
      <div className="relative z-10">
      <div className="h-28" />

      <section className="container-custom py-16">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-white/50 hover:text-forest-400 text-sm mb-10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
        </Link>

        <article className="max-w-3xl bg-forest-800/60 p-8 md:p-12 border border-forest-500/20">
          <div className="mb-4">
            {article.publishedAt && (
              <time className="text-white/50 text-sm font-mono">
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {lang === 'am' && article.titleAm ? article.titleAm : article.title}
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8 border-l-2 border-forest-400/40 pl-4 italic">
            {lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
          </p>

          <div
            className="rich-text text-white/80 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lang === 'am' && article.contentAm ? article.contentAm : article.content) }}
          />

          {article.tags && (
            <div className="flex flex-wrap gap-2 mt-8">
              {article.tags.split(',').map((tag, i) => (
                <span key={i} className="text-sm tracking-wider uppercase text-forest-300 border border-forest-500/30 px-3 py-1 bg-forest-800">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-white/50 hover:text-forest-300 text-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              {lang === 'en' ? 'Source' : 'ምንጭ'}
            </a>
          )}

          {article.fileUrl && (
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}${article.fileUrl}`}
              download={article.fileName}
              className="inline-flex items-center gap-2 mt-8 text-forest-300 hover:text-white text-sm transition-colors border border-forest-500/40 px-4 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {lang === 'en' ? 'Download' : 'አውርድ'} {article.fileName || ''}
            </a>
          )}
        </article>
      </section>
      </div>
    </main>
  );
}