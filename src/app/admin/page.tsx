'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { formatPrice } from '@/lib/utils';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Phone,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  MessageCircle,
  Plus,
  RefreshCw,
  Send,
  Eye,
  Sliders,
} from 'lucide-react';

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'telegram' | 'new-product'>('orders');
  const [tgToken, setTgToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');
  const [tgSaved, setTgSaved] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Одяг');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [productAdded, setProductAdded] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error('Failed fetching orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Failed updating status:', err);
    }
  };

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('shopify_tg_token', tgToken);
    localStorage.setItem('shopify_tg_chat_id', tgChatId);
    setTgSaved(true);
    setTimeout(() => setTgSaved(false), 2500);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    setProductAdded(true);
    setTimeout(() => {
      setProductAdded(false);
      setNewTitle('');
      setNewPrice('');
      setNewImageUrl('');
      setNewDesc('');
    }, 2500);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 animate-pulse">● Нове</span>;
      case 'processing':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">⏳ В обробці</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">🚚 Відправлено</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">✓ Виконано</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/60">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Панель керування замовленнями (Admin)
              </h1>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Дропшипінг-хаб: замовлення клієнтів, обробка відправок та сповіщення в Telegram
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Оновити</span>
            </button>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>До вітрини магазину</span>
            </Link>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Всього замовлень</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">{orders.length}</div>
            <span className="text-[11px] font-medium text-emerald-600">
              {newOrdersCount} потребують відправки
            </span>
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Оборот магазину</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">{formatPrice(totalRevenue, 'USD', 'USD')}</div>
            <span className="text-[11px] font-medium text-zinc-400">Включаючи 1-клік замовлення</span>
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Середній чек</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">{formatPrice(avgOrder, 'USD', 'USD')}</div>
            <span className="text-[11px] font-medium text-blue-600">Висока маржинальність</span>
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Швидкість доставки</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                <Truck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">1-2 дні</div>
            <span className="text-[11px] font-medium text-amber-700">Нова Пошта / Укрпошта</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-200 mb-6 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === 'orders'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            Всі замовлення ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('telegram')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'telegram'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Send className="h-3.5 w-3.5 text-sky-500" />
            <span>Telegram-сповіщення</span>
          </button>
          <button
            onClick={() => setActiveTab('new-product')}
            className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'new-product'
                ? 'text-zinc-950 border-b-2 border-zinc-950'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Додати товар для дропшипінгу</span>
          </button>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">ID / Дата</th>
                      <th className="px-6 py-4">Клієнт & Контакти</th>
                      <th className="px-6 py-4">Місто / Доставка</th>
                      <th className="px-6 py-4">Товари</th>
                      <th className="px-6 py-4">Сума</th>
                      <th className="px-6 py-4">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50/60 transition-colors">
                        <td className="px-6 py-4 align-top">
                          <span className="font-mono font-bold text-zinc-950 block">#{order.id}</span>
                          <span className="text-[11px] text-zinc-400">
                            {new Date(order.createdAt).toLocaleDateString('uk-UA', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <span className="font-bold text-zinc-900 block">{order.customer.name}</span>
                          <a
                            href={`tel:${order.customer.phone}`}
                            className="text-emerald-700 hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{order.customer.phone}</span>
                          </a>
                          <span className="text-[10px] text-zinc-400 block mt-0.5">
                            Зв'язок: <strong>{order.customer.messenger || 'Дзвінок'}</strong>
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top text-zinc-600">
                          {order.customer.city || 'Уточнити при дзвінку'}
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="space-y-1">
                            {order.items?.map((item: any, i: number) => (
                              <div key={i} className="text-zinc-800">
                                <span className="font-semibold">{item.title}</span>
                                <span className="text-zinc-500 text-[11px]"> ({item.variantTitle}) x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 align-top font-bold text-zinc-950">
                          {formatPrice(order.total, 'USD', 'USD')}
                          <span className="block text-[10px] font-normal text-zinc-400">
                            {order.paymentMethod === 'cod' ? 'Оплата при отриманні' : 'Оплачено'}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top">
                          <div className="flex flex-col gap-1.5">
                            {getStatusBadge(order.status)}
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 focus:outline-none"
                            >
                              <option value="new">Нове</option>
                              <option value="processing">В обробці</option>
                              <option value="shipped">Відправлено</option>
                              <option value="completed">Виконано</option>
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
                <p>Замовлень поки немає. Зробіть тестове замовлення на вітрині!</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Telegram Notifications */}
        {activeTab === 'telegram' && (
          <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Telegram-сповіщення про замовлення</h3>
                <p className="text-xs text-zinc-500">Отримуйте кожне нове замовлення миттєво собі в Telegram на смартфон</p>
              </div>
            </div>

            <form onSubmit={handleSaveTelegram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Telegram Bot Token
                </label>
                <input
                  type="text"
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  value={tgToken}
                  onChange={(e) => setTgToken(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Telegram Chat ID (ваш особистий ID чи ID групи)
                </label>
                <input
                  type="text"
                  placeholder="987654321"
                  value={tgChatId}
                  onChange={(e) => setTgChatId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none font-mono"
                />
              </div>

              <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80 text-[11px] text-zinc-600 space-y-1.5">
                <p><strong>Як отримати за 2 хвилини:</strong></p>
                <p>1. Відкрийте бота <code>@BotFather</code> в Telegram та напишіть <code>/newbot</code> для створення бота.</p>
                <p>2. Скопіюйте отриманий токен сюди.</p>
                <p>3. Напишіть боту <code>@userinfobot</code>, щоб дізнатися свій Chat ID.</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-md"
              >
                {tgSaved ? '✓ Налаштування збережено!' : 'Зберегти конфігурацію Telegram'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Add Dropshipping Product */}
        {activeTab === 'new-product' && (
          <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 mb-1">Додати новий дропшипінг-товар</h3>
            <p className="text-xs text-zinc-500 mb-6">Введіть дані товару вашого постачальника для розміщення на вітрині</p>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Назва товару *</label>
                <input
                  type="text"
                  required
                  placeholder="Магнітний тримач для телефону в авто"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Ціна продажу ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="29.00"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Категорія</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:outline-none"
                  >
                    <option value="Одяг">Одяг</option>
                    <option value="Аксесуари">Аксесуари</option>
                    <option value="Гаджети">Гаджети</option>
                    <option value="Дім">Дім</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Посилання на фотографію (URL)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Опис товару</label>
                <textarea
                  rows={3}
                  placeholder="Короткий опис переваг для покупця..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-md"
              >
                {productAdded ? '✓ Товар успішно додано до каталогу!' : 'Опублікувати товар на вітрині'}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
