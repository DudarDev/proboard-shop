'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useConfig } from '@/context/ConfigContext';
import { FALLBACK_PRODUCTS } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils';
import { TRANSLATIONS } from '@/lib/translations';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export function WishlistDrawer() {
  const { isWishlistOpen, closeWishlist, wishlistIds, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { language, currency } = useConfig();
  const t = TRANSLATIONS[language];

  if (!isWishlistOpen) return null;

  const wishedProducts = FALLBACK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg font-bold text-zinc-950">{t.wishlistTitle}</h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
                {wishedProducts.length}
              </span>
            </div>
            <button
              onClick={closeWishlist}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Закрити"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {wishedProducts.length > 0 ? (
              wishedProducts.map((product) => {
                const firstVariant = product.variants?.edges?.[0]?.node;
                const price = product.priceRange?.minVariantPrice || firstVariant?.price || { amount: '0', currencyCode: 'USD' };
                const image = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;

                return (
                  <div key={product.id} className="py-4 flex gap-4 items-center">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50 border border-zinc-200 p-1 flex items-center justify-center">
                      <img src={image} alt={product.title} className="h-full w-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-bold text-zinc-950 mt-1">
                        {formatPrice(price.amount, price.currencyCode || 'USD', currency)}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            if (firstVariant) {
                              addToCart({
                                id: firstVariant.id,
                                productId: product.id,
                                title: product.title,
                                variantTitle: firstVariant.title,
                                price: firstVariant.price,
                                image,
                                handle: product.handle,
                              });
                            }
                          }}
                          className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>{t.moveToCart}</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-100 transition-colors"
                          title={t.removeFromWishlist}
                          aria-label={t.removeFromWishlist}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center">
                <Heart className="mx-auto h-12 w-12 text-zinc-300" />
                <h3 className="mt-3 text-base font-semibold text-zinc-900">{t.wishlistEmpty}</h3>
                <p className="mt-1 text-xs text-zinc-500">
                  {t.wishlistEmptyDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
