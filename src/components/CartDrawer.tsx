'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useConfig } from '@/context/ConfigContext';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Tag } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, subtotal, currency, clearCart } = useCart();
  const { storeDomain } = useConfig();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage('Промокод WELCOME10 применен (-10%)');
    } else if (promoCode.trim().toUpperCase() === 'SHOPIFY20') {
      setDiscountPercent(20);
      setPromoMessage('Промокод SHOPIFY20 применен (-20%)');
    } else {
      setPromoMessage('Неверный промокод (попробуйте WELCOME10)');
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // If real shopify store is connected:
    if (storeDomain && storeDomain.includes('.myshopify.com')) {
      // Direct checkout URL construction for Shopify cart
      // Example: https://{storeDomain}/cart/{variant_id}:{quantity},{variant_id}:{quantity}
      const cartParams = items
        .map((i) => {
          const rawId = i.id.replace('gid://shopify/ProductVariant/', '');
          return `${rawId}:${i.quantity}`;
        })
        .join(',');
      
      const checkoutUrl = `https://${storeDomain}/cart/${cartParams}`;
      window.open(checkoutUrl, '_blank');
      setIsCheckingOut(false);
      return;
    }

    // Demo checkout simulation: redirect to beautiful success confirmation
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        closeCart();
        window.location.href = '/checkout/success';
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-zinc-900" />
              <h2 className="text-lg font-bold text-zinc-950">Корзина</h2>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
                {items.length}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-100">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-700 mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  До бесплатной доставки: <strong>{formatPrice(remainingForFreeShipping, currency)}</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Бесплатная доставка активна!
                </span>
              )}
              <span className="text-zinc-500">{Math.round(freeShippingProgress)}%</span>
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
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/70">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
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
                        <h4 className="text-sm font-semibold text-zinc-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-0.5"
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.variantTitle}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-zinc-950">
                        {formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-zinc-600 hover:text-zinc-900"
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
                <h3 className="mt-3 text-base font-semibold text-zinc-900">Ваша корзина пуста</h3>
                <p className="mt-1 text-xs text-zinc-500">Добавьте понравившиеся товары из каталога.</p>
                <button
                  onClick={closeCart}
                  className="mt-6 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Перейти к покупкам
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
                    placeholder="Промокод (WELCOME10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-300 transition-colors"
                >
                  Применить
                </button>
              </form>

              {promoMessage && (
                <p className={`text-xs mb-3 font-medium ${discountPercent > 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 mb-4">
                <div className="flex justify-between">
                  <span>Подытог</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Скидка ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>{remainingForFreeShipping === 0 ? 'Бесплатно' : 'Рассчитывается на чекауте'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Итого к оплате</span>
                  <span>{formatPrice(finalTotal, currency)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              {isSuccess ? (
                <div className="w-full rounded-2xl bg-emerald-600 p-4 text-center text-white font-semibold text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Заказ успешно оформлен!</span>
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-zinc-800 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>Перенаправление на Shopify Checkout...</span>
                  ) : (
                    <>
                      <span>Оформить заказ</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}

              <p className="mt-3 text-center text-[11px] text-zinc-400">
                Защищенная оплата • Shopify Storefront API SSL
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
