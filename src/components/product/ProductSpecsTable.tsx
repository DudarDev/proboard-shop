'use client';

import React from 'react';
import { BoardSpecs } from '@/types/shopify';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { Check, ShieldCheck, Flame, Compass, Layers, Globe2 } from 'lucide-react';

interface ProductSpecsTableProps {
  specs?: BoardSpecs;
  vendor?: string;
}

export function ProductSpecsTable({ specs, vendor }: ProductSpecsTableProps) {
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  if (!specs) return null;

  const flexRating = specs.flexRating || 6;

  return (
    <div className="space-y-6">
      {/* Visual Flex Scale Indicator */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
              {t.flexRatingLabel}
            </span>
          </div>
          <span className="text-sm font-black text-emerald-700 font-mono">
            {specs.flex || `${flexRating}/10`}
          </span>
        </div>

        {/* 10-step flex bar */}
        <div className="grid grid-cols-10 gap-1.5 h-2.5">
          {Array.from({ length: 10 }).map((_, i) => {
            const step = i + 1;
            const isFilled = step <= flexRating;
            return (
              <div
                key={step}
                className={`rounded-sm transition-all ${
                  isFilled
                    ? step > 7
                      ? 'bg-rose-500'
                      : step > 4
                      ? 'bg-emerald-500'
                      : 'bg-amber-400'
                    : 'bg-zinc-200'
                }`}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] font-bold text-zinc-500 mt-2 uppercase tracking-wider">
          <span>{language === 'ua' ? 'М’яка (Парк / Джиб)' : 'Soft (Park / Jib)'}</span>
          <span>{language === 'ua' ? 'Універсал (All-Mountain)' : 'Medium (All-Mtn)'}</span>
          <span>{language === 'ua' ? 'Жорстка (Фрірайд)' : 'Stiff (Freeride)'}</span>
        </div>
      </div>

      {/* Grid of Key Technical Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3.5">
          <Layers className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              {t.camberProfileLabel}
            </p>
            <p className="text-xs font-black text-zinc-950 mt-0.5">
              {specs.profile || 'Traditional Camber'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3.5">
          <Compass className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              {t.terrainLabel}
            </p>
            <p className="text-xs font-black text-zinc-950 mt-0.5">
              {specs.terrain || 'All-Mountain / Resort'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3.5">
          <Globe2 className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              {t.originLabel}
            </p>
            <p className="text-xs font-black text-zinc-950 mt-0.5">
              {specs.origin || `${vendor || 'Official'} Pro Shop`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3.5">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              {t.warrantyLabel}
            </p>
            <p className="text-xs font-black text-emerald-700 mt-0.5">
              {specs.warranty || '100% Brand Guarantee (2 years)'}
            </p>
          </div>
        </div>
      </div>

      {/* Official Features Checklist */}
      {specs.features && specs.features.length > 0 && (
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 mb-2.5">
            {language === 'ua' ? 'Особливості конструкції та гарантії' : 'Key Construction Features'}
          </h4>
          <ul className="space-y-2">
            {specs.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
