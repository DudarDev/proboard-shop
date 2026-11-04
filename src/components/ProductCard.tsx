'use client';

import React, { useState } from 'react';
import { ShopifyProduct } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { Eye, ShoppingBag, Check, Heart, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { OneClickModal } from '@/components/OneClickModal';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openQuickView } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency } = useConfig();
  const [isAdded, setIsAdded] = useState(false);
  const [isOneClickOpen, setIsOneClickOpen] = useState(false);

  const firstVariant = product.variants?.edges?.[0]?.node || null;
  const price = product.priceRange?.minVariantPrice || firstVariant?.price || { amount: '0', currencyCode: 'USD' };
  const compareAtPrice = product.compareAtPrice || firstVariant?.compareAtPrice;
  const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url || 'https://images.unsplash.com/photo-1522056615691-da7b810682b5?q=80&w=800&auto=format&fit=crop';
  const isFavorite = isInWishlist(product.id);
  const variants = product.variants?.edges || [];

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

  const handle1Click = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOneClickOpen(true);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className="group relative flex flex-col border border-zinc-200 bg-white p-3 sm:p-4 hover:border-zinc-950 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Tactics Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isStaffPick && (
            <span className="bg-zinc-950 text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 shadow-sm">
              STAFF PICK
            </span>
          )}
          {compareAtPrice && (
            <span className="bg-rose-600 text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 shadow-sm">
              SALE
            </span>
          )}
          {product.tags && product.tags.length > 0 && !product.isStaffPick && (
            <span className="bg-white/95 text-zinc-900 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 border border-zinc-300 shadow-sm">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center transition-colors ${
            isFavorite
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-zinc-500 hover:text-rose-600'
          }`}
          title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
          aria-label="Wishlist"
        >
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex items-center gap-1.5 bg-white text-zinc-950 font-black text-[11px] uppercase tracking-wider px-3.5 py-2 shadow-md hover:bg-zinc-100 transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col">
        {/* Brand / Vendor in bold uppercase (Tactics style) */}
        <div className="text-[11px] font-black uppercase tracking-wider text-zinc-500">
          {product.vendor || 'PROBOARD'}
        </div>

        {/* Product Title */}
        <h3 className="mt-0.5 text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
          {product.title}
        </h3>

        {/* Ratings & Reviews */}
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-500">
          <div className="flex items-center text-amber-500">
            <Star className="h-3 w-3 fill-amber-500" />
            <span className="font-bold ml-1 text-zinc-800">{product.rating || 4.9}</span>
          </div>
          <span>•</span>
          <span className="text-[10px]">({product.reviewCount || 42} reviews)</span>
        </div>

        {/* Technical Specs Chip (Flex, Camber, etc.) */}
        {product.specs && (
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {product.specs.flex && (
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-bold px-1.5 py-0.5">
                Flex: {product.specs.flex.split(' ')[0]}
              </span>
            )}
            {product.specs.camberType && (
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase px-1.5 py-0.5">
                {product.specs.camberType}
              </span>
            )}
            {product.specs.terrain && (
              <span className="hidden sm:inline bg-zinc-100 text-zinc-700 text-[10px] font-medium px-1.5 py-0.5">
                {product.specs.terrain.split('/')[0].trim()}
              </span>
            )}
          </div>
        )}

        {/* Size chips */}
        {variants.length > 1 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {variants.slice(0, 4).map(({ node }) => (
              <span
                key={node.id}
                className="text-[9px] font-bold border border-zinc-200 px-1 py-0.2 text-zinc-600 bg-white"
              >
                {node.title.split(' ')[0]}
              </span>
            ))}
            {variants.length > 4 && (
              <span className="text-[9px] font-bold text-zinc-400 self-center">
                +{variants.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-black tracking-tight text-zinc-950">
            {formatPrice(price.amount, price.currencyCode || 'USD', currency)}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-zinc-400 line-through font-semibold">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode || 'USD', currency)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex items-center justify-center gap-1 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all border ${
              isAdded
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-zinc-100 text-zinc-900 border-zinc-200 hover:bg-zinc-200'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3 w-3" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3 w-3" />
                <span>ADD</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handle1Click}
            className="flex items-center justify-center gap-1 bg-zinc-950 text-white hover:bg-emerald-600 py-1.5 text-[11px] font-black uppercase tracking-wider transition-colors"
            title="Оформити замовлення в 1 клік"
          >
            <Zap className="h-3 w-3 text-emerald-400 fill-emerald-400" />
            <span>1-CLICK</span>
          </button>
        </div>
      </div>

      <OneClickModal
        isOpen={isOneClickOpen}
        onClose={() => setIsOneClickOpen(false)}
        product={product}
        variant={firstVariant}
      />
    </div>
  );
}
