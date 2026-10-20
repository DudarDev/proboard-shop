'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sparkles, Shield, HeartHandshake, Leaf, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f7f64_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Філософія бренду ATELIER</span>
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Створено для тих, хто цінує досконалість у деталях
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              Ми створюємо сучасні предмети гардеробу та аксесуари поза часом. Поєднуємо нордичну функціональність, відбірні натуральні матеріали та інноваційну архітектуру онлайн-покупок.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950">
              Наші цінності та стандарти
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Кожна річ у нашій колекції відповідає трьом непорушним принципам:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">Безкомпромісна якість</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Італійська шкіра повного зерна, фурнітура YKK з антикорозійним покриттям, органічна бавовна високої щільності. Речі, які служать роками і з часом набувають благородного вигляду.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
                <Leaf className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">Відповідальне виробництво</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Ми відмовилися від одноразового пластику у пакуванні на 100%. Працюємо тільки з фабриками, які дотримуються суворих екологічних директив та забезпечують гідні умови праці.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white mb-6">
                <HeartHandshake className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">Чесний сервіс</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                30 днів на повернення без зайвих запитань, 2 роки гарантійного обслуговування та відкрита комунікація з кожним клієнтом у будь-який час доби.
              </p>
            </div>
          </div>
        </div>

        {/* Numbers & Impact */}
        <div className="bg-zinc-50 border-y border-zinc-200 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-zinc-950">10k+</span>
                <span className="mt-2 block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Задоволених клієнтів
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-zinc-950">4.9★</span>
                <span className="mt-2 block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Середній рейтинг
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-zinc-950">100%</span>
                <span className="mt-2 block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Еко-пакування
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-zinc-950">24 міс.</span>
                <span className="mt-2 block text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Офіційна гарантія
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-zinc-950 sm:text-4xl">
            Готові оновити свій стиль?
          </h2>
          <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
            Ознайомтеся з нашою актуальною колекцією преміальних аксесуарів та одягу з доставкою по всій країні.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 text-xs font-bold text-white shadow-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
            >
              <span>Переглянути весь каталог</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
