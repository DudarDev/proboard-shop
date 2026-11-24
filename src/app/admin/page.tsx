'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { AdminStatsCards } from '@/components/admin/AdminStatsCards';
import { AdminOrdersTable } from '@/components/admin/AdminOrdersTable';
import {
  Package,
  Send,
  Plus,
  RefreshCw,
  Eye,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export default function AdminPage() {
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  const [adminKey, setAdminKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'telegram' | 'new-product'>('orders');

  // Telegram settings
  const [tgToken, setTgToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');
  const [tgSaved, setTgSaved] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('Snowboard');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [productAdded, setProductAdded] = useState(false);

  const verifyAndLoad = async (key: string): Promise<boolean> => {
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
        setAuthError(
          language === 'ua'
            ? 'Невірний ключ адміністратора (401 Unauthorized)'
            : 'Invalid Admin Key (401 Unauthorized)'
        );
        return false;
      }

      if (res.status === 429) {
        setAuthError(
          language === 'ua'
            ? 'Забагато спроб. Зачекайте 1 хвилину (Rate limit exceeded)'
            : 'Too many requests. Please wait 1 minute.'
        );
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
        setAuthError(data.error || 'Access denied');
        return false;
      }
    } catch {
      setAuthError(
        language === 'ua'
          ? 'Помилка підключення до сервера'
          : 'Server connection error'
      );
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

  const handleLogout = () => {
    sessionStorage.removeItem('admin_api_key');
    setAdminKey('');
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
        setAuthError(
          language === 'ua'
            ? 'Сесія завершена. Будь ласка, введіть ключ знову.'
            : 'Session expired. Please log in again.'
        );
        return;
      }

      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
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
        setAuthError(
          language === 'ua'
            ? 'Сесія завершена. Будь ласка, введіть ключ знову.'
            : 'Session expired. Please log in again.'
        );
        return;
      }

      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert(`Error: ${data.error}`);
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
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (Number(o.total) || 0),
    0
  );
  const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50/70 w-full max-w-full overflow-x-clip">
      <Navbar />

      {!isAuthenticated ? (
        <AdminAuthGate
          onLogin={verifyAndLoad}
          isVerifying={isVerifying}
          authError={authError}
        />
      ) : (
        <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full max-w-full overflow-x-clip">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                  {t.adminTitle}
                </h1>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {t.adminSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-200/60">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {language === 'ua' ? 'Авторизовано' : 'Authorized'}
              </span>

              <button
                onClick={fetchOrders}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{language === 'ua' ? 'Оновити' : 'Refresh'}</span>
              </button>

              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{language === 'ua' ? 'До вітрини' : 'Storefront'}</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Log out"
                className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>{t.logoutBtn}</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <AdminStatsCards
            ordersCount={orders.length}
            newOrdersCount={newOrdersCount}
            totalRevenue={totalRevenue}
            avgOrder={avgOrder}
          />

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
              <span>
                {t.ordersTab} ({orders.length})
              </span>
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
              <span>{t.telegramTab}</span>
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
              <span>
                {language === 'ua' ? 'Додати товар постачальника' : 'Add Supplier Product'}
              </span>
            </button>
          </div>

          {/* Tab 1: Orders Table */}
          {activeTab === 'orders' && (
            <AdminOrdersTable
              orders={orders}
              onStatusChange={handleStatusChange}
            />
          )}

          {/* Tab 2: Telegram Notifications */}
          {activeTab === 'telegram' && (
            <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-950">
                    {language === 'ua'
                      ? 'Telegram-сповіщення про замовлення'
                      : 'Telegram Order Notifications'}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {language === 'ua'
                      ? 'Отримуйте кожне нове замовлення миттєво собі в Telegram на смартфон'
                      : 'Receive instant notifications on every new order directly to your phone'}
                  </p>
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
                    Telegram Chat ID
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
                  <p><strong>{language === 'ua' ? 'Як налаштувати:' : 'How to setup:'}</strong></p>
                  <p>1. Open <code>@BotFather</code> in Telegram & type <code>/newbot</code>.</p>
                  <p>2. Copy the token here.</p>
                  <p>3. Message <code>@userinfobot</code> to get your Chat ID.</p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-md"
                >
                  {tgSaved
                    ? language === 'ua'
                      ? '✓ Налаштування збережено!'
                      : '✓ Saved!'
                    : language === 'ua'
                    ? 'Зберегти конфігурацію Telegram'
                    : 'Save Telegram Configuration'}
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Add Supplier Product */}
          {activeTab === 'new-product' && (
            <div className="max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-950 mb-1">
                {language === 'ua'
                  ? 'Додати новий товар постачальника'
                  : 'Add New Supplier Product'}
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                {language === 'ua'
                  ? 'Введіть дані товару вашого постачальника для розміщення на вітрині'
                  : 'Enter supplier product details for storefront catalog'}
              </p>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'ua' ? 'Назва товару *' : 'Product Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Capita Super DOA Snowboard"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'ua' ? 'Ціна продажу ($) *' : 'Selling Price ($) *'}
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="649.95"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'ua' ? 'Категорія' : 'Category'}
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:outline-none"
                    >
                      <option value="Snowboards">Snowboards</option>
                      <option value="Boots">Boots</option>
                      <option value="Bindings">Bindings</option>
                      <option value="Goggles">Goggles</option>
                      <option value="Helmets">Helmets</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'ua' ? 'Посилання на фотографію (URL)' : 'Image URL'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {language === 'ua' ? 'Опис товару' : 'Product Description'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      language === 'ua'
                        ? 'Опис переваг, жорсткості, прогину...'
                        : 'Key features, flex, profile...'
                    }
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-md"
                >
                  {productAdded
                    ? language === 'ua'
                      ? '✓ Товар додано!'
                      : '✓ Product added!'
                    : language === 'ua'
                    ? 'Опублікувати товар на вітрині'
                    : 'Publish Product'}
                </button>
              </form>
            </div>
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}
