'use client';

import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Tag } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-zinc-950 px-4 py-2.5 text-white text-xs font-medium border-b border-zinc-800">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        
        {/* Placeholder for symmetry */}
        <div className="hidden sm:block w-6" />

        {/* Content */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">
            Сезонне оновлення: <strong>безкоштовна доставка</strong> при замовленні від $150
          </span>
          <span className="hidden md:inline text-zinc-500">•</span>
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <Tag className="h-3 w-3" />
            <span>Промокод: WELCOME10 (-10%)</span>
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Закрити оголошення"
        >
          <X className="h-3.5 w-3.5" />
        </button>

      </div>
    </div>
  );
}
