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
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-950 text-emerald-400 font-black text-base tracking-wider border border-zinc-800">
                P
              </span>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight text-zinc-950">
                  PROBOARD SHOP
                </span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">
                  proboardshop.ua • dropship
                </span>
              </div>
            </Link>
            <p className="mt-3 text-xs text-zinc-600 leading-relaxed">
              Провідний магазин бордспорту та спорядження в Україні: сноуборди Nitro, Burton, Capita, кріплення Union, оптика Anon, шоломи Oakley та одяг Montec.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Офіційний дропшипінг • ЄС Склад</span>
            </div>
          </div>

          {/* Col 2: Спорядження */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Спорядження
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/#catalog" className="hover:text-zinc-950 transition-colors">
                  • Сноуборди Camber & Rocker
                </Link>
              </li>
              <li>
                <Link href="/products/nitro-team-pro-snowboard" className="hover:text-zinc-950 transition-colors">
                  • Nitro Team Pro Snowboard
                </Link>
              </li>
              <li>
                <Link href="/products/burton-custom-flying-v-snowboard" className="hover:text-zinc-950 transition-colors">
                  • Burton Custom Flying V
                </Link>
              </li>
              <li>
                <Link href="/products/union-force-bindings" className="hover:text-zinc-950 transition-colors">
                  • Кріплення Union Force
                </Link>
              </li>
              <li>
                <Link href="/products/santa-cruz-classic-dot-skateboard" className="hover:text-zinc-950 transition-colors">
                  • Скейтборди Santa Cruz
                </Link>
              </li>
              <li>
                <Link href="/products/anon-m4-toric-mfi-goggles" className="hover:text-zinc-950 transition-colors">
                  • Магнітна оптика Anon M4
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
                  • Про Proboard Shop
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-zinc-950 transition-colors">
                  • Відстеження замовлення
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Доставка Новою Поштою
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Оплата при отриманні (COD)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-950 transition-colors">
                  • Гарантія 2 роки та обмін
                </Link>
              </li>
              <li className="pt-2 border-t border-zinc-200">
                <Link href="/admin" className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1">
                  <span>⚡ Панель замовлень (CRM Admin)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Доставка та Гарантія */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3">
              Дропшипінг Логістика
            </h4>
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Пряма доставка від офіційних імпортерів без зайвих посередників.
            </p>
            <div className="rounded-2xl bg-white p-3.5 border border-zinc-200 text-xs text-zinc-600 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Нова Пошта:</span>
                <span className="text-emerald-700 font-bold">1-3 дні</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Перевірка:</span>
                <span className="text-zinc-700">Огляд до оплати</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Гарантія:</span>
                <span className="text-zinc-700">Заводський талон</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 PROBOARD SHOP (proboardshop.ua). Всі права захищено. Створено на Next.js 14.</p>
          <div className="flex items-center gap-4 font-medium">
            <span className="text-zinc-500">Live Dropship Architecture</span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">100% Original Board Gear</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
