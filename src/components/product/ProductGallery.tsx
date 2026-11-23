'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductGallery({
  images,
  title,
  activeImageIndex,
  onSelectImage,
  isFavorite,
  onToggleFavorite,
}: ProductGalleryProps) {
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Showcase Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-sm flex items-center justify-center p-6">
        <img
          src={currentImage}
          alt={title}
          className="h-full w-full object-contain object-center transition-all duration-300"
        />
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md shadow-md transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/90 text-zinc-700 hover:bg-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Multi-angle Thumbnails Selector */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectImage(idx)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-zinc-50 transition-all ${
                activeImageIndex === idx
                  ? 'border-zinc-900 shadow-md ring-2 ring-zinc-900/10'
                  : 'border-zinc-200 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`${title} view ${idx + 1}`} className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
