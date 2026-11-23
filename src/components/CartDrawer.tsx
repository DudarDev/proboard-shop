'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useConfig } from '@/context/ConfigContext';
import { formatPrice } from '@/lib/utils';
import { createShopifyCart } from '@/lib/shopify';
import { TRANSLATIONS } from '@/lib/translations';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Tag,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

const FREE_SHIPPING_THRESHOLD_UAH = 3000;
const FREE_SHIPPING_THRESHOLD_USD = 75;

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();
  const { currency, language, storeDomain, storefrontToken } = useConfig();
  const t = TRANSLATIONS[language];

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasDemoError, setHasDemoError] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUCKY15') {
      setDiscountPercent(15);
      setPromoMessage(language === 'ua' ? 'Промокод LUCKY15 застосовано (-15%)' : 'Promo code LUCKY15 applied (-15%)');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage(language === 'ua' ? 'Промокод WELCOME10 застосовано (-10%)' : 'Promo code WELCOME10 applied (-10%)');
    } else if (code === 'PROBOARD20') {
      setDiscountPercent(20);
      setPromoMessage(language === 'ua' ? 'Промокод PROBOARD20 застосовано (-20%)' : 'Promo code PROBOARD20 applied (-20%)');
    } else {
      setPromoMessage(language === 'ua' ? 'Невірний промокод (спробуйте LUCKY15 або WELCOME10)' : 'Invalid code (try LUCKY15 or WELCOME10)');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const threshold = currency === 'UAH' ? FREE_SHIPPING_THRESHOLD_UAH : FREE_SHIPPING_THRESHOLD_USD;
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / threshold) * 100);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setPromoMessage('');
    setHasDemoError(false);

    // If real Shopify store is connected via credentials
    if (storeDomain && storefrontToken) {
      try {
        const lines = items.map((i) => ({
          merchandiseId: i.id,
          quantity: i.quantity,
        }));

        const res = await createShopifyCart(lines, {
          domain: storeDomain,
          storefrontToken,
        });

        if (res.checkoutUrl) {
          clearCart();
          closeCart();
          window.location.href = res.checkoutUrl;
          return;
        }

        if (res.userErrors && res.userErrors.length > 0) {
          const isDemoErr = res.userErrors.some(
            (e) => e.code === 'INVALID_MERCHANDISE_ID' || e.message.includes('Demo')
          );
          if (isDemoErr) {
            setHasDemoError(true);
            setPromoMessage(t.demoItemsWarning);
          } else {
            const errText = res.userErrors.map((e) => e.message).join(', ');
            setPromoMessage(`Shopify: ${errText}`);
          }
          setIsCheckingOut(false);
          return;
        }
      } catch (err: any) {
        setPromoMessage(`Shopify Connection Error: ${err.message || err}`);
        setIsCheckingOut(false);
        return;
      }
    }

    // Demo checkout simulation: redirect to confirmation
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        closeCart();
        window.location.href = '/checkout/success';
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-zinc-950" />
              <h2 className="text-base font-black uppercase tracking-tight text-zinc-950">
                {t.cartTitle}
              </h2>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-700">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="text-zinc-400 hover:text-zinc-950 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-zinc-600">
                  {t.freeShippingRemaining.replace(
                    '{amount}',
                    formatPrice(remainingForFreeShipping, currency)
                  )}
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {t.freeShippingActive}
                </span>
              )}
              <span className="text-zinc-500 font-mono text-[11px]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-200 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center p-1.5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-zinc-400">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Видалити"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                        {item.variantTitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-zinc-950 font-mono">
                        {formatPrice(
                          parseFloat(item.price.amount) * item.quantity,
                          currency
                        )}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-950"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-zinc-900 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-950"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-zinc-300" />
                <h3 className="mt-3 text-base font-black text-zinc-900">
                  {t.cartEmpty}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  {t.cartEmptyDesc}
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  {t.goToCatalog}
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-zinc-200 p-6 bg-zinc-50/50">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder={t.promoPlaceholder}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-200 px-3.5 py-1.5 text-xs font-bold text-zinc-800 hover:bg-zinc-300 transition-colors"
                >
                  {t.applyPromo}
                </button>
              </form>

              {promoMessage && (
                <div
                  className={`p-3 rounded-xl text-xs mb-3 font-medium flex items-start gap-2 ${
                    hasDemoError
                      ? 'bg-amber-50 text-amber-900 border border-amber-200'
                      : discountPercent > 0
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-zinc-100 text-zinc-800'
                  }`}
                >
                  {hasDemoError && <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />}
                  <div className="flex-1">
                    <p>{promoMessage}</p>
                    {hasDemoError && (
                      <button
                        onClick={() => {
                          clearCart();
                          setHasDemoError(false);
                          setPromoMessage('');
                        }}
                        className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-1 px-2.5 rounded-lg text-[11px] transition-colors"
                      >
                        {t.clearCartButton}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 mb-4">
                <div className="flex justify-between">
                  <span>{t.subtotalLabel}</span>
                  <span className="font-mono font-bold text-zinc-900">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{t.discountLabel} ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{t.shippingLabel}</span>
                  <span className="font-medium">
                    {remainingForFreeShipping === 0 ? t.freeDelivery : t.calculatedAtCheckout}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>{t.totalLabel}</span>
                  <span className="font-mono text-emerald-600">
                    {formatPrice(finalTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              {isSuccess ? (
                <div className="w-full rounded-2xl bg-emerald-600 p-4 text-center text-white font-black text-sm flex items-center justify-center gap-2 shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{t.orderSuccessText}</span>
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{storeDomain ? t.redirectingShopify : t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.checkoutButton}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
