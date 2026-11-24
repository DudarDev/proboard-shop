'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Settings2, Search, Heart, Ruler, Percent } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { CURRENCY_RATES } from '@/lib/utils';
import { TRANSLATIONS } from '@/lib/translations';

interface NavbarProps {
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
  onOpenCalculator?: () => void;
  onSelectCategory?: (cat: string) => void;
}

export function Navbar({ onSearchChange, searchQuery = '', onOpenCalculator, onSelectCategory }: NavbarProps) {
  const { totalCount, toggleCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { setIsSettingsOpen, currency, setCurrency, language, setLanguage } = useConfig();
  const t = TRANSLATIONS[language];

  const handleNavClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
      const catalog = document.getElementById('catalog');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-sm transition-all">
      {/* 1. Main Header Bar: Single-row, vertically centered, zero horizontal overflow */}
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-2 sm:gap-4 w-full">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center bg-zinc-950 text-white font-black text-lg sm:text-xl tracking-tighter group-hover:bg-emerald-600 transition-colors">
            P
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-black text-lg sm:text-xl tracking-tighter text-zinc-950 uppercase">
                PROBOARD
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white bg-zinc-950 px-1 py-0.5">
                SHOP
              </span>
            </div>
            <span className="hidden sm:block text-[9px] font-black tracking-widest text-zinc-400 uppercase mt-0.5">
              PREMIUM BOARDSPORTS STORE
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop Only */}
        {onSearchChange && (
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full border border-zinc-300 bg-zinc-50/80 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-all"
              />
              <button
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-zinc-950 px-3.5 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center"
                aria-label="Пошук"
              >
                <Search className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Right Actions: Compact on mobile, rich on desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Board Size Calculator Pill (Desktop Only) */}
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="hidden xl:flex items-center gap-1.5 text-zinc-800 hover:text-black bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all"
              title="Підібрати ростовку сноуборду онлайн"
            >
              <Ruler className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t.sizeCalculator}</span>
            </button>
          )}

          {/* Language Switcher (UA / EN) */}
          <div className="flex items-center border border-zinc-300 bg-zinc-50 overflow-hidden text-[11px] sm:text-xs font-black">
            <button
              type="button"
              onClick={() => setLanguage('ua')}
              className={`px-1.5 sm:px-2 py-1 transition-colors ${
                language === 'ua'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
              title="Українська версія"
            >
              UA
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-1.5 sm:px-2 py-1 transition-colors ${
                language === 'en'
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
              title="English version"
            >
              EN
            </button>
          </div>

          {/* Currency Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none border border-zinc-300 bg-white pl-2 pr-5 sm:pl-2.5 sm:pr-6 py-1 text-[11px] sm:text-xs font-black uppercase text-zinc-800 hover:border-zinc-400 focus:outline-none cursor-pointer"
              title="Змінити валюту"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 text-[9px] text-zinc-400">▾</span>
          </div>

          {/* Settings button - Hidden on mobile, present in Bottom Tab Bar */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="hidden md:flex p-1.5 text-zinc-600 hover:text-zinc-950 border border-transparent hover:border-zinc-200 transition-colors"
            title="Shopify Credentials"
            aria-label="Settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Wishlist Button - Hidden on mobile, present in Bottom Tab Bar */}
          <button
            onClick={openWishlist}
            className="hidden md:flex relative items-center justify-center h-8 w-8 border border-zinc-200 bg-white text-zinc-700 hover:text-rose-500 hover:border-zinc-300 transition-colors"
            title="Обране"
            aria-label="Wishlist"
          >
            <Heart className="h-3.5 w-3.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-rose-500 text-[9px] font-black text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger: Mobile (Icon + Badge only, no heavy text) */}
          <button
            onClick={toggleCart}
            className="md:hidden relative flex items-center justify-center h-9 w-9 bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
            aria-label="Кошик"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-black text-zinc-950 shadow-sm">
                {totalCount}
              </span>
            )}
          </button>

          {/* Cart Trigger: Desktop (Full text + count) */}
          <button
            onClick={toggleCart}
            className="hidden md:flex relative items-center gap-1.5 bg-zinc-950 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.cart} ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* 2. Sub Navigation Bar - Category Strip with Smooth Horizontal Scroll & Right Edge Fade Mask */}
      <div className="relative w-full border-t border-zinc-200 bg-zinc-50/90">
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap scrollbar-none snap-x px-4 sm:px-6 lg:px-8 py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-800">
            <button
              onClick={() => handleNavClick('Сноуборди')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.snowboards}
            </button>
            <button
              onClick={() => handleNavClick('Скейтборди')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.skate}
            </button>
            <button
              onClick={() => handleNavClick('Взуття')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.boots}
            </button>
            <button
              onClick={() => handleNavClick('Кріплення')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.bindings}
            </button>
            <button
              onClick={() => handleNavClick('Оптика')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.goggles}
            </button>
            <button
              onClick={() => handleNavClick('Захист')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.helmets}
            </button>
            <button
              onClick={() => handleNavClick('Одяг')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.clothing}
            </button>
            <button
              onClick={() => handleNavClick('Аксесуари')}
              className="snap-start px-2.5 py-1 rounded-lg hover:bg-zinc-200/70 hover:text-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              {t.subnav.accessories}
            </button>
            <button
              onClick={() => handleNavClick('all')}
              className="snap-start flex items-center gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg font-black active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Percent className="h-3 w-3" />
              <span>{t.subnav.sale}</span>
            </button>
          </nav>

          {/* Soft right edge-fade gradient mask for mobile UX */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-50 via-zinc-50/80 to-transparent sm:hidden" />
        </div>
      </div>
    </header>
  );
}
