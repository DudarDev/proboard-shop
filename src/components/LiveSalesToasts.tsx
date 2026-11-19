'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/shopify';
import { useConfig } from '@/context/ConfigContext';

const RECENT_BUYERS_UA = [
  { name: 'Олександр', city: 'Київ', productIdx: 0, time: '2 хв тому' },
  { name: 'Тарас', city: 'Буковель', productIdx: 1, time: '4 хв тому' },
  { name: 'Марія', city: 'Львів', productIdx: 2, time: '7 хв тому' },
  { name: 'Дмитро', city: 'Івано-Франківськ', productIdx: 3, time: '11 хв тому' },
  { name: 'Максим', city: 'Дніпро', productIdx: 4, time: '15 хв тому' },
  { name: 'Ярослав', city: 'Одеса', productIdx: 5, time: '19 хв тому' },
];

const RECENT_BUYERS_EN = [
  { name: 'Alex', city: 'Kyiv', productIdx: 0, time: '2 min ago' },
  { name: 'Taras', city: 'Bukovel', productIdx: 1, time: '4 min ago' },
  { name: 'Maria', city: 'Lviv', productIdx: 2, time: '7 min ago' },
  { name: 'Dmitry', city: 'Ivano-Frankivsk', productIdx: 3, time: '11 min ago' },
  { name: 'Max', city: 'Dnipro', productIdx: 4, time: '15 min ago' },
  { name: 'Yaroslav', city: 'Odesa', productIdx: 5, time: '19 min ago' },
];

export function LiveSalesToasts() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useConfig();
  const buyers = language === 'ua' ? RECENT_BUYERS_UA : RECENT_BUYERS_EN;

  useEffect(() => {
    if (isDismissed) return;

    // Show first toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval
    const interval = setInterval(() => {
      setIsVisible((prev) => {
        if (prev) {
          return false;
        } else {
          setCurrentIdx((curr) => (curr + 1) % buyers.length);
          return true;
        }
      });
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed, buyers.length]);

  if (isDismissed || !isVisible) return null;

  const current = buyers[currentIdx] || buyers[0];
  const product = FALLBACK_PRODUCTS[current.productIdx] || FALLBACK_PRODUCTS[0];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/90 bg-white/95 backdrop-blur-md p-3.5 shadow-xl">
        
        {/* Product image */}
        <Link href={`/products/${product.handle}`} className="shrink-0">
          <img
            src={product.featuredImage?.url}
            alt={product.title}
            className="h-12 w-12 rounded-xl object-cover border border-zinc-200 hover:scale-105 transition-transform"
          />
        </Link>

        {/* Text info */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <span className="font-semibold text-zinc-900">{current.name}</span>
            <span>({current.city})</span>
            <span>•</span>
            <span className="text-emerald-600 font-medium">{current.time}</span>
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="block text-xs font-bold text-zinc-900 truncate hover:text-emerald-700 transition-colors"
          >
            {product.title}
          </Link>

          <span className="inline-flex items-center gap-1 text-[10px] text-zinc-400">
            <CheckCircle className="h-3 w-3 text-emerald-500" />
            <span>{language === 'ua' ? 'Перевірена покупка' : 'Verified Purchase'}</span>
          </span>
        </div>

        {/* Close */}
        <button
          onClick={() => setIsDismissed(true)}
          className="text-zinc-400 hover:text-zinc-700 p-1 transition-colors"
          title="Приховати сповіщення"
        >
          <X className="h-3.5 w-3.5" />
        </button>

      </div>
    </div>
  );
}
