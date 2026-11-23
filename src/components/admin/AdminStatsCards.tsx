'use client';

import React from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface AdminStatsCardsProps {
  ordersCount: number;
  newOrdersCount: number;
  totalRevenue: number;
  avgOrder: number;
}

export function AdminStatsCards({
  ordersCount,
  newOrdersCount,
  totalRevenue,
  avgOrder,
}: AdminStatsCardsProps) {
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Orders Card */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">{t.totalOrdersCount}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-zinc-950 font-mono">{ordersCount}</div>
        <span className="text-[11px] font-medium text-emerald-600">
          {newOrdersCount} {t.activeProcessing}
        </span>
      </div>

      {/* Revenue Card */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">{t.totalRevenue}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-zinc-950 font-mono">
          {formatPrice(totalRevenue, 'UAH', currency)}
        </div>
        <span className="text-[11px] font-medium text-zinc-400">
          {language === 'ua' ? 'Включаючи швидкі замовлення' : 'Including express orders'}
        </span>
      </div>

      {/* Average Check Card */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">{t.averageCheck}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-zinc-950 font-mono">
          {formatPrice(avgOrder, 'UAH', currency)}
        </div>
        <span className="text-[11px] font-medium text-zinc-400">
          {language === 'ua' ? 'На 1 клієнта' : 'Per customer'}
        </span>
      </div>

      {/* Speed / Dispatch Card */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-500">
            {language === 'ua' ? 'Швидкість відправки' : 'Fulfillment Speed'}
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 text-2xl font-black text-zinc-950">&lt; 24h</div>
        <span className="text-[11px] font-medium text-emerald-600">
          {language === 'ua' ? 'Нова Пошта COD' : 'Nova Poshta COD'}
        </span>
      </div>
    </div>
  );
}
