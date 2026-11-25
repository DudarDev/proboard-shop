'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShopifyProduct } from '@/types/shopify';

interface CompareContextType {
  compareItems: ShopifyProduct[];
  addToCompare: (product: ShopifyProduct) => boolean;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: ShopifyProduct) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  isCompareOpen: boolean;
  openCompare: () => void;
  closeCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'proboard_compare_items';
const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<ShopifyProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareItems(parsed.slice(0, MAX_COMPARE));
        }
      }
    } catch (err) {
      console.warn('Failed to parse compare items from localStorage:', err);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
    } catch (err) {
      console.warn('Failed to save compare items to localStorage:', err);
    }
  }, [compareItems, isMounted]);

  const isInCompare = (productId: string): boolean => {
    return compareItems.some((item) => item.id === productId);
  };

  const addToCompare = (product: ShopifyProduct): boolean => {
    if (isInCompare(product.id)) {
      return true;
    }
    if (compareItems.length >= MAX_COMPARE) {
      return false;
    }
    setCompareItems((prev) => [...prev, product]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleCompare = (product: ShopifyProduct) => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const openCompare = () => {
    setIsCompareOpen(true);
  };

  const closeCompare = () => {
    setIsCompareOpen(false);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        isCompareOpen,
        openCompare,
        closeCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
