'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsItemQuery, useGetRecentNewsQuery } from '@/lib/redux/api';
import DOMPurify from 'isomorphic-dompurify';
import { CalendarDays, Clock, ArrowLeft, ArrowRight, Tag, ExternalLink, Download, Share2, X, ZoomIn } from 'lucide-react';

export function NewsDetailContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const openLightbox = useCallback((src: string) => setLightbox(src), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [lightbox]);

  useEffect(() => {
    const container = document.querySelector('.news-content');
    if (!container) return;
    const imgs = container.querySelectorAll('img');
    imgs.forEach((img) => {
      if ((img as any).__clickBound) return;
      (img as any).__clickBound = true;
      (img as HTMLElement).style.cursor = 'pointer';
      img.addEventListener('click', () => openLightbox(img.src));
    });
  });

  const { id } = useParams<{ id: string }>();
  const { lang } = useTranslation();
  const { data: article, isLoading, error } = useGetNewsItemQuery(id);
  const { data: relatedNews } = useGetRecentNewsQuery({ limit: 4 });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const readingTime = (text?: string) => {
    if (!text) return '1 min';
    const words = text.split(/\s+/).length;
    const min = Math.max(1, Math.ceil(words / 200));
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
        <div className="pt-32 pb-0">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto animate-pulse space-y-6">
              <div className="h-96 bg-slate-200 rounded-xl" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-[#f5f4ef]">
        <div className="pt-32 pb-16">
          <div className="container-custom text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                <CalendarDays size={32} className="text-slate-300" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-3">
                {lang === 'en' ? 'Article Not Found' : 'ጽሑፍ አልተገኘም'}
              </h2>
              <p className="text-slate-500 text-base mb-8">
                {lang === 'en' ? 'The article you are looking for does not exist or has been removed.' : 'እርስዎ የሚፈልጉት ጽሑፍ የለም ወይም ተወግዷል።'}
              </p>
              <Link href="/news" className="inline-flex items-center gap-2 bg-[#183587] text-white px-6 py-3 text-sm font-medium hover:bg-[#1a237e] transition-all duration-300">
                <ArrowLeft size={16} />
                {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const title = lang === 'am' && article.titleAm ? article.titleAm : article.title;
  const excerpt = lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt;
  const content = lang === 'am' && article.contentAm ? article.contentAm : article.content;
  const related = relatedNews?.filter((n) => n.id !== article.id).slice(0, 4) ?? [];

  return (
    <main className="min-h-screen bg-[#f5f4ef]">
      <div className="bg-[#f5f4ef]">
        <div className="container-custom pt-32 pb-0">
          <Link href="/news" className="inline-flex items-center gap-2 bg-[#183587] text-white px-4 py-2 text-sm font-mono tracking-wider uppercase hover:bg-[#1a237e] transition-all duration-300 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
          </Link>
        </div>
      </div>

      {article.imageUrl && (
        <section className="relative h-[55vh] md:h-[65vh] overflow-hidden group cursor-pointer" onClick={() => openLightbox(article.imageUrl!)}>
          <img src={article.imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080f2e]/90 via-[#080f2e]/30 to-transparent" />
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn size={12} />
            {lang === 'en' ? 'View Full Size' : 'ሙሉ መጠን ይመልከቱ'}
          </div>
        </section>
      )}

      <section className="container-custom pb-24 -mt-8 relative z-10">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 lg:p-14">
              <header className="mb-8">
                {article.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.split(',').map((tag, i) => (
                      <Link key={i} href={`/news?tag=${encodeURIComponent(tag.trim())}`} className="inline-flex items-center gap-1 text-[#183587] bg-[#183587]/5 text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 hover:bg-[#183587] hover:text-white transition-all duration-300">
                        <Tag size={9} />
                        {tag.trim()}
                      </Link>
                    ))}
                  </div>
                )}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-5">
                  {title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs font-mono">
                  {article.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      {formatDate(article.publishedAt)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {readingTime(content)}
                  </span>
                  {article.author && (
                    <span className="text-slate-500">
                      {lang === 'en' ? 'By' : 'በ'} {lang === 'am' && article.authorAm ? article.authorAm : article.author}
                    </span>
                  )}
                </div>
              </header>

              {excerpt && (
                <div className="border-l-4 border-gold-400 pl-6 mb-10 py-2 bg-gold-400/5 rounded-r-lg">
                  <p className="text-navy-700 text-lg leading-relaxed italic font-medium">
                    {excerpt}
                  </p>
                </div>
              )}

              <div
                className="news-content text-slate-600 text-[17px] leading-[1.8]"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
              />
            </div>

            {article.fileUrl && (
              <div className="mx-8 md:mx-12 mb-8 p-5 bg-gradient-to-r from-[#f8f7f3] to-[#f5f4ef] border border-slate-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#183587] flex items-center justify-center shrink-0">
                    <Download size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-700 font-medium">{article.fileName || 'Attachment'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{lang === 'en' ? 'Click to download' : 'ማውረድ ለማድረግ ይጫኑ'}</p>
                  </div>
                </div>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}${article.fileUrl}`}
                  download={article.fileName}
                  className="inline-flex items-center gap-2 bg-[#183587] text-white px-6 py-3 text-xs font-mono tracking-wider uppercase hover:bg-[#1a237e] transition-all duration-300 shrink-0"
                >
                  <Download size={14} />
                  {lang === 'en' ? 'Download' : 'አውርድ'}
                </a>
              </div>
            )}

            <div className="px-8 md:px-12 py-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              {article.tags && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.split(',').map((tag, i) => (
                    <Link key={i} href={`/news?tag=${encodeURIComponent(tag.trim())}`} className="text-[10px] font-mono tracking-wider uppercase text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-[#183587] hover:text-white transition-all duration-300">
                      {tag.trim()}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-4">
                {article.sourceUrl && (
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#183587] text-xs font-mono tracking-wider uppercase transition-colors">
                    <ExternalLink size={12} />
                    {lang === 'en' ? 'Source' : 'ምንጭ'}
                  </a>
                )}
                <button onClick={shareArticle} className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#183587] text-xs font-mono tracking-wider uppercase transition-colors">
                  <Share2 size={12} />
                  {lang === 'en' ? 'Share' : 'አጋራ'}
                </button>
              </div>
            </div>

            <div className="px-8 md:px-12 py-6 border-t border-slate-100">
              <Link href="/news" className="inline-flex items-center gap-2 bg-[#183587] text-white px-5 py-2.5 text-sm font-mono tracking-wider uppercase hover:bg-[#1a237e] transition-all duration-300 group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                {lang === 'en' ? 'Back to News' : 'ወደ ዜና ተመለስ'}
              </Link>
            </div>
          </article>

          {related.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-gold-600 uppercase">{lang === 'en' ? 'More Stories' : 'ተጨማሪ ታሪኮች'}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mt-2">{lang === 'en' ? 'Related News' : 'ተያያዣ ዜና'}</h3>
                </div>
                <Link href="/news" className="group hidden md:inline-flex items-center gap-2 bg-[#183587] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#1a237e] transition-all duration-300">
                  <span>{lang === 'en' ? 'View All News' : 'ሁሉንም ዜና ይመልከቱ'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {item.imageUrl && (
                      <div className="relative h-40 overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono mb-2">
                        <CalendarDays size={11} />
                        <span>{formatDate(item.publishedAt || item.createdAt)}</span>
                      </div>
                      <h4 className="text-navy-900 font-bold text-sm leading-snug mb-2 group-hover:text-[#183587] transition-colors duration-300 line-clamp-2">
                        {lang === 'am' && item.titleAm ? item.titleAm : item.title}
                      </h4>
                      <div className="inline-flex items-center gap-1.5 text-[#183587] text-xs font-medium group-hover:gap-2.5 transition-all duration-300">
                        <span>{lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 md:hidden">
                <Link href="/news" className="group flex items-center justify-center gap-2 bg-[#183587] text-white px-6 py-3.5 text-sm font-medium hover:bg-[#1a237e] transition-all duration-300 w-full">
                  <span>{lang === 'en' ? 'View All News' : 'ሁሉንም ዜና ይመልከቱ'}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 md:p-8" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10">
            <X size={32} />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
