'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatPrice } from '@/lib/utils';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        const cleanQ = query.trim().toUpperCase().replace('#', '');
        const found = data.orders.find(
          (o: any) =>
            o.id.toUpperCase().includes(cleanQ) ||
            o.customer.phone.replace(/[^0-9]/g, '').includes(cleanQ.replace(/[^0-9]/g, ''))
        );
        setOrder(found || null);
      }
    } catch (err) {
      console.error('Failed to search order:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (status: string, stepIndex: number) => {
    const statuses = ['new', 'processing', 'shipped', 'completed'];
    const currentIdx = statuses.indexOf(status);
    if (currentIdx >= stepIndex) return 'completed';
    if (currentIdx === stepIndex - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/50 w-full max-w-full overflow-x-clip">
      <Navbar />

      <main className="flex-1 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 w-full max-w-full overflow-x-clip">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
            Служба логістики
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Відстеження статусу замовлення
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Введіть номер вашого замовлення (наприклад, <strong>ORD-10492</strong>) або номер телефону, вказаний при покупці.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Номер замовлення або телефон (+380...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 py-3.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-zinc-900 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Пошук...' : 'Перевірити'}
            </button>
          </form>

          {/* Quick example click */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <span>Приклад для тесту:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('ORD-10492');
              }}
              className="font-mono font-semibold text-emerald-700 hover:underline"
            >
              #ORD-10492
            </button>
          </div>
        </div>

        {/* Result Area */}
        {order ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-lg animate-in fade-in duration-300">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-100 gap-3">
              <div>
                <span className="text-xs text-zinc-400">Замовлення</span>
                <h3 className="text-xl font-bold font-mono text-zinc-950">#{order.id}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Дата:</span>
                <span className="text-xs font-semibold text-zinc-800">
                  {new Date(order.createdAt).toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="my-10">
              <div className="grid grid-cols-4 gap-2 relative">
                
                {/* Step 1 */}
                <div className="text-center flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
                      getStepStatus(order.status, 0) === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Прийнято</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">Оформлено онлайн</span>
                </div>

                {/* Step 2 */}
                <div className="text-center flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
                      getStepStatus(order.status, 1) === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : getStepStatus(order.status, 1) === 'current'
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Зібрано</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">На складі</span>
                </div>

                {/* Step 3 */}
                <div className="text-center flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
                      getStepStatus(order.status, 2) === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : getStepStatus(order.status, 2) === 'current'
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">В дорозі</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">Передано пошті</span>
                </div>

                {/* Step 4 */}
                <div className="text-center flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
                      getStepStatus(order.status, 3) === 'completed'
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Доставлено</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">У відділенні</span>
                </div>

              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
              {/* Delivery info */}
              <div className="rounded-2xl bg-zinc-50 p-5 border border-zinc-200/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  <span>Дані одержувача</span>
                </h4>
                <div className="space-y-1.5 text-xs text-zinc-600">
                  <p>👤 <strong>ПІБ:</strong> {order.customer.name}</p>
                  <p>📞 <strong>Телефон:</strong> {order.customer.phone}</p>
                  <p>📍 <strong>Адреса доставки:</strong> {order.customer.city || 'Уточнено менеджером'}</p>
                  <p>💳 <strong>Оплата:</strong> {order.paymentMethod === 'cod' ? 'Накладений платіж (при отриманні)' : 'Оплачено онлайн'}</p>
                </div>
              </div>

              {/* Items in order */}
              <div className="rounded-2xl bg-zinc-50 p-5 border border-zinc-200/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-3 flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-emerald-600" />
                  <span>Склад посилки</span>
                </h4>
                <div className="divide-y divide-zinc-200/60 text-xs">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="py-2 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-zinc-900 block">{item.title}</span>
                        <span className="text-[11px] text-zinc-400">{item.variantTitle} × {item.quantity} шт.</span>
                      </div>
                      <span className="font-bold text-zinc-900">
                        {formatPrice(item.price * item.quantity, 'USD', 'USD')}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 flex justify-between font-bold text-sm text-zinc-950">
                    <span>Разом до сплати:</span>
                    <span>{formatPrice(order.total, 'USD', 'USD')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : searched && !loading ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center bg-white shadow-sm">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900">Замовлення не знайдено</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm mx-auto">
              Перевірте правильність написання номера замовлення або номера телефону. Якщо ви щойно оформили замовлення, воно з'явиться протягом 1 хвилини.
            </p>
          </div>
        ) : null}

        {/* Need Help Banner */}
        <div className="mt-12 rounded-2xl border border-zinc-200/80 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">Потрібна допомога з посилкою?</h4>
              <p className="text-[11px] text-zinc-500">Наша служба підтримки працює без вихідних з 9:00 до 20:00</p>
            </div>
          </div>
          <a
            href="tel:+380800500240"
            className="rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm whitespace-nowrap"
          >
            Зателефонувати: +380 (800) 500-240
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
