'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin, ChevronDown, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

const FAQS = [
  {
    q: 'Як здійснюється доставка та скільки часу це займає?',
    a: 'Стандартна доставка кур\'єром або до відділення Нової Пошти займає 1-3 робочі дні. При замовленні на суму від $150 (або еквівалент у гривнях) доставка повністю безкоштовна.',
  },
  {
    q: 'Як повернути або обміняти товар?',
    a: 'Ви маєте 30 днів з моменту отримання товару, щоб оформити повернення або обмін. Товар повинен бути у первинному стані, з бирками та оригінальним пакуванням. Кошти повертаються на вашу картку протягом 3-5 банківських днів.',
  },
  {
    q: 'Чи безпечна онлайн-оплата в магазині?',
    a: 'Так, усі платежі проходять через офіційний сертифікований шлюз Shopify Payments з шифруванням 256-bit SSL. Ми не зберігаємо дані ваших банківських карток.',
  },
  {
    q: 'Як підключити цей фронтенд до мого реального магазину Shopify?',
    a: 'У верхньому меню натисніть на індикатор «Shopify Mock API» або іконку шестерні. Введіть домен вашого магазину (your-name.myshopify.com) та Storefront Access Token з розділу Apps & Sales Channels вашої адмінки Shopify.',
  },
  {
    q: 'Чи є гарантія на продукцію?',
    a: 'На всі товари діє офіційна гарантія виробника від 12 до 24 місяців. У разі виявлення виробничого браку ми безкоштовно замінимо товар або повернемо кошти.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full max-w-full overflow-x-clip">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full max-w-full overflow-x-clip">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">
            Служба турботи про клієнтів
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Контакти та Часті Питання (FAQ)
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Ми завжди на зв\'язку, щоб допомогти з вибором, відповісти на запитання або оформити індивідуальне замовлення.
          </p>
        </div>

        {/* 2-Column Section: Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info & Channels */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Наші канали зв'язку</h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Оберіть зручний для вас спосіб зв\'язку або залиште запит у формі поруч — ми відповімо протягом 30 хвилин у робочий час.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200/90 p-5 bg-zinc-50/50">
                <Mail className="h-6 w-6 text-emerald-600 mb-3" />
                <h3 className="text-sm font-bold text-zinc-900">Електронна пошта</h3>
                <p className="text-xs text-zinc-500 mt-1">support@atelier-store.com</p>
                <span className="text-[11px] text-emerald-700 font-medium mt-2 inline-block">24/7 підтримка</span>
              </div>

              <div className="rounded-2xl border border-zinc-200/90 p-5 bg-zinc-50/50">
                <Phone className="h-6 w-6 text-emerald-600 mb-3" />
                <h3 className="text-sm font-bold text-zinc-900">Телефон гарячої лінії</h3>
                <p className="text-xs text-zinc-500 mt-1">+380 (800) 500-240</p>
                <span className="text-[11px] text-zinc-400 mt-2 inline-block">Безкоштовно по Україні</span>
              </div>

              <div className="rounded-2xl border border-zinc-200/90 p-5 bg-zinc-50/50">
                <Clock className="h-6 w-6 text-emerald-600 mb-3" />
                <h3 className="text-sm font-bold text-zinc-900">Графік роботи</h3>
                <p className="text-xs text-zinc-500 mt-1">Пн - Пт: 09:00 - 20:00</p>
                <p className="text-xs text-zinc-500">Сб - Нд: 10:00 - 18:00</p>
              </div>

              <div className="rounded-2xl border border-zinc-200/90 p-5 bg-zinc-50/50">
                <MapPin className="h-6 w-6 text-emerald-600 mb-3" />
                <h3 className="text-sm font-bold text-zinc-900">Шоурум</h3>
                <p className="text-xs text-zinc-500 mt-1">м. Київ, вул. Велика Васильківська, 42</p>
                <span className="text-[11px] text-zinc-400 mt-2 inline-block">За попереднім записом</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-zinc-950">Надіслати повідомлення</h2>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-base font-bold">Дякуємо за звернення!</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Ваш лист отримано. Наш менеджер зв\'яжеться з вами найближчим часом.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Ваше ім'я</label>
                  <input
                    type="text"
                    required
                    placeholder="Олександр"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Email для відповіді</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Повідомлення</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Опишіть ваше запитання або номер замовлення..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs font-semibold text-white hover:bg-zinc-800 shadow-md transition-all active:scale-[0.99]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Надіслати запит</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="border-t border-zinc-200 pt-16 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Популярні запитання покупців
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Відповіді на найбільш поширені питання про доставку, оплату та товари
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200/90 bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-zinc-900 hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-zinc-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 bg-zinc-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
