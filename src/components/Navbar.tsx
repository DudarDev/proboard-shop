'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Settings2, Search, Heart, Ruler, Percent, Globe } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white shadow-sm transition-all">
      {/* 1. Main Header Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Brand / Logo (PROBOARD Clean Retail Aesthetic - No Demo/Dropship/Tactics Badges) */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center bg-zinc-950 text-white font-black text-xl tracking-tighter group-hover:bg-emerald-600 transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-xl tracking-tighter text-zinc-950 uppercase">
                  PROBOARD
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-zinc-950 px-1.5 py-0.5">
                  SHOP
                </span>
              </div>
              <span className="text-[9px] font-black tracking-widest text-zinc-400 uppercase mt-0.5">
                PREMIUM BOARDSPORTS STORE
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Clean Rectangular Pro Styling */}
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

        {/* Right Actions: Language Switcher, Currency, Wishlist, Calculator, Cart */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Board Size Calculator Pill */}
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
          <div className="flex items-center border border-zinc-300 bg-zinc-50 overflow-hidden text-xs font-black">
            <button
              type="button"
              onClick={() => setLanguage('ua')}
              className={`px-2 py-1 transition-colors ${
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
              className={`px-2 py-1 transition-colors ${
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
              className="appearance-none border border-zinc-300 bg-white pl-2.5 pr-6 py-1 text-xs font-black uppercase text-zinc-800 hover:border-zinc-400 focus:outline-none cursor-pointer"
              title="Змінити валюту"
            >
              {Object.keys(CURRENCY_RATES).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 text-[10px] text-zinc-400">▾</span>
          </div>

          {/* Settings button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 text-zinc-600 hover:text-zinc-950 border border-transparent hover:border-zinc-200 transition-colors"
            title="Shopify Credentials"
            aria-label="Settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative flex items-center justify-center h-8 w-8 border border-zinc-200 bg-white text-zinc-700 hover:text-rose-500 hover:border-zinc-300 transition-colors"
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

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-1.5 bg-zinc-950 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t.cart} ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* 2. Sub Navigation Bar - Pure Clean Categories without CRM/Tracking crowding */}
      <nav className="border-t border-zinc-200 bg-zinc-50/70 overflow-x-auto scrollbar-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-800">
            <button
              onClick={() => handleNavClick('Сноуборди')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.snowboards}
            </button>
            <button
              onClick={() => handleNavClick('Скейтборди')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.skate}
            </button>
            <button
              onClick={() => handleNavClick('Взуття')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.boots}
            </button>
            <button
              onClick={() => handleNavClick('Кріплення')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.bindings}
            </button>
            <button
              onClick={() => handleNavClick('Оптика')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.goggles}
            </button>
            <button
              onClick={() => handleNavClick('Захист')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.helmets}
            </button>
            <button
              onClick={() => handleNavClick('Одяг')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.clothing}
            </button>
            <button
              onClick={() => handleNavClick('Аксесуари')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              {t.subnav.accessories}
            </button>
            <button
              onClick={() => handleNavClick('all')}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 font-black transition-colors whitespace-nowrap"
            >
              <Percent className="h-3 w-3" />
              <span>{t.subnav.sale}</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-xs font-bold text-zinc-500 pl-4 border-l border-zinc-200">
            <Link href="/about" className="hover:text-zinc-950 transition-colors uppercase whitespace-nowrap">
              {t.aboutUs}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
