'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TacticsBrandBar } from '@/components/TacticsBrandBar';
import { TacticsCategoryHub } from '@/components/TacticsCategoryHub';
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
  const { storeDomain, storefrontToken } = useConfig();

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
      {/* Tactics Proboard Navbar */}
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
        {/* Tactics Hero Banner */}
        <Hero
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onShopClick={handleShopNow}
        />

        {/* Tactics Monochromatic Brand Bar */}
        <TacticsBrandBar
          selectedBrand={selectedBrand}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            const catalog = document.getElementById('catalog');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Tactics Category Mega-Grid Hub (Exact match to screenshot) */}
        <TacticsCategoryHub
          onSelectCategory={handleSelectCategoryFromHub}
        />

        {/* Catalog Product Grid with Advanced Filters */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-950 mb-3" />
            <p className="text-xs font-black uppercase tracking-wider">Loading Tactics Board Equipment...</p>
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
