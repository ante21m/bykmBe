'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetNewsQuery } from '@/lib/redux/api';

export function NewsContent() {
  const { lang } = useTranslation();
  const { data: news, isLoading, error } = useGetNewsQuery({ active: true });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

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

      <section className="w-full px-0 py-16">
        <div className="mb-14">
          <p className="text-gold-400 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
            {lang === 'en' ? 'News & Updates' : 'ዜና እና ዝማኔዎች'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {lang === 'en' ? 'Latest from BYKM' : 'ከቢኬኤም የቅርብ ጊዜ ዜና'}
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-2xl">
            {lang === 'en'
              ? 'Corporate announcements, project milestones, and strategic updates.'
              : 'የኮርፖሬት ማስታወቂያዎች፣ የፕሮጀክት ምዕራፎች እና ስትራቴጂካዊ ዝማኔዎች።'}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-forest-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center py-20">
            {lang === 'en' ? 'Failed to load news.' : 'ዜና መጫን አልተሳካም።'}
          </p>
        )}

        {news && news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm">
              {lang === 'en' ? 'No news articles yet. Check back soon.' : 'ገና የዜና መጣጥፎች የሉም። በቅርቡ ይመልከቱ።'}
            </p>
          </div>
        )}

        {news && news.length > 0 && (
          <div className="grid gap-8">
            {news.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id}>
                <article className="bg-gradient-to-r from-navy-800 via-navy-700 to-forest-600 border border-white/10 p-8 hover:border-white/20 transition-colors group cursor-pointer">
                  <div className="mb-3">
                    {article.publishedAt && (
                      <time className="text-white/50 text-sm font-mono">
                        {formatDate(article.publishedAt)}
                      </time>
                    )}
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-forest-300 transition-colors">
                    {lang === 'am' && article.titleAm ? article.titleAm : article.title}
                  </h2>
                    <p className="text-white/70 text-base leading-relaxed">
                    {lang === 'am' && article.excerptAm ? article.excerptAm : article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-forest-300 text-sm font-mono tracking-wider uppercase group-hover:text-white transition-colors">
                    {lang === 'en' ? 'Read More' : 'ተጨማሪ ያንብቡ'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
      </div>
    </main>
  );
}
