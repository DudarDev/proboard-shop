'use client';

import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles, Check, ArrowRight, Tag } from 'lucide-react';

export function LuckyDiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);

  useEffect(() => {
    // Show modal automatically after 12 seconds for first-time visitors
    const seen = localStorage.getItem('shopify_lucky_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('shopify_lucky_seen', 'true');
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopyCode = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('LUCKY15');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Floating Gift Trigger Badge (bottom-right) */}
      {!isFloatingDismissed && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Gift className="h-4 w-4 animate-bounce" />
            <span className="hidden sm:inline">Отримати -15%</span>
            <span className="sm:hidden">-15%</span>
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl z-10 transition-all border border-zinc-100">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 mb-4 shadow-inner">
              <Gift className="h-8 w-8" />
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 mb-2">
              <Sparkles className="h-3 w-3" />
              <span>Подарунок новому клієнту</span>
            </span>

            <h3 className="text-xl font-extrabold text-zinc-950">
              Ваша персональна знижка 15%
            </h3>
            <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
              Отримайте промокод на знижку для вашого першого замовлення на весь асортимент магазину.
            </p>

            {/* Code Box */}
            <div className="my-6 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-4">
              <div className="flex items-center justify-center gap-2">
                <Tag className="h-4 w-4 text-amber-600" />
                <span className="font-mono text-xl font-black tracking-wider text-amber-900">
                  LUCKY15
                </span>
              </div>
              <span className="mt-1 block text-[10px] font-semibold text-amber-700">
                Знижка 15% діє на всі товари
              </span>
            </div>

            {/* Actions */}
            <button
              onClick={handleCopyCode}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-md transition-all active:scale-[0.98] ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Промокод скопійовано!</span>
                </>
              ) : (
                <span>Скопіювати промокод</span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-3 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Продовжити покупки
            </button>
          </div>
        </div>
      )}
    </>
  );
}
