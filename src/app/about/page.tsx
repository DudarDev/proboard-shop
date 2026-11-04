'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sparkles, Shield, HeartHandshake, Compass, ArrowRight, Flame, Award, Truck, Ruler } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32 text-white">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 mb-6 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
              <span>Історія та філософія PROBOARD SHOP</span>
            </span>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Створено райдерами для тих, хто живе горами та вулицями
            </h1>

            <p className="mt-6 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              <strong>PROBOARD SHOP</strong> (proboardshop.ua) — перший в Україні технологічний дропшипінг-стор бордспорту. Ми об’єднали пряму логістику з найбільших європейських складів, швидку доставку Новою Поштою та бездоганний сервіс підбору ростовок.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-zinc-950">
              Чому райдери обирають Proboard
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Ми зняли всі ризики замовлення спорядження через інтернет:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white mb-6">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">100% Оригінальність брендів</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Тільки автентичне спорядження з заводськими серійними номерами від офіційних дистриб'юторів Nitro, Burton, Capita, Union, Anon та Oakley в Європі. Жодних копій чи реплік.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white mb-6">
                <Ruler className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">Точний підбір ростовки</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Наш інтерактивний калькулятор ростовки враховує вашу вагу, зріст, стиль катання та розмір взуття для визначення потреби у Wide версії. Якщо розмір не підійшов — безкоштовний обмін за 14 днів.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/90 p-8 bg-zinc-50/50 hover:shadow-lg transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white mb-6">
                <HeartHandshake className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-2">Оплата після огляду (COD)</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Відправляємо Новою Поштою накладеним платежем без жодної передоплати. Ви відкриваєте посилку у відділенні, перевіряєте канти, базу та комплектність, і тільки потім оплачуєте.
              </p>
            </div>
          </div>
        </div>

        {/* Numbers & Impact */}
        <div className="bg-zinc-950 border-y border-zinc-800 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-emerald-400">12k+</span>
                <span className="mt-2 block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Райдерів на наших дошках
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-emerald-400">1-3 дні</span>
                <span className="mt-2 block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Доставка Новою Поштою
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-emerald-400">100%</span>
                <span className="mt-2 block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Оригінал зі складу ЄС
                </span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-emerald-400">24 міс.</span>
                <span className="mt-2 block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Офіційна гарантія брендів
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-zinc-950 sm:text-4xl">
            Готові відкрити новий сноубордичний сезон?
          </h2>
          <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
            Оберіть свою нову дошку, кріплення або оптики у нашому каталозі з офіційною гарантією 2 роки.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-8 py-4 text-sm font-bold text-white shadow-xl hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95"
            >
              <span>Переглянути спорядження</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
