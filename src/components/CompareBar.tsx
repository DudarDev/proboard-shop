'use client';

import React from 'react';
import { useCompare } from '@/context/CompareContext';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare, openCompare } = useCompare();
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  if (compareItems.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Floating compare bar"
      className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-950 p-2.5 sm:p-3 text-white shadow-2xl border border-zinc-800 backdrop-blur-xl">
        {/* Left Section: Icon & Thumbnails */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Scale className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {compareItems.map((item) => {
              const imgUrl = item.featuredImage?.url || item.images?.edges?.[0]?.node?.url || '';
              return (
                <div
                  key={item.id}
                  className="group relative h-9 w-9 shrink-0 rounded-lg bg-zinc-900 border border-zinc-750 overflow-hidden p-0.5"
                  title={item.title}
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[10px] text-zinc-500">
                      🏂
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCompare(item.id);
                    }}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                    title={t.removeFromCompare}
                  >
                    <X className="h-3.5 w-3.5 text-rose-400" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="hidden xs:block text-xs font-bold text-zinc-300 shrink-0">
            {compareItems.length}/3
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            title={t.clearCompareBtn}
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <button
            onClick={openCompare}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-950/40"
          >
            <span>{t.openCompareBtn}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
