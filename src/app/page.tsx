'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BrandBar } from '@/components/BrandBar';
import { CategoryHub } from '@/components/CategoryHub';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { BoardSizeCalculatorModal } from '@/components/BoardSizeCalculatorModal';
import { getShopifyProducts, FALLBACK_PRODUCTS } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';
import { useConfig } from '@/context/ConfigContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>(FALLBACK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const { storeDomain, storefrontToken, language } = useConfig();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const credentials = storeDomain && storefrontToken ? { domain: storeDomain, storefrontToken } : undefined;
        const fetched = await getShopifyProducts(credentials);
        if (isMounted) {
          setProducts(fetched);
        }
      } catch (err) {
        console.warn('Error fetching Shopify products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();

    return () => {
      isMounted = false;
    };
  }, [storeDomain, storefrontToken]);

  const handleSelectCategoryFromHub = (category: string, query?: string) => {
    setSelectedCategory(category);
    if (query) {
      setSearchQuery(query);
    }
  };

  const handleShopNow = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedBrand('');
        }}
      />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onShopClick={handleShopNow}
        />

        {/* Monochromatic Brand Bar */}
        <BrandBar
          selectedBrand={selectedBrand}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            const catalog = document.getElementById('catalog');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Category Mega-Grid Hub */}
        <CategoryHub
          onSelectCategory={handleSelectCategoryFromHub}
        />

        {/* Catalog Product Grid with Advanced Filters */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-950 mb-3" />
            <p className="text-xs font-black uppercase tracking-wider">
              {language === 'ua' ? 'Завантаження каталогу Proboard...' : 'Loading Proboard Equipment...'}
            </p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onSelectCategory={setSelectedCategory}
            onSelectBrand={setSelectedBrand}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {/* Dual Promo Banners */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => {
                setSelectedCategory('Сноуборди');
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative aspect-[16/7] overflow-hidden border border-zinc-900 bg-zinc-950 cursor-pointer group shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/banners/snow-on-sale.jpg"
                alt="Snow On Sale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
            </div>
            <div
              onClick={() => {
                setSelectedCategory('');
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative aspect-[16/7] overflow-hidden border border-zinc-900 bg-zinc-950 cursor-pointer group shadow-sm hover:shadow-md transition-all"
            >
              <img
                src="/banners/promo-sale.jpg"
                alt="Deals & Clearance"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>

        {/* Board Size Calculator Modal */}
        <BoardSizeCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          onApplyFilter={(size) => {
            setSearchQuery(size);
            const catalog = document.getElementById('catalog');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
