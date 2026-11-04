'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Settings2, Search, Heart, Ruler, Percent } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { CURRENCY_RATES } from '@/lib/utils';

interface NavbarProps {
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
  onOpenCalculator?: () => void;
  onSelectCategory?: (cat: string) => void;
}

export function Navbar({ onSearchChange, searchQuery = '', onOpenCalculator, onSelectCategory }: NavbarProps) {
  const { totalCount, toggleCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { storeDomain, setIsSettingsOpen, currency, setCurrency } = useConfig();

  const handleNavClick = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
      const catalog = document.getElementById('catalog');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white shadow-sm transition-all">
      {/* Main Header Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Brand / Logo (Tactics Proboard Aesthetic) */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center bg-zinc-950 text-white font-black text-xl tracking-tighter group-hover:bg-emerald-600 transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-xl tracking-tighter text-zinc-950 uppercase">
                  PROBOARD
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 border border-emerald-600 px-1 py-0.2 rounded-none">
                  TACTICS
                </span>
              </div>
              <span className="text-[9px] font-black tracking-widest text-zinc-400 uppercase mt-0.5">
                BOARD SHOP • DROPSHIP
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Tactics Rectangular Styling */}
        {onSearchChange && (
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="SEARCH GEAR, BRANDS, SPECS..."
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

        {/* Right Actions: Currency, Wishlist, Calculator, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Board Size Calculator Pill */}
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="hidden lg:flex items-center gap-1.5 text-zinc-800 hover:text-black bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all"
              title="Підібрати ростовку сноуборду онлайн"
            >
              <Ruler className="h-3.5 w-3.5 text-emerald-600" />
              <span>SIZE CALCULATOR</span>
            </button>
          )}

          {/* Currency Selector */}
          <div className="relative inline-flex items-center">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="appearance-none border border-zinc-300 bg-white pl-2.5 pr-6 py-1.5 text-xs font-black uppercase text-zinc-800 hover:border-zinc-400 focus:outline-none cursor-pointer"
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

          {/* Admin / Shopify Settings modal */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-zinc-600 hover:text-zinc-950 border border-transparent hover:border-zinc-200 transition-colors"
            title="Shopify Credentials"
            aria-label="Shopify"
          >
            <Settings2 className="h-4 w-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative flex items-center justify-center h-9 w-9 border border-zinc-200 bg-white text-zinc-700 hover:text-rose-500 hover:border-zinc-300 transition-colors"
            title="Обране"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-rose-500 text-[9px] font-black text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 bg-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
          >
            <ShoppingBag className="h-4 w-4 text-emerald-400" />
            <span>CART ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar - Tactics Primary Categories */}
      <nav className="border-t border-zinc-200 bg-zinc-50/60 overflow-x-auto scrollbar-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-6 text-[12px] font-black uppercase tracking-wider text-zinc-800">
            <button
              onClick={() => handleNavClick('Сноуборди')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              SNOWBOARD
            </button>
            <button
              onClick={() => handleNavClick('Скейтборди')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              SKATE
            </button>
            <button
              onClick={() => handleNavClick('Взуття')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              BOOTS
            </button>
            <button
              onClick={() => handleNavClick('Кріплення')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              BINDINGS
            </button>
            <button
              onClick={() => handleNavClick('Оптика')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              GOGGLES
            </button>
            <button
              onClick={() => handleNavClick('Захист')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              HELMETS
            </button>
            <button
              onClick={() => handleNavClick('Одяг')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              CLOTHING
            </button>
            <button
              onClick={() => handleNavClick('Аксесуари')}
              className="hover:text-emerald-600 transition-colors whitespace-nowrap"
            >
              ACCESSORIES
            </button>
            <button
              onClick={() => handleNavClick('all')}
              className="flex items-center gap-1 text-rose-600 hover:text-rose-700 transition-colors whitespace-nowrap"
            >
              <Percent className="h-3 w-3" />
              <span>SALE UP TO 40%</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] font-bold text-zinc-500">
            <Link href="/about" className="hover:text-zinc-950 transition-colors">
              ПРО НАС
            </Link>
            <Link href="/admin" className="hover:text-zinc-950 transition-colors">
              CRM ДАШБОРД
            </Link>
            <Link href="/track-order" className="hover:text-zinc-950 transition-colors">
              ТРЕКІНГ НОВА ПОШТА
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
