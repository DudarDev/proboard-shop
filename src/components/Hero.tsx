'use client';

import React from 'react';
import { ArrowDown, Ruler, ShieldCheck, Truck, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenCalculator?: () => void;
  onShopClick?: () => void;
}

export function Hero({ onOpenCalculator, onShopClick }: HeroProps) {
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
      {/* 1. Tactics Promo Ribbon Banner */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-2.5 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-white font-black text-[10px] uppercase px-2 py-0.5 tracking-wider">
              LIMITED DROP
            </span>
            <p className="text-xs sm:text-sm font-black tracking-wider uppercase text-zinc-950">
              PRE-SEASON CLEARANCE • UP TO 40% OFF SNOWBOARD GEAR
            </p>
          </div>
          <button
            onClick={scrollToCatalog}
            className="bg-zinc-950 hover:bg-zinc-800 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 transition-all shadow-sm"
          >
            SHOP CLEARANCE
          </button>
        </div>
      </div>

      {/* 2. Tactics Section Heading */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-3">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-zinc-950">
          SNOWBOARD GEAR & EQUIPMENT • СНОУБОРД ШОП 2025/2026
        </h2>
      </div>

      {/* 3. Hero Visual Banner (Tactics Action Sports Grit Aesthetic) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-950 to-zinc-950 text-white border border-zinc-800 min-h-[360px] sm:min-h-[440px] flex items-center justify-center p-8 sm:p-12 shadow-md">
          {/* Grungy Halftone & Snow Background */}
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay filter contrast-125"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=1600&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />

          {/* Center Tactics Hero Callout */}
          <div className="relative z-10 text-center max-w-3xl flex flex-col items-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1 mb-4 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-black tracking-widest uppercase text-emerald-300">
                PROBOARD DROPSHIP • ОФІЦІЙНИЙ СКЛАД ЄС
              </span>
            </div>

            {/* Giant Tactics Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-md">
              SNOWBOARD SHOP
            </h1>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-medium max-w-xl leading-relaxed">
              Оригінальне спорядження <strong>Capita, Lib Tech, Burton, Union, ThirtyTwo, Anon</strong>. Прямі поставки в Україну з європейського складу.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={scrollToCatalog}
                className="bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 shadow-lg active:scale-95 transition-all"
              >
                SHOP NOW
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  <Ruler className="h-4 w-4" />
                  <span>CALCULATE BOARD SIZE</span>
                </button>
              )}
            </div>

            {/* Micro Guarantees */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>100% Original Brand Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Nova Poshta COD (Накладений)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>14 Days Size Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
