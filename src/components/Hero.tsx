'use client';

import React from 'react';
import { Ruler, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface HeroProps {
  onOpenCalculator?: () => void;
  onShopClick?: () => void;
}

export function Hero({ onOpenCalculator, onShopClick }: HeroProps) {
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  const scrollToCatalog = () => {
    if (onShopClick) {
      onShopClick();
    } else {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Promo Clearance Bar */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-2.5 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-zinc-950 text-white font-black text-[10px] uppercase px-2 py-0.5 tracking-wider">
              {t.topClearanceBadge}
            </span>
            <p className="text-xs sm:text-sm font-black tracking-wider uppercase text-zinc-950">
              {t.promoHeading}
            </p>
          </div>
          <button
            onClick={scrollToCatalog}
            className="bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>{t.shopPromoBtn}</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2. Section Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-7 pb-3">
        <h2 className="text-lg sm:text-2xl font-black uppercase tracking-wider text-zinc-950">
          {t.sectionTitle}
        </h2>
      </div>

      {/* 3. Hero Visual Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="relative overflow-hidden border border-zinc-900 bg-zinc-950 text-white min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-6 sm:p-12 shadow-lg">
          {/* Alpine Snowboarder Background with High Contrast and Tint */}
          <div
            className="absolute inset-0 bg-cover bg-center filter contrast-125 saturate-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1800&auto=format&fit=crop')`,
            }}
          />
          {/* Contrast & Halftone Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

          {/* Centered Hero Callout Box */}
          <div className="relative z-10 text-center max-w-3xl flex flex-col items-center">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-black/80 border border-emerald-400/80 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-black tracking-widest uppercase text-emerald-300">
                {t.heroBadge}
              </span>
            </div>

            {/* Hero Title Box */}
            <div className="bg-black/90 border border-zinc-700 px-6 sm:px-12 py-3 sm:py-5 shadow-2xl backdrop-blur-sm">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
                {t.heroTitle}
              </h1>
            </div>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-200 font-semibold max-w-xl leading-relaxed drop-shadow">
              {t.heroDesc}
            </p>

            {/* CTA Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToCatalog}
                className="bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 shadow-xl active:scale-95 transition-all"
              >
                {t.shopBtn}
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 shadow-xl active:scale-95 transition-all flex items-center gap-2"
                >
                  <Ruler className="h-4 w-4" />
                  <span>{t.calculateBtn}</span>
                </button>
              )}
            </div>

            {/* Guarantees Strip */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-black text-zinc-300 uppercase tracking-wider bg-black/60 px-4 py-2 border border-zinc-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t.guarantee1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t.guarantee2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t.guarantee3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
