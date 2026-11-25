'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { X, Sparkles, Check, ArrowRight, Compass, ShieldCheck, Ruler, ExternalLink } from 'lucide-react';
import { FALLBACK_PRODUCTS } from '@/lib/shopify';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { formatPrice } from '@/lib/utils';

interface BoardSizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter?: (recommendedSize: string) => void;
}

export function BoardSizeCalculatorModal({
  isOpen,
  onClose,
  onApplyFilter,
}: BoardSizeCalculatorModalProps) {
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  const [height, setHeight] = useState<number>(176);
  const [weight, setWeight] = useState<number>(75);
  const [style, setStyle] = useState<'allmountain' | 'freestyle' | 'freeride'>('allmountain');
  const [bootSize, setBootSize] = useState<number>(43);
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'pro'>('intermediate');

  // Calculation formula
  const recommendation = useMemo(() => {
    // 1. Base length from weight
    let baseMin = 150;
    let baseMax = 154;

    if (weight < 55) {
      baseMin = 144;
      baseMax = 149;
    } else if (weight < 65) {
      baseMin = 149;
      baseMax = 153;
    } else if (weight < 75) {
      baseMin = 153;
      baseMax = 157;
    } else if (weight < 85) {
      baseMin = 156;
      baseMax = 160;
    } else if (weight < 95) {
      baseMin = 159;
      baseMax = 163;
    } else {
      baseMin = 162;
      baseMax = 167;
    }

    // 2. Adjust for riding style
    let styleOffset = 0;
    if (style === 'freestyle') {
      styleOffset = -3; // Shorter for rotations & park
    } else if (style === 'freeride') {
      styleOffset = +3; // Longer for powder float
    }

    // 3. Adjust for skill level
    let skillOffset = 0;
    if (skillLevel === 'beginner') {
      skillOffset = -1; // More forgiving
    } else if (skillLevel === 'pro') {
      skillOffset = +1; // Stiffer & longer for high speeds
    }

    const minLength = baseMin + styleOffset + skillOffset;
    const maxLength = baseMax + styleOffset + skillOffset;

    // 4. Wide board detection
    const isWideRequired = bootSize >= 44.5;
    const isWideRecommended = bootSize >= 44;

    // 5. Flex recommendation
    let recommendedFlex = '6-7 / 10 (Універсальна жорсткість)';
    if (skillLevel === 'beginner') {
      recommendedFlex = '4-5 / 10 (М’яка, вибачає помилки кантування)';
    } else if (skillLevel === 'pro' || style === 'freeride') {
      recommendedFlex = '8-9 / 10 (Жорстка, стабільна на крижаному схилі)';
    }

    // 6. Camber recommendation
    let recommendedProfile = 'Trüe Camber або Hybrid Camber';
    if (skillLevel === 'beginner') {
      recommendedProfile = 'Flat-Out Rocker або Hybrid (легко входити в поворот)';
    } else if (style === 'freeride') {
      recommendedProfile = 'Directional Camber / Rocker Nose (максимальний пухляк)';
    }

    return {
      minLength,
      maxLength,
      isWideRequired,
      isWideRecommended,
      recommendedFlex,
      recommendedProfile,
      displayRange: `${minLength} – ${maxLength} ${isWideRequired ? 'Wide (W)' : 'см'}`,
    };
  }, [height, weight, style, bootSize, skillLevel]);

  // Filter top-3 matching snowboards from catalog
  const recommendedProducts = useMemo(() => {
    const snowboards = FALLBACK_PRODUCTS.filter(
      (p) => p.productType === 'Сноуборди' || p.tags?.includes('Сноуборди')
    );

    const scored = snowboards.map((board) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Flex match
      const targetFlex = skillLevel === 'beginner' ? 4 : skillLevel === 'pro' ? 8 : 6;
      const boardFlex = board.specs?.flexRating || 6;
      const flexDiff = Math.abs(boardFlex - targetFlex);
      if (flexDiff <= 1) {
        score += 35;
        reasons.push(`Жорсткість ${board.specs?.flex || boardFlex}/10`);
      } else if (flexDiff <= 2) {
        score += 20;
      }

      // 2. Style match
      const terrain = (board.specs?.terrain || '').toLowerCase();
      const shape = (board.specs?.shape || '').toLowerCase();
      if (style === 'freestyle') {
        if (terrain.includes('park') || terrain.includes('freestyle') || shape.includes('twin')) {
          score += 40;
          reasons.push('Park / True Twin');
        } else {
          score += 20;
        }
      } else if (style === 'freeride') {
        if (terrain.includes('freeride') || terrain.includes('powder') || shape.includes('directional')) {
          score += 40;
          reasons.push('Freeride / Directional');
        } else {
          score += 20;
        }
      } else {
        if (terrain.includes('all-mountain')) {
          score += 40;
          reasons.push('All-Mountain');
        } else {
          score += 25;
        }
      }

      // 3. Wide match
      const hasWide =
        board.variants?.edges?.some((v) => v.node.title.toLowerCase().includes('w')) ||
        parseFloat(board.specs?.waistWidth || '250') >= 256;
      if (recommendation.isWideRequired) {
        if (hasWide) {
          score += 25;
          reasons.push('Wide версія');
        }
      } else {
        score += 15;
      }

      if (board.isStaffPick) score += 5;
      if (board.rating && board.rating >= 4.8) score += 5;

      return {
        board,
        score,
        matchReason: reasons.slice(0, 2).join(' • '),
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3);
  }, [style, skillLevel, recommendation.isWideRequired]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (onApplyFilter) {
      onApplyFilter(`${recommendation.minLength}`);
    }
    onClose();
    // Scroll to catalog smoothly
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl z-10 transition-all border border-zinc-200 my-8">
        {/* Header with Mountain Gradient */}
        <div className="relative bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950 p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-emerald-400 backdrop-blur-md border border-white/10">
                <Ruler className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Калькулятор ростовки сноуборду
                </h3>
                <p className="text-xs text-zinc-300 mt-0.5">
                  Професійний підбір довжини, ширини (Wide) та жорсткості від Proboard Shop
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Sliders: Weight & Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Weight (Kg) */}
            <div className="space-y-2 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-800">
                <span>Вага райдера:</span>
                <span className="text-sm font-extrabold text-emerald-600 bg-white px-2.5 py-0.5 rounded-lg border border-zinc-200">
                  {weight} кг
                </span>
              </div>
              <input
                type="range"
                min="45"
                max="120"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>45 кг</span>
                <span>80 кг</span>
                <span>120 кг</span>
              </div>
            </div>

            {/* Height (Cm) */}
            <div className="space-y-2 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-800">
                <span>Зріст:</span>
                <span className="text-sm font-extrabold text-emerald-600 bg-white px-2.5 py-0.5 rounded-lg border border-zinc-200">
                  {height} см
                </span>
              </div>
              <input
                type="range"
                min="145"
                max="205"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>145 см</span>
                <span>175 см</span>
                <span>205 см</span>
              </div>
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Стиль та локація катання
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setStyle('allmountain')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  style === 'allmountain'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <span className="block text-xs font-bold text-zinc-950">🏔️ All-Mountain</span>
                <span className="block text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Універсальний: підготовлені траси, схили, легкий фрірайд
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStyle('freestyle')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  style === 'freestyle'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <span className="block text-xs font-bold text-zinc-950">🛹 Park & Freestyle</span>
                <span className="block text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Сноупарк, трампліни, рейли, обертання (-3 см до бази)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStyle('freeride')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  style === 'freeride'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-zinc-200 bg-white hover:bg-zinc-50'
                }`}
              >
                <span className="block text-xs font-bold text-zinc-950">❄️ Freeride & Powder</span>
                <span className="block text-[11px] text-zinc-500 mt-0.5 leading-snug">
                  Глибокий пухляк, беккантрі, великі гори (+3 см до бази)
                </span>
              </button>
            </div>
          </div>

          {/* Boot Size & Rider Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Розмір взуття (EU):
              </label>
              <select
                value={bootSize}
                onChange={(e) => setBootSize(Number(e.target.value))}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {[37, 38, 39, 40, 41, 42, 43, 44, 44.5, 45, 46, 47, 48].map((size) => (
                  <option key={size} value={size}>
                    {size} EU {size >= 44.5 ? '⚠️ (Потрібна дошка Wide)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 mb-1">
                Рівень катання:
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="beginner">Початківець (1-2 сезони, навчання)</option>
                <option value="intermediate">Прогресуючий (впевнений карвінг)</option>
                <option value="pro">Експерт / Pro (висока швидкість, стрибки)</option>
              </select>
            </div>
          </div>

          {/* Results Box */}
          <div className="rounded-3xl border-2 border-emerald-500/80 bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Твоя ідеальна геометрія сноуборду:</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-emerald-200/80">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                  {recommendation.displayRange}
                </span>
                <span className="text-xs text-zinc-500 ml-2 font-medium">ростовка</span>
              </div>

              {recommendation.isWideRequired && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300">
                  ⚠️ Рекомендовано версію WIDE
                </span>
              )}
            </div>

            {/* Detailed specs tips */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900">Жорсткість (Flex):</strong>{' '}
                  {recommendation.recommendedFlex}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900">Прогин:</strong>{' '}
                  {recommendation.recommendedProfile}
                </div>
              </div>

              <div className="flex items-start gap-2 sm:col-span-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-900">Ширина талії:</strong>{' '}
                  {recommendation.isWideRequired
                    ? '258+ мм (Wide). Обов’язково для захисту від чіпляння носками в глибоких дугах.'
                    : '246 – 254 мм (Standard). Ідеальний швидкий перехід з канта на кант.'}
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Recommended Boards */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-zinc-950 flex items-center gap-1.5">
                  <span>🏂 {t.calcTopRecommended}</span>
                </h4>
                <p className="text-[11px] text-zinc-500">{t.calcTopRecommendedSub}</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                AI Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendedProducts.map(({ board, matchReason }) => {
                const firstVariant = board.variants?.edges?.[0]?.node;
                const price =
                  board.priceRange?.minVariantPrice ||
                  firstVariant?.price || { amount: '0', currencyCode: 'USD' };
                const priceNum = parseFloat(price.amount) || 0;
                const imgUrl =
                  board.featuredImage?.url || board.images?.edges?.[0]?.node?.url || '';

                return (
                  <Link
                    key={board.id}
                    href={`/products/${board.handle}`}
                    onClick={onClose}
                    className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50/50 p-3 hover:border-emerald-600 hover:bg-white hover:shadow-lg transition-all"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white p-2 mb-2 flex items-center justify-center border border-zinc-100">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={board.title}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <span>🏂</span>
                        )}
                        <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow-sm">
                          {t.calcMatchScore}
                        </span>
                      </div>

                      {/* Vendor & Title */}
                      <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        {board.vendor}
                      </span>
                      <h5 className="text-xs font-bold text-zinc-950 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {board.title}
                      </h5>

                      {/* Match reasons */}
                      {matchReason && (
                        <p className="text-[10px] text-emerald-700 font-bold mt-1 bg-emerald-50 px-1.5 py-0.5 rounded line-clamp-1 border border-emerald-100">
                          ✓ {matchReason}
                        </p>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs font-black text-zinc-950 font-mono">
                        {formatPrice(priceNum, price.currencyCode || 'USD', currency)}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>{t.calcViewBoard}</span>
                        <ArrowRight className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleApply}
              className="w-full flex-1 flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-4 text-sm font-bold text-white shadow-xl hover:bg-zinc-800 transition-all active:scale-[0.98]"
            >
              <span>Дивитися сноуборди в каталозі</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              <Compass className="h-4 w-4 text-emerald-600" />
              <span>Консультація експерта (Telegram)</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              100% точний розрахунок
            </span>
            <span>•</span>
            <span>Безкоштовна заміна ростовки протягом 14 днів</span>
          </div>
        </div>
      </div>
    </div>
  );
}
