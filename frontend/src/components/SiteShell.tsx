'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { usePageTracking } from '@/lib/usePageTracking';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetRecentNewsQuery } from '@/lib/redux/api';
import { ArrowRight, Calendar } from 'lucide-react';

function RecentNewsSection() {
  const { lang } = useTranslation();
  const { data: newsItems, isLoading } = useGetRecentNewsQuery({ limit: 3 });

  if (isLoading || !newsItems || newsItems.length === 0) return null;

  return (
    <section className="bg-[#f5f4ef]">
      <div className="container-custom py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-xl md:text-2xl font-bold text-navy-900">Latest News</h2>
          <Link href="/news" className="text-forest-700 hover:text-forest-600 text-sm font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5">
            {lang === 'en' ? 'View All' : 'ሁሉንም ይመልከቱ'}<ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {newsItems.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`} className="group block bg-white border border-slate-200 hover:shadow-md transition-all rounded-sm overflow-hidden">
              {item.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-3">
                  <Calendar size={12} />
                  <span>{new Date(item.publishedAt || item.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-navy-900 font-bold text-sm leading-snug mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">{lang === 'en' ? item.title : (item.titleAm || item.title)}</h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{lang === 'en' ? item.excerpt : (item.excerptAm || item.excerpt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  usePageTracking();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isHome = pathname === '/';

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {isHome && <RecentNewsSection />}
      <Footer />
    </>
  );
}
