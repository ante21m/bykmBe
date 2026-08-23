'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetGalleryQuery } from '@/lib/redux/api';

export function GalleryContent() {
  const { lang, translations: t } = useTranslation();
  const { data: gallery, isLoading, error } = useGetGalleryQuery({ active: true });
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, closeLightbox]);

  const getImageSrc = (imageUrl: string) =>
    `${process.env.NEXT_PUBLIC_UPLOAD_URL || 'http://localhost:3001/api'}${imageUrl}`;

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
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
        <div className="mb-14">
          <p className="text-gold-400 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
            {lang === 'en' ? 'Gallery' : 'ማዕከለ-ስዕላት'}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {lang === 'en' ? 'BYKM in Focus' : (t.brand.short.am + ' በትኩረት')}
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-2xl">
            {lang === 'en'
              ? 'A visual journey through our projects, people, events, achievements, and memorable moments.'
              : 'በፕሮጀክቶቻችን፣ በሰዎቻችን፣ በክስቶቻችን፣ በProducesResponseType እና በይזכור ዘመኖቻችን የእይታ ጉዞ።'}
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-forest-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm text-center py-20">
            {lang === 'en' ? 'Failed to load gallery.' : 'ማዕከለ-ስዕላት መጫን አልተሳካም።'}
          </p>
        )}

        {gallery && gallery.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-sm">
              {lang === 'en' ? 'No gallery items yet. Check back soon.' : 'ገና የማዕከለ-ስዕላት ዕቃዎች የሉም። በቅርቡ ይመልከቱ።'}
            </p>
          </div>
        )}

        {gallery && gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group bg-gradient-to-r from-navy-800 via-navy-700 to-forest-600 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="aspect-video bg-navy-900/60 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (item.imageUrl) {
                      setSelectedImage({
                        src: getImageSrc(item.imageUrl),
                        alt: lang === 'am' && item.titleAm ? item.titleAm : item.title,
                      });
                    }
                  }}
                >
                  {item.imageUrl ? (
                    <img
                      src={getImageSrc(item.imageUrl)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => {
                        console.error('Image failed:', item.imageUrl);
                      }}
                    />
                  ) : (
                    <div className="text-white/20 text-4xl font-display font-bold">{t.brand.short[lang]}</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-forest-300 transition-colors">
                    {lang === 'am' && item.titleAm ? item.titleAm : item.title}
                  </h3>
                  {item.description && (
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {lang === 'am' && item.descAm ? item.descAm : item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center animate-fadeIn"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[10001] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-xl md:text-2xl transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="relative z-[10000] max-w-[90vw] max-h-[85vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/70 text-sm text-center mt-3">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </main>
  );
}
