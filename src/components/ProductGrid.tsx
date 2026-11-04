'use client';

import React, { useState, useMemo } from 'react';
import { ShopifyProduct } from '@/types/shopify';
import { ProductCard } from '@/components/ProductCard';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: ShopifyProduct[];
  searchQuery: string;
  onOpenCalculator?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: '🏂 Все спорядження' },
  { id: 'Сноуборди', label: 'Сноуборди' },
  { id: 'Скейтборди', label: 'Скейтборди' },
  { id: 'Кріплення', label: 'Кріплення & Взуття' },
  { id: 'Оптика', label: 'Оптика & Маски' },
  { id: 'Захист', label: 'Шоломи & Захист' },
  { id: 'Одяг', label: 'Анораки & Одяг' },
  { id: 'Аксесуари', label: 'Догляд & Сервіс' },
];

export function ProductGrid({ products, searchQuery, onOpenCalculator }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));
          const matchSpecs = product.specs && (
            (product.specs.flex && product.specs.flex.toLowerCase().includes(q)) ||
            (product.specs.profile && product.specs.profile.toLowerCase().includes(q)) ||
            (product.specs.terrain && product.specs.terrain.toLowerCase().includes(q))
          );
          if (!matchTitle && !matchDesc && !matchTags && !matchSpecs) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          const matchType = product.productType?.toLowerCase() === selectedCategory.toLowerCase();
          const matchTag = product.tags?.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
          if (!matchType && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.priceRange?.minVariantPrice.amount || '0');
        const priceB = parseFloat(b.priceRange?.minVariantPrice.amount || '0');

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
            Каталог спорядження Proboard
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-medium">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1
              ? 'модель'
              : filteredProducts.length > 1 && filteredProducts.length < 5
              ? 'моделі'
              : 'моделей'}{' '}
            в наявності {searchQuery && `за запитом «${searchQuery}»`} • Офіційний європейський склад
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-950 text-emerald-400 shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="absolute left-3 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none rounded-xl border border-zinc-200 bg-white pl-8 pr-8 py-1.5 text-xs font-bold text-zinc-700 hover:border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer shadow-sm"
            >
              <option value="featured">Спочатку популярні</option>
              <option value="price-asc">Ціна: від меншої</option>
              <option value="price-desc">Ціна: від більшої</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center bg-zinc-50/50">
          <SlidersHorizontal className="mx-auto h-8 w-8 text-zinc-400" />
          <h3 className="mt-3 text-base font-bold text-zinc-900">Спорядження не знайдено</h3>
          <p className="mt-1 text-xs text-zinc-500">
            Спробуйте змінити пошуковий запит або скинути категорію.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
          >
            Скинути фільтр
          </button>
        </div>
      )}
    </section>
  );
}
