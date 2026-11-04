'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, HelpCircle, Package, User, X } from 'lucide-react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-zinc-950 px-4 py-2 text-white text-[11px] font-semibold border-b border-zinc-800 tracking-wide">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        
        {/* Left: Clearance / Deal badge */}
        <div className="hidden lg:flex items-center gap-2 text-emerald-400">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-[10px] bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
            Pre-Season Clearance
          </span>
        </div>

        {/* Center: Tactics-style Free Shipping Notice */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <span className="text-zinc-200 uppercase tracking-widest font-black text-[11px]">
            FREE SHIPPING OVER $250 / БЕЗКОШТОВНА ДОСТАВКА ВІД 3 000 ₴
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-400">
            Оплата при отриманні (COD)
          </span>
        </div>

        {/* Right: Tactics Utility Links */}
        <div className="flex items-center gap-3 sm:gap-4 text-zinc-400">
          <a
            href="https://t.me/proboard_support"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
          >
            <MessageSquare className="h-3 w-3 text-emerald-400" />
            <span>CHAT</span>
          </a>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <Link
            href="/track-order"
            className="hidden md:flex items-center gap-1 hover:text-white transition-colors"
          >
            <Package className="h-3 w-3" />
            <span>TRACK</span>
          </Link>
          <span className="hidden md:inline text-zinc-700">|</span>
          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <HelpCircle className="h-3 w-3" />
            <span>HELP</span>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="text-zinc-500 hover:text-white transition-colors ml-2"
            aria-label="Закрити оголошення"
          >
            <X className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
