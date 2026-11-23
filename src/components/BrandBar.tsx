'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface BrandBarProps {
  selectedBrand?: string;
  onSelectBrand: (brand: string) => void;
}

export type TacticsBrandBarProps = BrandBarProps;

const BRANDS = [
  { name: 'BURTON', id: 'Burton', tag: '🏂' },
  { name: 'CAPITA', id: 'Capita', tag: '⚡' },
  { name: 'LIB TECH', id: 'Lib Tech', tag: '🌊' },
  { name: 'UNION', id: 'Union', tag: '🛡️' },
  { name: 'THIRTYTWO', id: 'ThirtyTwo', tag: '32' },
  { name: 'VANS', id: 'Vans', tag: '🛹' },
  { name: 'SALOMON', id: 'Salomon', tag: '🏔️' },
  { name: 'GNU', id: 'GNU', tag: '🌀' },
  { name: 'NITRO', id: 'Nitro', tag: '🔥' },
  { name: 'JONES', id: 'Jones', tag: '🌲' },
  { name: 'BATALEON', id: 'Bataleon', tag: '3BT' },
  { name: 'ANON', id: 'Anon', tag: '🥽' },
  { name: 'SMITH', id: 'Smith', tag: '👓' },
  { name: 'OAKLEY', id: 'Oakley', tag: '🎯' },
  { name: 'VOLCOM', id: 'Volcom', tag: '💎' },
  { name: 'SANTA CRUZ', id: 'Santa Cruz', tag: '🔴' },
  { name: 'DAKINE', id: 'Dakine', tag: '🎒' },
];

export function BrandBar({ selectedBrand, onSelectBrand }: BrandBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  const handleScroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full border-y border-zinc-200 bg-white py-2.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => handleScroll(-250)}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 items-center justify-center bg-white/95 border border-zinc-300 text-zinc-700 shadow-sm hover:bg-zinc-100 hover:text-black transition-all"
          aria-label="Scroll brands left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Brand Items Row */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto scrollbar-none px-6 py-1 scroll-smooth"
        >
          <button
            onClick={() => onSelectBrand('')}
            className={`text-xs font-black uppercase tracking-wider px-3.5 py-1.5 transition-all whitespace-nowrap border shrink-0 ${
              !selectedBrand
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            {t.allBrands}
          </button>

          <div className="h-5 w-[1px] bg-zinc-300 shrink-0 mx-1" />

          {BRANDS.map((brand) => {
            const isSelected = selectedBrand?.toLowerCase() === brand.id.toLowerCase();
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(isSelected ? '' : brand.id)}
                className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 transition-all whitespace-nowrap border shrink-0 ${
                  isSelected
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                    : 'bg-white text-zinc-700 border-zinc-200/80 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950'
                }`}
              >
                <span className="text-[10px] opacity-70">{brand.tag}</span>
                <span>{brand.name}</span>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button & Right Fade Mask */}
        <div className="pointer-events-none absolute right-4 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        <button
          type="button"
          onClick={() => handleScroll(250)}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 items-center justify-center bg-white/95 border border-zinc-300 text-zinc-700 shadow-sm hover:bg-zinc-100 hover:text-black transition-all"
          aria-label="Scroll brands right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}

export const TacticsBrandBar = BrandBar;
