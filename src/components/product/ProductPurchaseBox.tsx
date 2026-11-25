'use client';

import React from 'react';
import { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { useCompare } from '@/context/CompareContext';
import { TRANSLATIONS } from '@/lib/translations';
import {
  ShoppingBag,
  Zap,
  Ruler,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  Scale,
} from 'lucide-react';

interface ProductPurchaseBoxProps {
  product: ShopifyProduct;
  selectedVariant: ShopifyProductVariant | null;
  onSelectVariant: (variant: ShopifyProductVariant) => void;
  quantity: number;
  onUpdateQuantity: (qty: number) => void;
  onAddToCart: () => void;
  onOpen1Click: () => void;
  onOpenCalculator: () => void;
  onOpenSizeGuide: () => void;
  isAdded: boolean;
}

export function ProductPurchaseBox({
  product,
  selectedVariant,
  onSelectVariant,
  quantity,
  onUpdateQuantity,
  onAddToCart,
  onOpen1Click,
  onOpenCalculator,
  onOpenSizeGuide,
  isAdded,
}: ProductPurchaseBoxProps) {
  const { currency, language } = useConfig();
  const { isInCompare, toggleCompare } = useCompare();
  const t = TRANSLATIONS[language];

  const variants = product.variants?.edges || [];
  const currentPrice =
    selectedVariant?.price ||
    product.priceRange?.minVariantPrice || { amount: '0', currencyCode: 'USD' };
  const compareAtPrice =
    selectedVariant?.compareAtPrice || product.compareAtPrice;

  const currentPriceNum = parseFloat(currentPrice.amount) || 0;
  const comparePriceNum = compareAtPrice
    ? parseFloat(compareAtPrice.amount)
    : 0;
  const discountPercent =
    comparePriceNum > currentPriceNum
      ? Math.round(
          ((comparePriceNum - currentPriceNum) / comparePriceNum) * 100
        )
      : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Price Block */}
      <div className="flex items-baseline gap-3 pb-4 border-b border-zinc-100">
        <span className="text-3xl sm:text-4xl font-black text-zinc-950 font-mono tracking-tight">
          {formatPrice(currentPriceNum * quantity, currentPrice.currencyCode || 'USD', currency)}
        </span>
        {compareAtPrice && (
          <span className="text-base sm:text-lg text-zinc-400 line-through font-mono">
            {formatPrice(comparePriceNum * quantity, compareAtPrice.currencyCode || 'USD', currency)}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="rounded-lg bg-rose-600 px-2.5 py-0.5 text-xs font-black text-white">
            -{discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-black uppercase tracking-wider text-zinc-900">
              {t.selectSizeLabel}
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenCalculator}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Ruler className="h-3.5 w-3.5" />
                <span>{t.calculateBtn}</span>
              </button>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:underline"
              >
                {t.sizeGuideBtn}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {variants.map(({ node: v }) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelectVariant(v)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
                    isSelected
                      ? 'border-zinc-950 bg-zinc-950 text-white shadow-md scale-[1.02]'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {/* Quantity selector */}
        <div className="flex items-center justify-between sm:justify-center rounded-2xl border border-zinc-200 bg-zinc-50 p-1 shrink-0">
          <button
            type="button"
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm hover:bg-zinc-100"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-sm font-black text-zinc-950 font-mono">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm hover:bg-zinc-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={onAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white shadow-lg active:scale-[0.98] transition-all ${
            isAdded
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-zinc-950 hover:bg-zinc-800'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>{t.addedBtn}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>{t.addBtn}</span>
            </>
          )}
        </button>

        {/* 1-Click Buy Button */}
        <button
          type="button"
          onClick={onOpen1Click}
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-500 bg-emerald-50 py-3.5 px-5 text-xs font-black uppercase tracking-wider text-emerald-800 hover:bg-emerald-100 active:scale-[0.98] transition-all"
        >
          <Zap className="h-4 w-4 text-emerald-600" />
          <span>{t.oneClickBtn}</span>
        </button>

        {/* Compare Button */}
        <button
          type="button"
          onClick={() => toggleCompare(product)}
          className={`flex items-center justify-center gap-2 rounded-2xl border py-3.5 px-4 text-xs font-bold transition-all sm:w-auto ${
            isInCompare(product.id)
              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
              : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300'
          }`}
          title={isInCompare(product.id) ? t.removeFromCompare : t.addToCompare}
        >
          <Scale className={`h-4 w-4 ${isInCompare(product.id) ? 'text-emerald-600' : 'text-zinc-500'}`} />
          <span>{isInCompare(product.id) ? t.removeFromCompare : t.addToCompare}</span>
        </button>
      </div>

      {/* Assurance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{language === 'ua' ? 'Нова Пошта 1-3 дні' : 'Express Delivery 1-3d'}</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{language === 'ua' ? 'Обмін ростовки 14 днів' : '14 Days Exchange'}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{language === 'ua' ? 'Офіційна гарантія' : 'Official Warranty'}</span>
        </div>
      </div>
    </div>
  );
}
