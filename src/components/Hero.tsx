'use client';

import React from 'react';
import { ArrowDown, Ruler, ShieldCheck, Truck, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenCalculator?: () => void;
}

export function Hero({ onOpenCalculator }: HeroProps) {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white border-b border-zinc-800">
      {/* Background Mountain/Action Glow & Graphic Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold text-emerald-400 mb-6 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
              <span>PROBOARD SHOP • Офіційний дропшипінг бордспорту в Україні</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.08] text-white">
              Твій провідник у світ{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                сноубордингу
              </span>{' '}
              та екстриму
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-light max-w-2xl">
              Топові дошки <strong>Nitro, Burton, Capita</strong>, кріплення <strong>Union</strong>, термоформовані черевики <strong>ThirtyTwo</strong> та 20K мембранні анораки. Прямі поставки з офіційних європейських складів по всій Україні без посередників.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-extrabold text-zinc-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 active:scale-95 transition-all"
              >
                <span>Каталог спорядження</span>
                <ArrowDown className="h-4 w-4" />
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800/80 px-5 py-4 text-sm font-bold text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all active:scale-95 shadow-md"
                >
                  <Ruler className="h-4 w-4 text-emerald-400" />
                  <span>Підібрати ростовку (Калькулятор)</span>
                </button>
              )}
            </div>

            {/* Quick check points */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>100% Оригінал з гарантією 2 роки</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Накладений платіж без передплати</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Обмін ростовки за 14 днів</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-zinc-300">Live Dropship Status</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                  Європейський склад • Відкрито
                </span>
              </div>

              <div className="mt-5 space-y-3.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏂</span>
                    <div>
                      <div className="font-bold text-white">Сезон сноубордингу 2025/2026</div>
                      <div className="text-[11px] text-zinc-400">Свіжі колекції в наявності</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400">10+ моделей</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📦</span>
                    <div>
                      <div className="font-bold text-white">Експрес-доставка Нова Пошта</div>
                      <div className="text-[11px] text-zinc-400">1-3 дні по всій Україні</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-300">Відділення / Поштомат</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💳</span>
                    <div>
                      <div className="font-bold text-white">Оплата при отриманні (COD)</div>
                      <div className="text-[11px] text-zinc-400">Перевірте борд перед оплатою</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">0% ризику</span>
                </div>
              </div>

              {/* Proboard Guarantee Footer */}
              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span>proboardshop.ua • dropship</span>
                <span className="font-mono text-emerald-400">Verified Partner</span>
              </div>
            </div>
          </div>

        </div>

        {/* Value props banner */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-800">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Прямий дропшипінг без націнок</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Відправка напряму від європейських дистриб'юторів до вашого відділення Нової Пошти.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Офіційна гарантія 2 роки</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Кожен борд, кріплення та шолом мають серійний номер і заводську гарантію.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
              <Ruler className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Точний підбір ростовки</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Наш онлайн-калькулятор розраховує довжину, ширину Wide та жорсткість під ваші параметри.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
