'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsItemQuery } from '@/lib/redux/api';
import DOMPurify from 'isomorphic-dompurify';
import { CalendarDays, Clock, ArrowLeft, Tag, ExternalLink, Download, Share2 } from 'lucide-react';

export function NewsDetailContent() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useTranslation();
  const { data: article, isLoading, error } = useGetNewsItemQuery(id);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const readingTime = (text?: string) => {
    if (!text) return '1 min';
    const wpm = 200;
    const words = text.split(/\s+/).length;
    const min = Math.max(1, Math.ceil(words / wpm));
    return `${min} min read`;
  };

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({ title: article?.title, url: window.location.href });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f5f4ef]">
        <div className="h-28" />
        <div className="container-custom py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-[#f5f4ef]">
        <div className="h-28" />
        <div className="container-custom py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-navy-100 flex items-center justify-center">
              <CalendarDays size={28} className="text-navy-300" />
            </div>
            <p className="text-navy-600/60 text-base mb-6">
              {lang === 'en' ? 'Article not found.' : 'ጽሑፍ አልተገኘም።'}
            </p>
            <Link href="/news" className="inline-flex items-center gap-2 text-navy-900 font-mono text-sm tracking-wider uppercase hover:text-gold-600 transition-colors">
              <ArrowLeft size={14} />
              {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const title = lang === 'am' && article.titleAm ? article.titleAm : article.title;
  const excerpt = lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt;
  const content = lang === 'am' && article.contentAm ? article.contentAm : article.content;

  return (
    <main className="min-h-screen bg-[#f5f4ef]">
      {/* Hero Image */}
      {article.imageUrl && (
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f4ef] via-[#f5f4ef]/20 to-transparent" />
        </div>
      )}

      <div className={article.imageUrl ? '-mt-20 relative z-10' : ''}>
        <div className="h-28" />

        <section className="container-custom pb-20">
          {/* Back Link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-900 text-sm font-mono tracking-wider uppercase mb-10 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
          </Link>

          <article className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-10">
              {/* Tags & Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {article.tags && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.split(',').map((tag, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-navy-500 bg-white border border-navy-200 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full">
                        <Tag size={10} />
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-6">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-navy-400 text-sm font-mono">
                {article.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(article.publishedAt)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {readingTime(content)}
                </span>
                {article.author && (
                  <span className="text-navy-500">
                    {lang === 'en' ? 'By' : 'በ'} {lang === 'am' && article.authorAm ? article.authorAm : article.author}
                  </span>
                )}
              </div>
            </header>

            {/* Excerpt */}
            <div className="bg-white border-l-4 border-gold-400 p-6 mb-10 rounded-r-lg shadow-sm">
              <p className="text-navy-700 text-lg leading-relaxed italic">
                {excerpt}
              </p>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-p:text-navy-700 prose-p:leading-relaxed prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-900 prose-blockquote:border-l-gold-400 prose-blockquote:text-navy-600 prose-img:rounded-xl prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />

            {/* Footer Actions */}
            <div className="mt-12 pt-8 border-t border-navy-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {article.tags && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.split(',').map((tag, i) => (
                      <span key={i} className="text-xs font-mono tracking-wider uppercase text-navy-400 bg-navy-100 px-3 py-1 rounded-full">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-navy-500 hover:text-navy-900 text-xs font-mono tracking-wider uppercase transition-colors"
                  >
                    <ExternalLink size={12} />
                    {lang === 'en' ? 'Source' : 'ምንጭ'}
                  </a>
                )}
                <button
                  onClick={shareArticle}
                  className="inline-flex items-center gap-1.5 text-navy-500 hover:text-navy-900 text-xs font-mono tracking-wider uppercase transition-colors"
                >
                  <Share2 size={12} />
                  {lang === 'en' ? 'Share' : 'አጋራ'}
                </button>
              </div>
            </div>

            {/* File Download */}
            {article.fileUrl && (
              <div className="mt-6 p-4 bg-white border border-navy-200 rounded-lg flex items-center justify-between">
                <span className="text-sm text-navy-700 font-mono truncate mr-4">
                  {article.fileName || 'Attachment'}
                </span>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}${article.fileUrl}`}
                  download={article.fileName}
                  className="inline-flex items-center gap-2 text-navy-900 hover:text-gold-600 text-xs font-mono tracking-wider uppercase transition-colors shrink-0"
                >
                  <Download size={14} />
                  {lang === 'en' ? 'Download' : 'አውርድ'}
                </a>
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
}
