'use client';

import React, { useState } from 'react';
import { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { TRANSLATIONS } from '@/lib/translations';
import { X, CheckCircle2, Zap, Phone, MapPin, Send, Loader2 } from 'lucide-react';

interface OneClickModalProps {
  product: ShopifyProduct | null;
  variant: ShopifyProductVariant | null;
  quantity?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function OneClickModal({
  product,
  variant,
  quantity = 1,
  isOpen,
  onClose,
}: OneClickModalProps) {
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [messenger, setMessenger] = useState('Telegram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !product) return null;

  const currentVariant = variant || product.variants?.edges?.[0]?.node;
  const price = currentVariant?.price || product.priceRange?.minVariantPrice || { amount: '0', currencyCode: 'USD' };
  const singlePrice = parseFloat(price.amount) || 0;
  const totalPrice = singlePrice * quantity;
  const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage(language === 'ua' ? 'Будь ласка, заповніть ім’я та телефон' : 'Please fill in name and phone');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          messenger,
          paymentMethod: 'cod',
          currency,
          items: [
            {
              id: currentVariant?.id || product.id,
              title: product.title,
              variantTitle: currentVariant?.title || 'Стандарт',
              price: singlePrice,
              quantity,
              image: imageUrl,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedOrder(data.order);
      } else {
        setErrorMessage(data.error || 'Помилка при створенні замовлення');
      }
    } catch (err: any) {
      console.error('Error submitting order:', err);
      setErrorMessage(err.message || 'Помилка з’єднання із сервером');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedOrder(null);
    setName('');
    setPhone('');
    setCity('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 transition-all">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedOrder ? (
          /* Success Screen */
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 shadow-inner">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-950">{t.oneClickSuccessTitle}</h3>
            <p className="mt-1 text-xs text-zinc-500">
              ID: <strong className="text-zinc-900 font-mono">#{submittedOrder.id}</strong>
            </p>
            <div className="my-6 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80 text-left text-xs text-zinc-600 space-y-1.5">
              <p>👤 <strong>{t.fullNameLabel}:</strong> {submittedOrder.customer.name}</p>
              <p>📞 <strong>{t.phoneLabel}:</strong> {submittedOrder.customer.phone}</p>
              <p>📦 <strong>Товар:</strong> {product.title} (x{quantity})</p>
              <p>💰 <strong>{t.totalLabel}:</strong> {formatPrice(totalPrice, currency)}</p>
            </div>
            <p className="text-[11px] text-zinc-500 mb-6">
              {t.oneClickSuccessDesc}
            </p>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-zinc-950 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 transition-all shadow-md"
            >
              OK
            </button>
          </div>
        ) : (
          /* Form */
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-950">{t.oneClickTitle}</h3>
                <p className="text-[11px] text-zinc-500">{t.oneClickDesc}</p>
              </div>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 border border-zinc-200/70 mb-5">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-12 w-12 rounded-xl object-contain border border-zinc-200 bg-white p-1"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-zinc-900 truncate">{product.title}</p>
                <p className="text-[11px] text-zinc-500 font-medium">
                  {currentVariant?.title || 'One Size'} • {quantity} шт.
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-zinc-950 font-mono">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">{t.fullNameLabel} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Олександр Коваленко"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">{t.phoneLabel} *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+380 (99) 000-00-00"
                    className="w-full rounded-xl border border-zinc-200 pl-9 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">{t.cityLabel}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Київ, відділення Нової Пошти №..."
                    className="w-full rounded-xl border border-zinc-200 pl-9 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">{t.messengerLabel}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Telegram', 'Viber', t.callMe].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMessenger(m)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        messenger === m
                          ? 'border-zinc-950 bg-zinc-950 text-white shadow-sm'
                          : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 bg-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.submitOneClick}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
