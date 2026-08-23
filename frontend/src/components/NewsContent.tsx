'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsQuery } from '@/lib/redux/api';
import { CalendarDays, ArrowRight, Clock, Tag, X } from 'lucide-react';

export function NewsContent() {
  const { lang, translations: t } = useTranslation();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag') || undefined;
  const { data: news, isLoading, error } = useGetNewsQuery({ active: true, tag: activeTag });

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
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a6b] via-[#121a4a] to-[#080f2e]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 container-custom pt-32 pb-16 md:pt-40 md:pb-24">
          <p className="text-gold-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            {lang === 'en' ? 'News & Updates' : 'ዜና እና ዝማኔዎች'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            {lang === 'en' ? ('Latest from ' + t.brand.short.en) : ('ከ' + t.brand.short.am + ' የቅርብ ጊዜ ዜና')}
          </h1>
          <p className="text-white/60 mt-4 text-lg max-w-2xl">
            {lang === 'en'
              ? 'Corporate announcements, project milestones, and strategic updates.'
              : 'የኮርፖሬት ማስታወቂያዎች፣ የፕሮጀክት ምዕራፎች እና ስትራቴጂካዊ ዝማኔዎች።'}
          </p>
        </div>
        <div className="h-16 bg-gradient-to-b from-transparent to-[#f5f4ef]" />
      </section>

      {/* Active Tag Filter */}
      {activeTag && (
        <section className="container-custom pt-6">
          <div className="inline-flex items-center gap-3 bg-[#183587] text-white px-5 py-2.5 text-sm font-mono tracking-wider">
            <Tag size={14} />
            <span className="uppercase">{activeTag}</span>
            <Link href="/news" className="ml-2 hover:bg-white/20 rounded-full p-0.5 transition-colors">
              <X size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Featured Article */}
      {featured && (
        <section className="container-custom pb-12">
          <Link href={`/news/${featured.id}`} className="group block relative overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0 min-h-[420px]">
              {featured.imageUrl && (
                <div className="relative overflow-hidden h-64 md:h-auto">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  <div className="absolute top-5 left-5 bg-[#183587] text-white text-[10px] font-mono tracking-[0.2em] uppercase px-4 py-2">
                    {lang === 'en' ? 'Featured' : 'ዋና ዜና'}
                  </div>
                </div>
              )}
              <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs font-mono mb-5">
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
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-900 mb-4 group-hover:text-[#183587] transition-colors duration-300">
                  {lang === 'am' && featured.titleAm ? featured.titleAm : featured.title}
                </h2>
                <p className="text-slate-500 text-base leading-relaxed line-clamp-3 mb-6">
                  {lang === 'am' && featured.excerptAm ? featured.excerptAm : featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-[#183587] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                  {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Remaining Articles Grid */}
      {remaining.length > 0 && (
        <section className="container-custom pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id} className="group block bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                {article.imageUrl && (
                  <div className="relative overflow-hidden h-52 shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {article.tags && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {article.tags.split(',').slice(0, 2).map((tag) => (
                          <span key={tag} onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/news?tag=${encodeURIComponent(tag.trim())}`; }} className="inline-flex items-center gap-1 text-white bg-black/40 backdrop-blur-sm text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 hover:bg-[#183587] transition-colors duration-300 cursor-pointer">
                            <Tag size={9} />
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-mono mb-3">
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
                  <h2 className="font-display text-lg font-bold text-navy-900 mb-2 group-hover:text-[#183587] transition-colors duration-300 line-clamp-2">
                    {lang === 'am' && article.titleAm ? article.titleAm : article.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#183587] font-medium text-xs group-hover:gap-3 transition-all duration-300 mt-auto pt-4 border-t border-slate-100">
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <ArrowRight size={12} />
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
            <p className="text-slate-500 text-base">
              {lang === 'en' ? 'No news articles yet. Check back soon.' : 'ገና የዜና መጣጥፎች የሉም። በቅርቡ ይመልከቱ።'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
