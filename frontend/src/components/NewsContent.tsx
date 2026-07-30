'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsQuery } from '@/lib/redux/api';
import { CalendarDays, ArrowRight, Clock, Tag } from 'lucide-react';

export function NewsContent() {
  const { lang } = useTranslation();
  const { data: news, isLoading, error } = useGetNewsQuery({ active: true });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

  const readingTime = (text?: string) => {
    if (!text) return '1 min';
    const wpm = 200;
    const words = text.split(/\s+/).length;
    const min = Math.max(1, Math.ceil(words / wpm));
    return `${min} min`;
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

  if (error) {
    return (
      <main className="min-h-screen bg-[#f5f4ef]">
        <div className="h-28" />
        <div className="container-custom py-20 text-center text-red-500 text-sm">
          {lang === 'en' ? 'Failed to load news.' : 'ዜና መጫን አልተሳካም።'}
        </div>
      </main>
    );
  }

  const featured = news?.find((a) => a.featured);
  const remaining = featured ? news?.filter((a) => a.id !== featured.id) ?? [] : news ?? [];

  return (
    <main className="min-h-screen bg-[#f5f4ef]">
      <div className="h-28" />

      {/* Hero */}
      <section className="container-custom pb-4">
        <div className="max-w-3xl">
          <p className="text-navy-500 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
            {lang === 'en' ? 'News & Updates' : 'ዜና እና ዝማኔዎች'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
            {lang === 'en' ? 'Latest from BYKM' : 'ከቢዋይኬኤም የቅርብ ጊዜ ዜና'}
          </h1>
          <p className="text-navy-600/70 mt-4 text-lg max-w-2xl">
            {lang === 'en'
              ? 'Corporate announcements, project milestones, and strategic updates.'
              : 'የኮርፖሬት ማስታወቂያዎች፣ የፕሮጀክት ምዕራፎች እና ስትራቴጂካዊ ዝማኔዎች።'}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="container-custom pb-8">
          <Link href={`/news/${featured.id}`} className="group block relative overflow-hidden rounded-xl bg-white border border-navy-100 shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0 min-h-[400px]">
              {featured.imageUrl && (
                <div className="relative overflow-hidden h-64 md:h-auto">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-gold-400 text-navy-900 text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full font-bold">
                    {lang === 'en' ? 'Featured' : 'ዋና ዜና'}
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-navy-400 text-xs font-mono mb-4">
                  {featured.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} />
                      {formatDate(featured.publishedAt)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {readingTime(featured.content)}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-gold-600 transition-colors">
                  {lang === 'am' && featured.titleAm ? featured.titleAm : featured.title}
                </h2>
                <p className="text-navy-600/80 text-base leading-relaxed line-clamp-3">
                  {lang === 'am' && featured.excerptAm ? featured.excerptAm : featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-navy-900 font-mono text-xs tracking-wider uppercase group-hover:text-gold-600 transition-colors">
                  {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Remaining Articles Grid */}
      {remaining.length > 0 && (
        <section className="container-custom pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id} className="group block bg-white border border-navy-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                {article.imageUrl && (
                  <div className="relative overflow-hidden h-48 shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  {article.tags && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.split(',').slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 text-navy-400 bg-navy-50 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full">
                          <Tag size={10} />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-navy-400 text-xs font-mono mb-3">
                    {article.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={11} />
                        {formatDate(article.publishedAt)}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {readingTime(article.content)}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                    {lang === 'am' && article.titleAm ? article.titleAm : article.title}
                  </h2>
                  <p className="text-navy-600/70 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-navy-900 font-mono text-xs tracking-wider uppercase group-hover:text-gold-600 transition-colors mt-auto pt-4 border-t border-navy-100">
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!news || news.length === 0) && (
        <div className="container-custom py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-navy-100 flex items-center justify-center">
              <CalendarDays size={28} className="text-navy-300" />
            </div>
            <p className="text-navy-600/60 text-base">
              {lang === 'en' ? 'No news articles yet. Check back soon.' : 'ገና የዜና መጣጥፎች የሉም። በቅርቡ ይመልከቱ።'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
