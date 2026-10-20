'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Heart, ShoppingBag, Settings2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';

export function MobileNav() {
  const { totalCount, toggleCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { setIsSettingsOpen } = useConfig();

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-2 flex items-center justify-around shadow-lg">
      <Link
        href="/"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <Home className="h-5 w-5" />
        <span>Главная</span>
      </Link>

      <Link
        href="/#catalog"
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <Grid className="h-5 w-5" />
        <span>Каталог</span>
      </Link>

      <button
        onClick={openWishlist}
        className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-rose-500 transition-colors"
      >
        <Heart className="h-5 w-5" />
        <span>Избранное</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        onClick={toggleCart}
        className="relative flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <ShoppingBag className="h-5 w-5" />
        <span>Корзина</span>
        {totalCount > 0 && (
          <span className="absolute -top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
            {totalCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setIsSettingsOpen(true)}
        className="flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
      >
        <Settings2 className="h-5 w-5" />
        <span>Shopify</span>
      </button>
    </nav>
  );
}
