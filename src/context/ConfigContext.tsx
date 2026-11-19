'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

interface ConfigContextType {
  storeDomain: string;
  storefrontToken: string;
  currency: string;
  setCurrency: (c: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  saveShopifyCredentials: (domain: string, token: string) => void;
  resetToDemo: () => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [storeDomain, setStoreDomain] = useState('');
  const [storefrontToken, setStorefrontToken] = useState('');
  const [currency, setCurrency] = useState('UAH'); // Default to UAH for Ukraine/Freelancehunt
  const [language, setLanguageState] = useState<Language>('ua'); // Default to UA
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedDomain = localStorage.getItem('shopify_store_domain');
      const savedToken = localStorage.getItem('shopify_storefront_token');
      const savedCurrency = localStorage.getItem('shopify_store_currency');
      const savedLang = localStorage.getItem('shopify_store_language') as Language;
      if (savedDomain) setStoreDomain(savedDomain);
      if (savedToken) setStorefrontToken(savedToken);
      if (savedCurrency) setCurrency(savedCurrency);
      if (savedLang === 'ua' || savedLang === 'en') setLanguageState(savedLang);
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

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('shopify_store_language', lang);
    } catch (e) {
      console.warn('Failed saving language', e);
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        storeDomain,
        storefrontToken,
        currency,
        setCurrency: handleSetCurrency,
        language,
        setLanguage: handleSetLanguage,
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

export function useConfig(): ConfigContextType {
  const context = useContext(ConfigContext);
  if (!context) {
    return {
      storeDomain: '',
      storefrontToken: '',
      currency: 'UAH',
      setCurrency: () => {},
      language: 'ua' as Language,
      setLanguage: () => {},
      saveShopifyCredentials: () => {},
      resetToDemo: () => {},
      isSettingsOpen: false,
      setIsSettingsOpen: () => {},
    };
  }
  return context;
}
