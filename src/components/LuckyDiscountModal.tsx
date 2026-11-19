'use client';

import React, { useState, useEffect } from 'react';
import { Gift, X, Sparkles, Check, ArrowRight, Tag } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

export function LuckyDiscountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFloatingDismissed, setIsFloatingDismissed] = useState(false);
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    // Show modal automatically after 18 seconds for first-time visitors
    const seen = localStorage.getItem('shopify_lucky_seen');
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('shopify_lucky_seen', 'true');
      }, 18000);
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
      {/* Floating Gift Trigger Badge (bottom-right, unobtrusive with dismiss button) */}
      {!isFloatingDismissed && (
        <div className="fixed bottom-3 right-3 z-30 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full pl-3 pr-1.5 py-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 text-[11px] font-black uppercase text-white tracking-wider"
          >
            <Gift className="h-3.5 w-3.5 animate-bounce" />
            <span>{t.luckyText}</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFloatingDismissed(true);
            }}
            className="ml-1 text-white/70 hover:text-white p-0.5 rounded-full hover:bg-black/20 transition-colors"
            title="Закрити віджет"
            aria-label="Закрити віджет"
          >
            <X className="h-3 w-3" />
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
