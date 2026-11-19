'use client';

import React, { useState, useMemo } from 'react';
import { ShopifyProduct } from '@/types/shopify';
import { ProductCard } from '@/components/ProductCard';
import { X, Filter } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';

interface ProductGridProps {
  products: ShopifyProduct[];
  searchQuery: string;
  selectedCategory: string;
  selectedBrand: string;
  onSelectCategory: (cat: string) => void;
  onSelectBrand: (brand: string) => void;
  onOpenCalculator?: () => void;
}

export function ProductGrid({
  products,
  searchQuery,
  selectedCategory,
  selectedBrand,
  onSelectCategory,
  onSelectBrand,
  onOpenCalculator,
}: ProductGridProps) {
  const { language } = useConfig();
  const t = TRANSLATIONS[language];

  const categories = useMemo(() => [
    { id: 'all', label: t.allGear },
    { id: 'Сноуборди', label: t.subnav.snowboards },
    { id: 'Взуття', label: t.subnav.boots },
    { id: 'Кріплення', label: t.subnav.bindings },
    { id: 'Оптика', label: t.subnav.goggles },
    { id: 'Захист', label: t.subnav.helmets },
    { id: 'Одяг', label: t.subnav.clothing },
    { id: 'Скейтборди', label: t.subnav.skate },
    { id: 'Аксесуари', label: t.subnav.accessories },
  ], [t]);

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'staff-picks'>('featured');
  const [flexFilter, setFlexFilter] = useState<'all' | 'soft' | 'medium' | 'stiff'>('all');
  const [camberFilter, setCamberFilter] = useState<'all' | 'camber' | 'hybrid' | 'rocker'>('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchVendor = product.vendor?.toLowerCase().includes(q);
          const matchTags = product.tags?.some((tag) => tag.toLowerCase().includes(q));
          const matchSpecs = product.specs && (
            (product.specs.flex && product.specs.flex.toLowerCase().includes(q)) ||
            (product.specs.profile && product.specs.profile.toLowerCase().includes(q)) ||
            (product.specs.terrain && product.specs.terrain.toLowerCase().includes(q)) ||
            (product.specs.subCategory && product.specs.subCategory.toLowerCase().includes(q))
          );
          if (!matchTitle && !matchDesc && !matchVendor && !matchTags && !matchSpecs) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          const matchType = product.productType?.toLowerCase() === selectedCategory.toLowerCase();
          const matchTag = product.tags?.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase());
          if (!matchType && !matchTag) return false;
        }

        // Brand filter
        if (selectedBrand) {
          if (product.vendor?.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        }

        // Flex filter
        if (flexFilter !== 'all' && product.specs?.flexRating) {
          const rating = product.specs.flexRating;
          if (flexFilter === 'soft' && rating > 4) return false;
          if (flexFilter === 'medium' && (rating < 5 || rating > 7)) return false;
          if (flexFilter === 'stiff' && rating < 8) return false;
        }

        // Camber filter
        if (camberFilter !== 'all' && product.specs?.camberType) {
          if (product.specs.camberType !== camberFilter) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'staff-picks') {
          return (b.isStaffPick ? 1 : 0) - (a.isStaffPick ? 1 : 0);
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        const priceA = parseFloat(a.priceRange?.minVariantPrice.amount || '0');
        const priceB = parseFloat(b.priceRange?.minVariantPrice.amount || '0');
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, selectedBrand, flexFilter, camberFilter, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || !!selectedBrand || flexFilter !== 'all' || camberFilter !== 'all' || !!searchQuery;

  const clearAllFilters = () => {
    onSelectCategory('all');
    onSelectBrand('');
    setFlexFilter('all');
    setCamberFilter('all');
  };

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-none border-b border-zinc-200">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-xs font-black uppercase tracking-wider px-4 py-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950">
            {selectedBrand ? `${selectedBrand} Gear` : selectedCategory !== 'all' ? selectedCategory : t.allGear}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500 font-semibold uppercase tracking-wider">
            {t.showingItems} {filteredProducts.length} {t.itemsWord}
          </p>
        </div>

        {/* Secondary Filter Chips and Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Flex Filter */}
          <div className="flex items-center border border-zinc-300 bg-white">
            <span className="px-2.5 text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 border-r border-zinc-200 py-1.5">
              {t.flexFilter}
            </span>
            <select
              value={flexFilter}
              onChange={(e) => setFlexFilter(e.target.value as any)}
              className="bg-transparent px-2 py-1.5 text-xs font-bold uppercase text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="all">{t.allFlex}</option>
              <option value="soft">{t.softFlex}</option>
              <option value="medium">{t.medFlex}</option>
              <option value="stiff">{t.stiffFlex}</option>
            </select>
          </div>

          {/* Profile Filter */}
          <div className="flex items-center border border-zinc-300 bg-white">
            <span className="px-2.5 text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 border-r border-zinc-200 py-1.5">
              {t.camberFilter}
            </span>
            <select
              value={camberFilter}
              onChange={(e) => setCamberFilter(e.target.value as any)}
              className="bg-transparent px-2 py-1.5 text-xs font-bold uppercase text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="all">{t.allCamber}</option>
              <option value="camber">{t.camberOnly}</option>
              <option value="hybrid">{t.hybridOnly}</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center border border-zinc-300 bg-white">
            <span className="px-2.5 text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-50 border-r border-zinc-200 py-1.5">
              {t.sortFilter}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent px-2.5 py-1.5 text-xs font-bold uppercase text-zinc-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">{t.sortFeatured}</option>
              <option value="staff-picks">{t.sortStaffPicks}</option>
              <option value="rating">{t.sortRating}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
            </select>
          </div>

          {/* Clear Filters Button if any active */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 border border-rose-200 transition-colors"
            >
              <X className="h-3 w-3" />
              <span>{t.resetFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            {t.activeFiltersLabel}
          </span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-900 px-2.5 py-0.5 text-xs font-bold">
              {selectedCategory}
              <button onClick={() => onSelectCategory('all')} className="hover:text-rose-600">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedBrand && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-900 px-2.5 py-0.5 text-xs font-bold">
              Brand: {selectedBrand}
              <button onClick={() => onSelectBrand('')} className="hover:text-rose-600">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {flexFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-900 px-2.5 py-0.5 text-xs font-bold uppercase">
              Flex: {flexFilter}
              <button onClick={() => setFlexFilter('all')} className="hover:text-rose-600">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {camberFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-900 px-2.5 py-0.5 text-xs font-bold uppercase">
              Profile: {camberFilter}
              <button onClick={() => setCamberFilter('all')} className="hover:text-rose-600">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <Filter className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-black uppercase tracking-wider text-zinc-800">
            {language === 'ua' ? 'Жодних товарів за цими фільтрами не знайдено' : 'No products found for these filters'}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {language === 'ua' ? 'Спробуйте скинути фільтр або вибрати іншу категорію.' : 'Try resetting filters or selecting another category.'}
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 bg-zinc-950 text-white px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
