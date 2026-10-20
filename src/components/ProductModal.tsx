'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { X, Check, ShoppingBag, Plus, Minus, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { ShopifyProductVariant } from '@/types/shopify';

export function ProductModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      const first = quickViewProduct.variants?.edges?.[0]?.node || null;
      setSelectedVariant(first);
      setActiveImageIndex(0);
      setQuantity(1);
      setIsAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const images = quickViewProduct.images?.edges?.map((e) => e.node.url) || [
    quickViewProduct.featuredImage?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
  ];

  const currentPrice = selectedVariant?.price || quickViewProduct.priceRange?.minVariantPrice || {
    amount: '0',
    currencyCode: 'USD',
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart(
      {
        id: selectedVariant.id,
        productId: quickViewProduct.id,
        title: quickViewProduct.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        image: images[activeImageIndex] || images[0],
        handle: quickViewProduct.handle,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      closeQuickView();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl transition-all z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 shadow-sm transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Images */}
        <div className="md:w-1/2 p-6 bg-zinc-50 flex flex-col justify-between">
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-white shadow-inner">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={quickViewProduct.title}
              className="h-full w-full object-cover object-center transition-all duration-300"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImageIndex === idx ? 'border-zinc-900 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Purchase options */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
              <span>{quickViewProduct.vendor || 'Nordic Studio'}</span>
              <span>•</span>
              <span>{quickViewProduct.productType || 'Каталог'}</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              {quickViewProduct.title}
            </h2>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-zinc-900">
                {formatPrice(currentPrice.amount, currentPrice.currencyCode)}
              </span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                В наличии в магазине
              </span>
            </div>

            <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Variant selector */}
            {quickViewProduct.variants?.edges && quickViewProduct.variants.edges.length > 1 && (
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-2.5">
                  Вариант / Размер
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.edges.map(({ node }) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedVariant(node)}
                      className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                        selectedVariant?.id === node.id
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      {node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Количество
              </span>
              <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm hover:bg-zinc-100 disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-zinc-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm hover:bg-zinc-100"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold shadow-lg transition-all active:scale-[0.98] ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-xl'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Добавлено в корзину!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>Добавить в корзину • {formatPrice(Number(currentPrice.amount) * quantity, currentPrice.currencyCode)}</span>
                </>
              )}
            </button>

            {/* Mini guarantees */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-zinc-400" />
                <span>Быстрая доставка</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-zinc-400" />
                <span>30 дней на возврат</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
