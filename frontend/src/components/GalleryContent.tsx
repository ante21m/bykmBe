'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageProvider';
import { useGetGalleryQuery } from '@/lib/redux/api';

export function GalleryContent() {
  const { lang, translations: t } = useTranslation();

  const {
    data: gallery,
    isLoading,
    error,
  } = useGetGalleryQuery({ active: true });

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Only images that actually have imageUrl
  const selectableImages = useMemo(
    () => (gallery ?? []).filter((item) => !!item.imageUrl),
    [gallery]
  );

  // Build image URL
  const getImageSrc = (imageUrl: string) => {
    return `${
      process.env.NEXT_PUBLIC_UPLOAD_URL || 'http://localhost:3001/api'
    }${imageUrl}`;
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(null);
  }, []);

  // Open image
  const openImage = useCallback(
    (index: number) => {
      const item = selectableImages[index];

      if (!item || !item.imageUrl) {
        return;
      }

      setSelectedIndex(index);

      setSelectedImage({
        src: getImageSrc(item.imageUrl),
        alt:
          lang === 'am' && item.titleAm
            ? item.titleAm
            : item.title,
      });
    },
    [selectableImages, lang]
  );

  // Navigate image
  const navigateImage = useCallback(
    (direction: 1 | -1) => {
      if (
        selectedIndex === null ||
        selectableImages.length === 0
      ) {
        return;
      }

      const nextIndex =
        (selectedIndex +
          direction +
          selectableImages.length) %
        selectableImages.length;

      openImage(nextIndex);
    },
    [
      selectedIndex,
      selectableImages.length,
      openImage,
    ]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateImage(-1);
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateImage(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [
    selectedImage,
    closeLightbox,
    navigateImage,
  ]);

  return (
    <main className="relative min-h-screen bg-[#080616] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(30,50,150,0.4)_0%,rgba(8,6,22,0.2)_40%,transparent_70%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(40,70,180,0.25)_0%,transparent_50%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_20%,rgba(34,120,50,0.15)_0%,transparent_50%)]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

      </div>

      {/* Decorative shapes */}
      <div className="geo-shape w-96 h-96 -top-20 right-[-80px] rotate-12 opacity-20" />

      <div className="geo-shape w-48 h-48 bottom-1/3 left-[-40px] rotate-45 opacity-10" />

      <div className="relative z-10">

        <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24">

          <div className="container-custom">

            {/* Header */}
            <div className="mb-14">

              <p className="text-gold-400 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4">
                {lang === 'en'
                  ? 'Gallery'
                  : 'Gallery'}
              </p>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
                {lang === 'en'
                  ? 'BYKM in Focus'
                  : `${t.brand.short.am} Gallery`}
              </h1>

              <p className="text-white/50 mt-4 text-lg max-w-2xl">
                {lang === 'en'
                  ? 'A visual journey through our projects, people, events, achievements, and memorable moments.'
                  : 'A visual journey through our projects, people, events, achievements, and memorable moments.'}
              </p>

            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-forest-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center py-20">
                {lang === 'en'
                  ? 'Failed to load gallery.'
                  : 'Failed to load gallery.'}
              </p>
            )}

            {/* Empty */}
            {gallery && gallery.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/40 text-sm">
                  {lang === 'en'
                    ? 'No gallery items yet. Check back soon.'
                    : 'No gallery items yet. Check back soon.'}
                </p>
              </div>
            )}

            {/* Gallery */}
            {gallery && gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {gallery.map((item) => {

                  const imageIndex =
                    selectableImages.findIndex(
                      (image) => image.id === item.id
                    );

                  return (
                    <div
                      key={item.id}
                      className="
                        group
                        bg-gradient-to-r
                        from-navy-800
                        via-navy-700
                        to-forest-600
                        border
                        border-white/10
                        overflow-hidden
                        hover:border-white/20
                        transition-all
                        duration-300
                      "
                    >

                      {/* Image */}
                      <div
                        className="
                          aspect-video
                          bg-navy-900/60
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                          cursor-pointer
                        "
                        onClick={() => {
                          if (
                            item.imageUrl &&
                            imageIndex !== -1
                          ) {
                            openImage(imageIndex);
                          }
                        }}
                      >

                        {item.imageUrl ? (
                          <img
                            src={getImageSrc(item.imageUrl)}
                            alt={
                              lang === 'am' &&
                              item.titleAm
                                ? item.titleAm
                                : item.title
                            }
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition-transform
                              duration-500
                            "
                            onError={() => {
                              console.error(
                                'Image failed:',
                                item.imageUrl
                              );
                            }}
                          />
                        ) : (
                          <div className="text-white/20 text-4xl font-display font-bold">
                            {t.brand.short[lang]}
                          </div>
                        )}

                      </div>

                      {/* Content */}
                      <div className="p-5">

                        <h3
                          className="
                            font-display
                            text-lg
                            font-bold
                            text-white
                            mb-2
                            group-hover:text-forest-300
                            transition-colors
                          "
                        >
                          {lang === 'am' && item.titleAm
                            ? item.titleAm
                            : item.title}
                        </h3>

                        {item.description && (
                          <p
                            className="
                              text-white/60
                              text-sm
                              leading-relaxed
                              line-clamp-2
                            "
                          >
                            {lang === 'am' && item.descAm
                              ? item.descAm
                              : item.description}
                          </p>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </div>

        </section>

      </div>

      {/* =========================================================
          LIGHTBOX
      ========================================================== */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            animate-fadeIn
          "
          onClick={closeLightbox}
        >

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="
              absolute
              top-4
              right-4
              md:top-6
              md:right-6
              z-[10001]

              w-10
              h-10
              md:w-12
              md:h-12

              rounded-full

              bg-white/10
              hover:bg-white/20

              border
              border-white/20

              flex
              items-center
              justify-center

              text-white
              text-xl
              md:text-2xl

              transition-all
              duration-200

              hover:scale-110
            "
            aria-label="Close"
            title="Close"
          >
            &times;
          </button>

          {/* =====================================================
              PREVIOUS IMAGE
          ====================================================== */}

          {selectableImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(-1);
              }}
              className="
                absolute
                left-3
                md:left-6
                top-1/2
                -translate-y-1/2
                z-[10001]

                w-11
                h-11
                md:w-14
                md:h-14

                rounded-full

                bg-white/10
                hover:bg-white/25

                border
                border-white/20

                flex
                items-center
                justify-center

                text-white
                text-3xl
                md:text-4xl

                transition-all
                duration-200

                hover:scale-110

                cursor-pointer
              "
              aria-label="Previous image"
              title="Previous image"
            >
              &lt;
            </button>
          )}

          {/* =====================================================
              IMAGE
          ====================================================== */}

          <div
            className="
              relative
              z-[10000]
              max-w-[80vw]
              max-h-[85vh]
              flex
              flex-col
              items-center
              animate-scaleIn
            "
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="
                max-w-[80vw]
                max-h-[78vh]
                object-contain
                rounded-lg
                shadow-2xl
              "
            />

            {/* Title */}
            <p className="text-white/80 text-sm text-center mt-3">
              {selectedImage.alt}
            </p>

            {/* Counter */}
            {selectedIndex !== null &&
              selectableImages.length > 1 && (
                <p className="text-white/40 text-xs text-center mt-1">
                  {selectedIndex + 1} / {selectableImages.length}
                </p>
              )}

          </div>

          {/* =====================================================
              NEXT IMAGE
          ====================================================== */}

          {selectableImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage(1);
              }}
              className="
                absolute
                right-3
                md:right-6
                top-1/2
                -translate-y-1/2
                z-[10001]

                w-11
                h-11
                md:w-14
                md:h-14

                rounded-full

                bg-white/10
                hover:bg-white/25

                border
                border-white/20

                flex
                items-center
                justify-center

                text-white
                text-3xl
                md:text-4xl

                transition-all
                duration-200

                hover:scale-110

                cursor-pointer
              "
              aria-label="Next image"
              title="Next image"
            >
              &gt;
            </button>
          )}

        </div>
      )}

    </main>
  );
}
