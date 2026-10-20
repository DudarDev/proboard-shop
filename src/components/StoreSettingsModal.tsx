'use client';

import React, { useState } from 'react';
import { useConfig } from '@/context/ConfigContext';
import { X, Check, ExternalLink, HelpCircle, RefreshCw } from 'lucide-react';

export function StoreSettingsModal() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    storeDomain,
    storefrontToken,
    saveShopifyCredentials,
    resetToDemo,
    currency,
    setCurrency,
  } = useConfig();

  const [inputDomain, setInputDomain] = useState(storeDomain);
  const [inputToken, setInputToken] = useState(storefrontToken);
  const [isSaved, setIsSaved] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveShopifyCredentials(inputDomain.trim(), inputToken.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsSettingsOpen(false);
      window.location.reload();
    }, 1000);
  };

  const handleReset = () => {
    resetToDemo();
    setInputDomain('');
    setInputToken('');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSettingsOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl transition-all z-10 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div>
            <h3 className="text-lg font-bold text-zinc-950">
              Подключение Shopify Storefront
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Переключение между демо-каталогом и вашим реальным магазином
            </p>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current status */}
        <div className="my-5 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-zinc-600">Текущий источник:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-0.5 font-bold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              {storeDomain ? storeDomain : 'Shopify Mock Shop (Публичное демо)'}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Shopify Store Domain
            </label>
            <input
              type="text"
              placeholder="your-store-name.myshopify.com"
              value={inputDomain}
              onChange={(e) => setInputDomain(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Storefront API Access Token
            </label>
            <input
              type="password"
              placeholder="shpat_xxxxxxxxxxxxxxxxxxxx"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Основная валюта
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="RUB">RUB (₽)</option>
            </select>
          </div>

          {/* Toggle instructions */}
          <div>
            <button
              type="button"
              onClick={() => setShowGuide((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Где взять Storefront Access Token в Shopify?</span>
            </button>

            {showGuide && (
              <div className="mt-3 rounded-xl bg-zinc-50 p-3.5 text-[11px] text-zinc-600 leading-relaxed border border-zinc-200/80 space-y-1.5">
                <p>1. Войдите в <strong>Shopify Admin</strong> &gt; Настройки (Settings) &gt; <strong>Apps and sales channels</strong>.</p>
                <p>2. Нажмите <strong>Develop apps</strong> &gt; <strong>Create an app</strong>.</p>
                <p>3. В разделе <strong>Configuration</strong> настройте <strong>Storefront API integration</strong> (отметьте чтение товаров, корзины, чекаута).</p>
                <p>4. Перейдите во вкладку <strong>API credentials</strong> и скопируйте <strong>Storefront API access token</strong>.</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Сбросить на демо</span>
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-zinc-900 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Сохранено! Перезагрузка...</span>
                </>
              ) : (
                <span>Сохранить подключение</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
