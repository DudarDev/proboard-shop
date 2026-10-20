'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="features" className="border-t border-zinc-200 bg-zinc-50 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-200">
          
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-xs tracking-wider">
                S
              </span>
              <span className="font-extrabold text-base tracking-tight text-zinc-950">
                ATELIER
              </span>
            </Link>
            <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
              Високопродуктивний Headless Storefront для Shopify на базі Next.js 14 App Router, TypeScript та Tailwind CSS.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Shopify Storefront API v2024-01</span>
            </div>
          </div>

          {/* Col 2: Навігація */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Магазин
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/#catalog" className="hover:text-zinc-950 transition-colors">
                  • Весь каталог
                </Link>
              </li>
              <li>
                <Link href="/products/minimalist-leather-backpack" className="hover:text-zinc-950 transition-colors">
                  • Шкіряний рюкзак
                </Link>
              </li>
              <li>
                <Link href="/products/oversized-organic-cotton-hoodie" className="hover:text-zinc-950 transition-colors">
                  • Органічне худі
                </Link>
              </li>
              <li>
                <Link href="/products/wireless-anc-headphones" className="hover:text-zinc-950 transition-colors">
                  • Бездротові навушники
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Інформація */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Сервіс & Підтримка
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/about" className="hover:text-zinc-950 transition-colors">
                  • Про наш бренд
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Часті питання (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Умови доставки та оплати
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Гарантія та повернення
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Деплой & Інтеграція */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Деплой & Інтеграція
            </h4>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Готово до підключення будь-якого магазину Shopify та публікації у хмарі.
            </p>
            <div className="rounded-xl bg-white p-3 border border-zinc-200 text-xs text-zinc-600">
              <span className="font-semibold text-zinc-900">Готово до запуску:</span>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">Vercel</span>
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">Shopify Oxygen</span>
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-medium text-zinc-700">Netlify</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 ATELIER Headless Shopify Storefront. Розроблено на Next.js 14.</p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Mock.Shop API Integration</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Ready for Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
