'use client';

import React, { useState } from 'react';
import { Package, Phone } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface OrderItem {
  title: string;
  variantTitle?: string;
  quantity: number;
  price?: { amount: string; currencyCode: string };
}

interface Order {
  id: string;
  createdAt?: string;
  customer: {
    name: string;
    phone: string;
    city?: string;
    messenger?: string;
  };
  items: OrderItem[];
  total: number | string;
  currency?: string;
  paymentMethod?: string;
  status: string;
}

interface AdminOrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: string) => void;
}

export function AdminOrdersTable({ orders, onStatusChange }: AdminOrdersTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 animate-pulse">
            ● {language === 'ua' ? 'Нове' : 'New'}
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            ⏳ {language === 'ua' ? 'В обробці' : 'Processing'}
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            🚚 {language === 'ua' ? 'Відправлено' : 'Shipped'}
          </span>
        );
      case 'delivered':
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            ✓ {language === 'ua' ? 'Доставлено' : 'Delivered'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
            ✕ {language === 'ua' ? 'Скасовано' : 'Cancelled'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'new', 'processing', 'shipped', 'delivered', 'cancelled'].map((statusKey) => {
          const count =
            statusKey === 'all'
              ? orders.length
              : orders.filter((o) => o.status === statusKey).length;
          const label =
            statusKey === 'all'
              ? t.statusAll
              : statusKey === 'new'
              ? language === 'ua' ? 'Нові' : 'New'
              : statusKey === 'processing'
              ? language === 'ua' ? 'В обробці' : 'Processing'
              : statusKey === 'shipped'
              ? language === 'ua' ? 'Відправлені' : 'Shipped'
              : statusKey === 'delivered'
              ? language === 'ua' ? 'Доставлені' : 'Delivered'
              : language === 'ua' ? 'Скасовані' : 'Cancelled';

          return (
            <button
              key={statusKey}
              onClick={() => setFilterStatus(statusKey)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                filterStatus === statusKey
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Table */}
      <div className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-sm">
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">{t.orderIdCol} / {t.dateCol}</th>
                  <th className="px-6 py-4">{t.clientCol}</th>
                  <th className="px-6 py-4">{t.deliveryCol}</th>
                  <th className="px-6 py-4">{t.itemsCol}</th>
                  <th className="px-6 py-4">{t.totalCol}</th>
                  <th className="px-6 py-4">{t.statusCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-zinc-900 block">{order.id}</span>
                      <span className="text-[11px] text-zinc-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              language === 'ua' ? 'uk-UA' : 'en-US'
                            )
                          : language === 'ua' ? 'Нещодавно' : 'Recent'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900">{order.customer.name}</div>
                      <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mt-0.5">
                        <Phone className="h-3 w-3 text-zinc-400" />
                        <a href={`tel:${order.customer.phone}`} className="hover:underline font-mono">
                          {order.customer.phone}
                        </a>
                      </div>
                      {order.customer.messenger && (
                        <span className="inline-block mt-1 text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">
                          {language === 'ua' ? "Зв'язок:" : 'Channel:'} {order.customer.messenger}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-800">
                        {order.customer.city || (language === 'ua' ? 'Не вказано' : 'Not specified')}
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {language === 'ua' ? 'Нова Пошта (відділення)' : 'Nova Poshta branch'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="space-y-1">
                        {order.items?.map((item: OrderItem, idx: number) => (
                          <li key={idx} className="text-[11px] text-zinc-700">
                            • <span className="font-semibold">{item.title}</span> (
                            {item.variantTitle || (language === 'ua' ? 'Стандарт' : 'Standard')}) ×{' '}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-zinc-950 text-sm font-mono">
                        {formatPrice(order.total, order.currency || 'UAH', currency)}
                      </div>
                      <span className="text-[10px] font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                        {order.paymentMethod === 'cod'
                          ? language === 'ua'
                            ? 'Післяплата Нова Пошта'
                            : 'Nova Poshta COD'
                          : language === 'ua'
                          ? 'Онлайн оплата'
                          : 'Online Paid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        {getStatusBadge(order.status)}
                        <select
                          value={order.status}
                          onChange={(e) => onStatusChange(order.id, e.target.value)}
                          className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 focus:outline-none"
                        >
                          <option value="new">{language === 'ua' ? 'Нове' : 'New'}</option>
                          <option value="processing">{language === 'ua' ? 'В обробці' : 'Processing'}</option>
                          <option value="shipped">{language === 'ua' ? 'Відправлено' : 'Shipped'}</option>
                          <option value="delivered">{language === 'ua' ? 'Доставлено' : 'Delivered'}</option>
                          <option value="cancelled">{language === 'ua' ? 'Скасовано' : 'Cancelled'}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-400">
            <Package className="h-10 w-10 mx-auto mb-2 text-zinc-300" />
            <p>
              {language === 'ua'
                ? 'Замовлень у цій категорії немає.'
                : 'No orders found in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
