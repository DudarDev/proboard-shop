'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Settings2, Search, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { CURRENCY_RATES } from '@/lib/utils';

interface NavbarProps {
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
}

export function Navbar({ onSearchChange, searchQuery = '' }: NavbarProps) {
  const { totalCount, toggleCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { storeDomain, setIsSettingsOpen, currency, setCurrency } = useConfig();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm tracking-wider shadow-sm">
              S
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 leading-none">
                ATELIER
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase mt-0.5">
                Headless Shopify
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-zinc-600">
            <Link href="/#catalog" className="hover:text-zinc-950 transition-colors">
              Каталог
            </Link>
            <Link href="/about" className="hover:text-zinc-950 transition-colors">
              Про бренд
            </Link>
            <Link href="/track-order" className="hover:text-zinc-950 transition-colors">
              Відстеження
            </Link>
            <Link href="/contact" className="hover:text-zinc-950 transition-colors">
              Контакти & FAQ
            </Link>
          </nav>

          {/* Status Badge */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hidden xl:flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            title="Натисніть для налаштування підключення до вашого Shopify магазину"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {storeDomain ? storeDomain : 'Shopify Mock API'}
            </span>
            <Settings2 className="h-3 w-3 ml-0.5 opacity-60" />
          </button>
        </div>

        {/* Search Bar (if search handler provided) */}
        {onSearchChange && (
          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Пошук товарів (рюкзак, худі, годинник...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/70 pl-10 pr-4 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-all"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none rounded-xl border border-zinc-200 bg-white/90 pl-2.5 pr-6 py-1.5 text-xs font-bold text-zinc-700 hover:border-zinc-300 focus:outline-none cursor-pointer shadow-sm"
              title="Змінити валюту магазину"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 text-[10px] text-zinc-400">▾</span>
          </div>

          {/* Settings button on mobile */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100"
            aria-label="Налаштування Shopify"
          >
            <Settings2 className="h-5 w-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative flex items-center justify-center h-9 w-9 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-rose-500 transition-colors shadow-sm"
            title="Обране"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow hover:bg-zinc-800 active:scale-95 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Кошик</span>
            {totalCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">
                {totalCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Search */}
      {onSearchChange && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Пошук у каталозі..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
