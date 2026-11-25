'use client';

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { formatPrice } from '@/lib/utils';
import { X, Scale, ShoppingBag, ArrowRight, Trash2, Check, ExternalLink } from 'lucide-react';

export function CompareModal() {
  const { compareItems, isCompareOpen, closeCompare, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={closeCompare}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl z-10 border border-zinc-200 my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-950 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Scale className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {t.compareModalTitle}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {compareItems.length > 0
                  ? `${compareItems.length} з 3 товарів у списку`
                  : t.compareEmptyTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button
                onClick={clearCompare}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-850 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t.clearCompareBtn}</span>
              </button>
            )}
            <button
              onClick={closeCompare}
              className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {compareItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-100 text-zinc-400 mb-4">
              <Scale className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-zinc-900">{t.compareEmptyTitle}</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">{t.compareEmptyDesc}</p>
            <button
              onClick={closeCompare}
              className="mt-6 rounded-2xl bg-zinc-950 px-6 py-3 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
            >
              {t.goToCatalog}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto p-4 sm:p-6">
            <div className="min-w-[620px] divide-y divide-zinc-100">
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 gap-4 pb-6 items-end">
                <div className="text-xs font-black uppercase tracking-wider text-zinc-400 self-center">
                  Модель / Товар
                </div>
                {compareItems.map((product) => {
                  const firstVariant = product.variants?.edges?.[0]?.node;
                  const price =
                    product.priceRange?.minVariantPrice ||
                    firstVariant?.price || { amount: '0', currencyCode: 'USD' };
                  const priceNum = parseFloat(price.amount) || 0;
                  const imgUrl =
                    product.featuredImage?.url || product.images?.edges?.[0]?.node?.url || '';

                  return (
                    <div
                      key={product.id}
                      className="relative flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-3 sm:p-4 hover:border-zinc-300 transition-all"
                    >
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-zinc-400 hover:text-rose-600 shadow-sm transition-colors"
                        title={t.removeFromCompare}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>

                      {/* Image */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white p-2 mb-3 flex items-center justify-center border border-zinc-100">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={product.title}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-3xl">🏂</span>
                        )}
                      </div>

                      {/* Info */}
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                        {product.vendor || 'PROBOARD'}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-950 line-clamp-2 mt-0.5 min-h-[2rem]">
                        {product.title}
                      </h4>
                      <div className="mt-2 text-sm font-black text-zinc-900 font-mono">
                        {formatPrice(priceNum, price.currencyCode || 'USD', currency)}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 flex flex-col gap-1.5">
                        <button
                          onClick={() => {
                            if (!firstVariant) return;
                            addToCart({
                              id: firstVariant.id,
                              productId: product.id,
                              title: product.title,
                              variantTitle: firstVariant.title,
                              price: firstVariant.price,
                              image: imgUrl,
                              handle: product.handle,
                            });
                          }}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-zinc-950 py-2 px-2 text-[11px] font-bold text-white hover:bg-zinc-800 active:scale-95 transition-all shadow-sm"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>{t.addBtn}</span>
                        </button>

                        <Link
                          href={`/products/${product.handle}`}
                          onClick={closeCompare}
                          className="w-full text-center py-1.5 text-[11px] font-bold text-zinc-600 hover:text-zinc-950 transition-colors flex items-center justify-center gap-1"
                        >
                          <span>{t.viewDetails}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specs Rows */}
              {/* Row 1: Flex */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  ⚡ {t.specFlex}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.flex ? (
                      <span className="inline-block font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded-md">
                        {p.specs.flex}
                      </span>
                    ) : (
                      '6/10 (Універсальна)'
                    )}
                  </div>
                ))}
              </div>

              {/* Row 2: Camber */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs bg-zinc-50/50 -mx-4 px-4 sm:-mx-6 sm:px-6">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  🏔️ {t.specCamber}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.profile || p.specs?.camberType || 'Hybrid Camber'}
                  </div>
                ))}
              </div>

              {/* Row 3: Shape */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  📐 {t.specShape}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.shape || 'Directional Twin'}
                  </div>
                ))}
              </div>

              {/* Row 4: Terrain */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs bg-zinc-50/50 -mx-4 px-4 sm:-mx-6 sm:px-6">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  ❄️ {t.specTerrain}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.terrain || 'All-Mountain / Park'}
                  </div>
                ))}
              </div>

              {/* Row 5: Rider Level */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  🎯 {t.specLevel}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.level || 'Intermediate – Advanced'}
                  </div>
                ))}
              </div>

              {/* Row 6: Waist Width */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs bg-zinc-50/50 -mx-4 px-4 sm:-mx-6 sm:px-6">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  📏 {t.specWaist}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium">
                    {p.specs?.waistWidth || '248 – 256 мм'}
                  </div>
                ))}
              </div>

              {/* Row 7: Warranty */}
              <div className="grid grid-cols-4 gap-4 py-3.5 text-xs">
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  🛡️ {t.specWarranty}
                </span>
                {compareItems.map((p) => (
                  <div key={p.id} className="text-zinc-700 font-medium text-[11px]">
                    {p.specs?.warranty || 'Офіційна гарантія 1-2 роки'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
