'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useSearchQuery, NewsData, ProjectData, ServiceData } from '@/lib/redux/api';

interface Props {
  open: boolean;
  onClose: () => void;
}

type GroupedResults = {
  news: NewsData[];
  projects: ProjectData[];
  services: ServiceData[];
};

export function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { data, isFetching } = useSearchQuery(debounced, { skip: !debounced });

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setDebounced('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const grouped: GroupedResults = {
    news: data?.news?.slice(0, 5) || [],
    projects: data?.projects?.slice(0, 5) || [],
    services: data?.services?.slice(0, 5) || [],
  };

  const hasResults = grouped.news.length > 0 || grouped.projects.length > 0 || grouped.services.length > 0;

  const sectionHeadings: Record<string, string> = {
    news: 'News',
    projects: 'Projects',
    services: 'Services',
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#080616]/95 backdrop-blur-sm flex flex-col items-center pt-24 px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="w-full max-w-2xl">
        <div className="relative mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, projects, services..."
            className="w-full bg-white/5 border border-white/10 text-white text-lg pl-12 pr-12 py-4 outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/30"
          />
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {isFetching && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isFetching && debounced && !hasResults && (
          <p className="text-white/40 text-center py-12">No results found for &ldquo;{debounced}&rdquo;</p>
        )}

        {!isFetching && hasResults && (
          <div className="space-y-8 max-h-[60vh] overflow-y-auto">
            {(Object.keys(grouped) as (keyof GroupedResults)[]).map((key) => {
              const items = grouped[key];
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <h3 className="text-gold-400 font-display text-sm tracking-widest uppercase mb-3">{sectionHeadings[key]}</h3>
                  <div className="space-y-1">
                    {items.map((item) => {
                      const href = key === 'news'
                        ? `/news/${(item as NewsData).id}`
                        : key === 'projects'
                        ? '/projects'
                        : '/services';
                      const title = (item as NewsData | ProjectData | ServiceData)?.title || '';
                      return (
                        <Link
                          key={(item as NewsData).id || (item as ProjectData).id || (item as ServiceData).id}
                          href={href}
                          onClick={onClose}
                          className="block px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
                        >
                          {title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!debounced && !isFetching && (
          <p className="text-white/30 text-center text-sm">Type to search across the site</p>
        )}
      </div>
    </div>
  );
}
