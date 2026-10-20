'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, Package, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('SH-89421');

  useEffect(() => {
    setOrderNumber(`SH-${Math.floor(10000 + Math.random() * 90000)}`);
  }, []);

  const demoItems = FALLBACK_PRODUCTS.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 w-full">
        <div className="rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-10 shadow-xl text-center">
          
          {/* Badge & Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
            <Sparkles className="h-3 w-3" />
            <span>Оплата успешно подтверждена</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Спасибо за ваш заказ!
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Номер вашего заказа: <strong className="text-zinc-900 font-mono">{orderNumber}</strong>. Мы отправили подтверждение и трек-номер на вашу почту.
          </p>

          {/* Order Details Card */}
          <div className="mt-10 rounded-2xl bg-zinc-50 p-6 text-left border border-zinc-200/80">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Состав заказа
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                Оплачено онлайн (Shopify Payments)
              </span>
            </div>

            <div className="divide-y divide-zinc-200/60 my-2">
              {demoItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.featuredImage?.url}
                      alt={item.title}
                      className="h-12 w-12 rounded-xl object-cover border border-zinc-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{item.title}</h4>
                      <p className="text-[11px] text-zinc-500">1 шт. • Стандартный вариант</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-zinc-900">
                    {formatPrice(item.priceRange?.minVariantPrice.amount || '0')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
              <span>Примерная дата доставки:</span>
              <strong className="text-zinc-900 font-medium">Через 2-3 рабочих дня</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3.5 text-xs font-semibold text-white hover:bg-zinc-800 shadow-md transition-all"
            >
              <Package className="h-4 w-4" />
              <span>Вернуться в магазин</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Printer className="h-4 w-4" />
              <span>Распечатать чек</span>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
