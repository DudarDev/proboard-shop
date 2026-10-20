'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ConfigContextType {
  storeDomain: string;
  storefrontToken: string;
  currency: string;
  setCurrency: (c: string) => void;
  saveShopifyCredentials: (domain: string, token: string) => void;
  resetToDemo: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [storeDomain, setStoreDomain] = useState('');
  const [storefrontToken, setStorefrontToken] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedDomain = localStorage.getItem('shopify_store_domain');
      const savedToken = localStorage.getItem('shopify_storefront_token');
      const savedCurrency = localStorage.getItem('shopify_store_currency');
      if (savedDomain) setStoreDomain(savedDomain);
      if (savedToken) setStorefrontToken(savedToken);
      if (savedCurrency) setCurrency(savedCurrency);
    } catch (e) {
      console.warn('Failed reading config from localStorage', e);
    }
  }, []);

  const saveShopifyCredentials = (domain: string, token: string) => {
    setStoreDomain(domain);
    setStorefrontToken(token);
    try {
      localStorage.setItem('shopify_store_domain', domain);
      localStorage.setItem('shopify_storefront_token', token);
    } catch (e) {
      console.warn('Failed saving credentials to localStorage', e);
    }
  };

  const resetToDemo = () => {
    setStoreDomain('');
    setStorefrontToken('');
    try {
      localStorage.removeItem('shopify_store_domain');
      localStorage.removeItem('shopify_storefront_token');
    } catch (e) {
      console.warn('Failed clearing credentials', e);
    }
  };

  const handleSetCurrency = (c: string) => {
    setCurrency(c);
    try {
      localStorage.setItem('shopify_store_currency', c);
    } catch (e) {
      console.warn('Failed saving currency', e);
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        storeDomain,
        storefrontToken,
        currency,
        setCurrency: handleSetCurrency,
        saveShopifyCredentials,
        resetToDemo,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
