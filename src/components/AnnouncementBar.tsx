'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, HelpCircle, Package, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  if (!isVisible) return null;

  return (
    <div className="relative bg-zinc-950 px-3 sm:px-4 py-2 text-white text-[11px] font-semibold border-b border-zinc-800 tracking-wide w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Left: Clearance / Deal badge */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 px-2 py-0.5">
            {t.topClearanceBadge}
          </span>
        </div>

        {/* Center: Free Shipping Notice - Consistent $75 / 3 000 ₴ */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <span className="text-zinc-200 uppercase tracking-wider font-black text-[11px] truncate">
            {t.freeShippingNotice}
          </span>
        </div>

        {/* Right: Utility Links including Admin / CRM Demo */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-zinc-400 shrink-0">
          <Link
            href="/admin"
            className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
            title="Переглянути внутрішню CRM-панель замовлень"
          >
            <ShieldCheck className="h-3 w-3" />
            <span>{t.adminCrm}</span>
          </Link>

          <span className="hidden sm:inline text-zinc-700">|</span>

          <Link
            href="/track-order"
            className="hidden md:flex items-center gap-1 hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider"
          >
            <Package className="h-3 w-3" />
            <span>{t.track}</span>
          </Link>

          <span className="hidden md:inline text-zinc-700">|</span>

          <a
            href="https://t.me/proboard_support"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider"
          >
            <MessageSquare className="h-3 w-3" />
            <span>{t.chat}</span>
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-500 hover:text-white transition-colors ml-1 p-0.5"
            aria-label="Закрити оголошення"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
