'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Heart, ShoppingBag, Settings2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

export function MobileNav() {
  const { totalCount, toggleCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { setIsSettingsOpen, language } = useConfig();
  const t = TRANSLATIONS[language];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/90 px-2 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom,0px))] flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link
        href="/"
        className="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all"
      >
        <Home className="h-5 w-5" />
        <span className="tracking-tight">{t.tabHome}</span>
      </Link>

      <Link
        href="/#catalog"
        className="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all"
      >
        <Grid className="h-5 w-5" />
        <span className="tracking-tight">{t.tabCatalog}</span>
      </Link>

      <button
        type="button"
        onClick={openWishlist}
        className="relative flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold text-zinc-600 hover:text-rose-500 active:scale-95 transition-all"
      >
        <Heart className="h-5 w-5" />
        <span className="tracking-tight">{t.tabWishlist}</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-sm">
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={toggleCart}
        className="relative flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all"
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="tracking-tight">{t.tabCart}</span>
        {totalCount > 0 && (
          <span className="absolute top-0 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-black text-white shadow-sm">
            {totalCount}
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => setIsSettingsOpen(true)}
        className="flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-bold text-zinc-600 hover:text-zinc-950 active:scale-95 transition-all"
      >
        <Settings2 className="h-5 w-5" />
        <span className="tracking-tight">{t.tabShopify}</span>
      </button>
    </nav>
  );
}
