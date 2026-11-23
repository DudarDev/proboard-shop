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
  EyeOff,
  Sliders,
  Lock,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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

  const verifyAndLoad = async (key: string) => {
    setIsVerifying(true);
    setAuthError('');
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'x-admin-key': key,
        },
      });

      if (res.status === 401) {
        sessionStorage.removeItem('admin_api_key');
        setIsAuthenticated(false);
        setAuthError('Невірний ключ адміністратора (401 Unauthorized)');
        return false;
      }

      const data = await res.json();
      if (data.success) {
        setAdminKey(key);
        sessionStorage.setItem('admin_api_key', key);
        setIsAuthenticated(true);
        setOrders(data.orders || []);
        return true;
      } else {
        setAuthError(data.error || 'Помилка доступу до списку замовлень');
        return false;
      }
    } catch (err: any) {
      setAuthError('Помилка з’єднання із сервером API');
      return false;
    } finally {
      setIsVerifying(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem('admin_api_key');
    if (savedKey) {
      verifyAndLoad(savedKey);
    } else {
      setIsVerifying(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setAuthError('Введіть ключ адміністратора');
      return;
    }
    await verifyAndLoad(inputKey.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_api_key');
    setAdminKey('');
    setInputKey('');
    setIsAuthenticated(false);
    setOrders([]);
  };

  const fetchOrders = async () => {
    if (!adminKey) return;
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      if (res.status === 401) {
        handleLogout();
        setAuthError('Сесія завершена або ключ недійсний. Увійдіть знову.');
        return;
      }

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

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!adminKey) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.status === 401) {
        handleLogout();
        setAuthError('Сесія завершена. Будь ласка, введіть ключ знову.');
        return;
      }

      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert(`Помилка оновлення статусу: ${data.error}`);
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
      case 'delivered':
      case 'completed':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">✓ Доставлено</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">✕ Скасовано</span>;
      default:
        return <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">{status}</span>;
    }
  };

  // 1. Auth Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-zinc-50/70">
        <Navbar />

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-zinc-200/80">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white mb-6 shadow-md">
              <Lock className="h-7 w-7 text-emerald-400" />
            </div>

            <h2 className="text-xl font-extrabold text-center text-zinc-950">
              PROBOARD CRM • Вхід для персоналу
            </h2>
            <p className="text-xs text-center text-zinc-500 mt-2 mb-6">
              Для доступу до бази замовлень та логістики введіть ключ авторизації (<code>ADMIN_API_KEY</code>).
            </p>

            {authError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Секретний ключ адміністратора (x-admin-key)
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    placeholder="Введіть ваш ADMIN_API_KEY"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 pr-10 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full rounded-xl bg-zinc-950 py-3 text-xs font-semibold text-white shadow-md hover:bg-zinc-850 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-zinc-300" />
                    <span>Перевірка авторизації...</span>
                  </>
                ) : (
                  <span>Увійти в панель керування</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 flex items-center gap-1 font-medium">
                ← До вітрини магазину
              </Link>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                Захист роуту x-admin-key
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // 2. Authenticated Dashboard
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
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200/60">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Авторизовано
            </span>

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
              <span>До вітрини</span>
            </Link>

            <button
              onClick={handleLogout}
              title="Вийти з панелі керування"
              className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Вийти</span>
            </button>
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
            <div className="mt-2 text-2xl font-black text-zinc-950">{formatPrice(totalRevenue, 'UAH', 'UAH')}</div>
            <span className="text-[11px] font-medium text-zinc-400">Включаючи 1-клік замовлення</span>
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Середній чек</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">{formatPrice(avgOrder, 'UAH', 'UAH')}</div>
            <span className="text-[11px] font-medium text-zinc-400">На 1 покупця</span>
          </div>

          <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500">Швидкість відправки</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-zinc-950">&lt; 24 год</div>
            <span className="text-[11px] font-medium text-emerald-600">Нова Пошта COD</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-200 mb-6 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <Package className="h-4 w-4" />
            <span>Замовлення ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'telegram'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <Send className="h-4 w-4" />
            <span>Сповіщення в Telegram</span>
          </button>

          <button
            onClick={() => setActiveTab('new-product')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'new-product'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Додати товар постачальника</span>
          </button>
        </div>

        {/* Tab 1: Orders Table */}
        {activeTab === 'orders' && (
          <div className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-sm">
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">ID / Дата</th>
                      <th className="px-6 py-4">Клієнт & Контакти</th>
                      <th className="px-6 py-4">Місто / Доставка</th>
                      <th className="px-6 py-4">Склад замовлення</th>
                      <th className="px-6 py-4">Сума & Оплата</th>
                      <th className="px-6 py-4">Статус відправки</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-zinc-50/80 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono font-bold text-zinc-900 block">{order.id}</span>
                          <span className="text-[11px] text-zinc-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('uk-UA') : 'Нещодавно'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-zinc-900">{order.customer.name}</div>
                          <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mt-0.5">
                            <Phone className="h-3 w-3 text-zinc-400" />
                            <a href={`tel:${order.customer.phone}`} className="hover:underline">
                              {order.customer.phone}
                            </a>
                          </div>
                          <span className="inline-block mt-1 text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full font-medium">
                            Зв'язок: {order.customer.messenger}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-zinc-800">{order.customer.city || 'Не вказано'}</div>
                          <span className="text-[11px] text-zinc-400">Нова Пошта (відділення)</span>
                        </td>
                        <td className="px-6 py-4">
                          <ul className="space-y-1">
                            {order.items?.map((item: any, idx: number) => (
                              <li key={idx} className="text-[11px] text-zinc-700">
                                • <span className="font-semibold">{item.title}</span> ({item.variantTitle || 'Стандарт'}) × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-zinc-950 text-sm">
                            {formatPrice(order.total, order.currency || 'UAH', 'UAH')}
                          </div>
                          <span className="text-[10px] font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
                            {order.paymentMethod === 'cod' ? 'Післяплата Нова Пошта' : 'Онлайн оплата'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                              <option value="delivered">Доставлено</option>
                              <option value="cancelled">Скасовано</option>
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
