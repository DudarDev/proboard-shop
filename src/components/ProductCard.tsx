'use client';

import React, { useState } from 'react';
import { ShopifyProduct } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { Eye, ShoppingBag, Check, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openQuickView } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency } = useConfig();
  const [isAdded, setIsAdded] = useState(false);

  const firstVariant = product.variants?.edges?.[0]?.node;
  const price = product.priceRange?.minVariantPrice || firstVariant?.price || { amount: '0', currencyCode: 'USD' };
  const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop';
  const hasMultipleVariants = (product.variants?.edges?.length || 0) > 1;
  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!firstVariant) return;

    addToCart({
      id: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      image: imageUrl,
      handle: product.handle,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-3 sm:p-4 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.tags && product.tags.length > 0 && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-zinc-800 shadow-sm z-10">
            {product.tags[0]}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500'
              : 'bg-white/80 text-zinc-600 hover:bg-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Hover Quick Actions */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-zinc-100 hover:scale-110 active:scale-95 transition-all"
            title="Быстрый просмотр"
          >
            <Eye className="h-4 w-4" />
          </button>

          <Link
            href={`/products/${product.handle}`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-800 shadow-md hover:bg-zinc-100 hover:scale-110 active:scale-95 transition-all"
            title="Страница товара"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
          <span>{product.productType || 'Товар'}</span>
          {hasMultipleVariants && (
            <span className="text-[11px] font-medium text-zinc-400">
              {product.variants?.edges?.length} вар.
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center justify-between pt-1">
          <span className="text-base font-bold text-zinc-950">
            {formatPrice(price.amount, price.currencyCode, currency)}
          </span>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold shadow-sm transition-all active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Добавлено</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>В корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
