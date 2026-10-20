'use client';

import React from 'react';
import { ArrowDown, Zap, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 border-b border-zinc-200/80">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-tr from-emerald-100/40 via-teal-100/20 to-transparent blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-800 mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Headless E-Commerce • Next.js & Shopify Storefront API</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl leading-[1.1]">
            Современный магазин с молниеносным откликом
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
            Кастомный фронтенд на <strong>Next.js 14</strong>, подключенный к <strong>Shopify Storefront API</strong>. Мгновенная корзина, отзывчивая галерея товаров и прямая синхронизация с чекаутом Shopify.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 hover:shadow-xl active:scale-95 transition-all"
            >
              <span>Смотреть каталог</span>
              <ArrowDown className="h-4 w-4" />
            </button>
            <a
              href="#features"
              className="inline-flex items-center rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Возможности архитектуры
            </a>
          </div>

        </div>

        {/* Value props banner */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-200/80">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
              <Zap className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">Мгновенный рендеринг</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Супербыстрая загрузка страниц и оптимизация изображений через Next.js CDN.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">Безопасный чекаут</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Оплата и обработка транзакций проводятся через сертифицированный Shopify Checkout.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
              <Truck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">Автоматический учет остатков</h4>
              <p className="text-xs text-zinc-500 mt-0.5">Синхронизация вариантов, цен и наличия через GraphQL Storefront API в реальном времени.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
