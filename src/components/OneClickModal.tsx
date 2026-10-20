'use client';

import React, { useState } from 'react';
import { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { X, CheckCircle2, Zap, Phone, MapPin, Send } from 'lucide-react';

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
  const { currency } = useConfig();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [messenger, setMessenger] = useState('Telegram');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  if (!isOpen || !product) return null;

  const currentVariant = variant || product.variants?.edges?.[0]?.node;
  const price = currentVariant?.price || product.priceRange?.minVariantPrice || { amount: '0', currencyCode: 'USD' };
  const singlePrice = parseFloat(price.amount) || 0;
  const totalPrice = singlePrice * quantity;
  const imageUrl = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          messenger,
          total: totalPrice,
          currency,
          paymentMethod: 'cod',
          items: [
            {
              id: currentVariant?.id,
              title: product.title,
              variantTitle: currentVariant?.title || 'Стандарт',
              price: singlePrice,
              quantity,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedOrder(data.order);
      }
    } catch (err) {
      console.error('Error submitting order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmittedOrder(null);
    setName('');
    setPhone('');
    setCity('');
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
            <h3 className="text-xl font-bold text-zinc-950">Замовлення прийнято!</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Номер замовлення: <strong className="text-zinc-900 font-mono">#{submittedOrder.id}</strong>
            </p>
            <div className="my-6 rounded-2xl bg-zinc-50 p-4 border border-zinc-200/80 text-left text-xs text-zinc-600 space-y-1.5">
              <p>👤 <strong>Клієнт:</strong> {submittedOrder.customer.name}</p>
              <p>📞 <strong>Телефон:</strong> {submittedOrder.customer.phone}</p>
              <p>📦 <strong>Товар:</strong> {product.title} (x{quantity})</p>
              <p>💰 <strong>До сплати при отриманні:</strong> {formatPrice(totalPrice, 'USD', currency)}</p>
            </div>
            <p className="text-[11px] text-zinc-500 mb-6">
              Менеджер зв'яжеться з вами через <strong>{messenger}</strong> протягом 15 хвилин для підтвердження відправки.
            </p>
            <button
              onClick={handleClose}
              className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-md"
            >
              Зрозуміло, дякую!
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
                <h3 className="text-base font-bold text-zinc-950">Швидке замовлення в 1 клік</h3>
                <p className="text-[11px] text-zinc-500">Без реєстрації та передоплати</p>
              </div>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 border border-zinc-200/70 mb-5">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-12 w-12 rounded-xl object-cover border border-zinc-200"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-zinc-900 truncate">{product.title}</h4>
                <p className="text-[11px] text-zinc-500">
                  {currentVariant?.title} • {quantity} шт.
                </p>
              </div>
              <span className="text-xs font-bold text-zinc-950">
                {formatPrice(totalPrice, 'USD', currency)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Ваше ім'я *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Олександр Коваль"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Номер телефону *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+380 67 000 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 pl-8 pr-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Місто та відділення пошти (необов'язково)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Київ, Нова Пошта №15"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 pl-8 pr-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Де зручніше підтвердити замовлення?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Telegram', 'Viber', 'Дзвінок'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMessenger(m)}
                      className={`rounded-xl border py-1.5 text-xs font-semibold transition-all ${
                        messenger === m
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-white hover:bg-amber-600 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>
                    {isSubmitting
                      ? 'Оформлюємо...'
                      : `Оформити замовлення • ${formatPrice(totalPrice, 'USD', currency)}`}
                  </span>
                </button>
                <p className="mt-2 text-center text-[10px] text-zinc-400">
                  Оплата при отриманні у відділенні пошти
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
