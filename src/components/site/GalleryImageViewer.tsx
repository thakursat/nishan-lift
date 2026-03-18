'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type GalleryImageViewerProps = {
  images: string[];
};

export default function GalleryImageViewer({
  images,
}: GalleryImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] ?? null;
  }, [activeIndex, images]);

  const closeViewer = () => setActiveIndex(null);

  const showPrevious = () => {
    if (activeIndex === null) return;
    const previousIndex =
      activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(previousIndex);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  return (
    <>
      <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {images.map((image, index) => (
          <button
            key={image}
            type='button'
            onClick={() => setActiveIndex(index)}
            className='animate-fade overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) text-left'
            style={{ animationDelay: `${0.08 * index}s` }}
            aria-label={`Open gallery image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              width={900}
              height={700}
              sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw'
              quality={65}
              className='h-36 w-full object-cover transition duration-700 hover:scale-105 sm:h-44'
              loading='lazy'
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div className='fixed inset-0 z-50 bg-black/80 px-4 py-6 sm:px-8'>
          <div className='mx-auto flex h-full max-w-6xl flex-col'>
            <div className='mb-4 flex items-center justify-end gap-2'>
              <button
                type='button'
                onClick={closeViewer}
                aria-label='Close image viewer'
                className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-white text-xl font-bold text-black transition hover:scale-105 hover:bg-white/90'
              >
                ✕
              </button>
            </div>

            <div className='relative flex flex-1 items-center justify-center'>
              <button
                type='button'
                onClick={showPrevious}
                aria-label='Show previous image'
                className='absolute left-0 z-10 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-lg font-semibold text-white transition hover:border-white/60'
              >
                ←
              </button>

              <div className='relative h-full w-full overflow-hidden rounded-2xl'>
                <Image
                  src={activeImage}
                  alt={`Expanded gallery image ${(activeIndex ?? 0) + 1}`}
                  fill
                  sizes='100vw'
                  quality={78}
                  className='object-contain'
                  priority
                />
              </div>

              <button
                type='button'
                onClick={showNext}
                aria-label='Show next image'
                className='absolute right-0 z-10 rounded-full border border-white/30 bg-white/10 px-3 py-2 text-lg font-semibold text-white transition hover:border-white/60'
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
