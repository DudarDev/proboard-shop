'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Footer } from '@/components/Footer';
import { getShopifyProducts, FALLBACK_PRODUCTS } from '@/lib/shopify';
import { ShopifyProduct } from '@/types/shopify';
import { useConfig } from '@/context/ConfigContext';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>(FALLBACK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="flex-1">
        <Hero />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-900 mb-3" />
            <p className="text-sm font-medium">Загрузка каталога Shopify Storefront...</p>
          </div>
        ) : (
          <ProductGrid products={products} searchQuery={searchQuery} />
        )}
      </main>

      <Footer />
    </div>
  );
}
