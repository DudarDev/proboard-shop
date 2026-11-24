'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShopifyProduct, ShopifyProductVariant } from '@/types/shopify';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useConfig } from '@/context/ConfigContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { OneClickModal } from '@/components/OneClickModal';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import { BoardSizeCalculatorModal } from '@/components/BoardSizeCalculatorModal';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductSpecsTable } from '@/components/product/ProductSpecsTable';
import { ProductPurchaseBox } from '@/components/product/ProductPurchaseBox';
import { TRANSLATIONS } from '@/lib/translations';
import {
  ArrowLeft,
  Share2,
  Star,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';

interface Props {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency, language } = useConfig();
  const t = TRANSLATIONS[language];

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    product.variants?.edges?.[0]?.node || null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isOneClickOpen, setIsOneClickOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [copied, setCopied] = useState(false);

  // Reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: language === 'ua' ? 'Ігор С. (Драгобрат / Буковель)' : 'Ihor S. (Bukovel)',
      rating: 5,
      date: language === 'ua' ? 'Вчора' : 'Yesterday',
      text:
        language === 'ua'
          ? 'Спорядження найвищого рівня! Дошка тримає крижаний схил як по рейках, клацання з кікерів вибухове. Прийшло Новою Поштою за 2 дні в ідеальній упаковці з гарантійним талоном.'
          : 'Top notch gear! Holds the edge on icy slopes like on rails, explosive pop off kickers. Delivered in 2 days in mint condition.',
    },
    {
      id: 2,
      author: language === 'ua' ? 'Максим Т. (Київ)' : 'Maksym T. (Kyiv)',
      rating: 5,
      date: language === 'ua' ? '3 дні тому' : '3 days ago',
      text:
        language === 'ua'
          ? 'Брав комплектом. Калькулятор ростовки порахував точно під мої 178 см і 76 кг — дошка лягла в руку ідеально. Дуже зручно, що є оплата при отриманні на пошті!'
          : 'Got the complete bundle. The board calculator picked the exact sizing for 178cm/76kg. COD with Nova Poshta worked seamlessly.',
    },
    {
      id: 3,
      author: language === 'ua' ? 'Олена К. (Львів)' : 'Olena K. (Lviv)',
      rating: 5,
      date: language === 'ua' ? '1 тиждень тому' : '1 week ago',
      text:
        language === 'ua'
          ? 'Оригінал 100%! Мембрана і фурнітура перевірені в сильний снігопад і мороз -12°C. Дякую команді Proboard за швидку консультацію.'
          : '100% genuine! Tested during heavy snow and -12°C. Thanks to the Proboard team for super quick support.',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = product.images?.edges?.map((e) => e.node.url) || [
    product.featuredImage?.url ||
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop',
  ];

  const currentPrice =
    selectedVariant?.price ||
    product.priceRange?.minVariantPrice || {
      amount: '0',
      currencyCode: 'USD',
    };

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart(
      {
        id: selectedVariant.id,
        productId: product.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        image: images[activeImageIndex] || images[0],
        handle: product.handle,
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;

    setReviews((prev) => [
      {
        id: Date.now(),
        author: newReviewAuthor.trim(),
        rating: newReviewRating,
        date: language === 'ua' ? 'Щойно' : 'Just now',
        text: newReviewText.trim(),
      },
      ...prev,
    ]);

    setNewReviewAuthor('');
    setNewReviewText('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white w-full max-w-full overflow-x-clip">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full max-w-full overflow-x-clip">
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t.homeBreadcrumb}</span>
            </Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-zinc-900 transition-colors">
              {t.catalogBreadcrumb}
            </Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? t.copiedText : t.shareBtn}</span>
          </button>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Column */}
          <ProductGallery
            images={images}
            title={product.title}
            activeImageIndex={activeImageIndex}
            onSelectImage={setActiveImageIndex}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleWishlist(product.id)}
          />

          {/* Details & Purchase Box Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                <span className="bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60 font-black">
                  {product.vendor || 'Proboard Official'}
                </span>
                <span>•</span>
                <span className="text-zinc-500">{product.productType || 'Snowboard Gear'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950">
                {product.title}
              </h1>

              {/* Rating preview */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-black text-zinc-900">4.9 / 5.0</span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs text-zinc-500 font-semibold">
                  {reviews.length} {t.reviewsWord}
                </span>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Quick Specs Highlight Box */}
              {product.specs && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs">
                  {product.specs.flex && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">
                        {language === 'ua' ? 'Жорсткість' : 'Flex'}
                      </span>
                      <span className="font-bold text-zinc-900">{product.specs.flex.split(' ')[0]}</span>
                    </div>
                  )}
                  {product.specs.profile && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">
                        {language === 'ua' ? 'Прогин' : 'Profile'}
                      </span>
                      <span className="font-bold text-zinc-900 truncate block">
                        {product.specs.profile.split(' ')[0]}
                      </span>
                    </div>
                  )}
                  {product.specs.terrain && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">
                        {language === 'ua' ? 'Стиль' : 'Terrain'}
                      </span>
                      <span className="font-bold text-zinc-900 truncate block">
                        {product.specs.terrain.split('/')[0]}
                      </span>
                    </div>
                  )}
                  {product.specs.level && (
                    <div className="col-span-2 sm:col-span-3 pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-semibold">
                        {language === 'ua' ? 'Рівень райдера:' : 'Rider level:'}
                      </span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
                        {product.specs.level}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modular Purchase Box */}
            <div className="mt-8">
              <ProductPurchaseBox
                product={product}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
                quantity={quantity}
                onUpdateQuantity={setQuantity}
                onAddToCart={handleAddToCart}
                onOpen1Click={() => setIsOneClickOpen(true)}
                onOpenCalculator={() => setIsCalculatorOpen(true)}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                isAdded={isAdded}
              />
            </div>
          </div>
        </div>

        {/* Modals */}
        <OneClickModal
          product={product}
          variant={selectedVariant}
          quantity={quantity}
          isOpen={isOneClickOpen}
          onClose={() => setIsOneClickOpen(false)}
        />

        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />

        <BoardSizeCalculatorModal
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
        />

        {/* Frequently Bought Together Bundle */}
        {relatedProducts.length > 0 && (() => {
          const bundleItem = relatedProducts[0];
          const p1 = Number(currentPrice.amount) || 0;
          const p2 = Number(bundleItem.priceRange?.minVariantPrice.amount) || 38;
          const originalTotal = p1 + p2;
          const discountedTotal = originalTotal * 0.85;

          const handleAddBundle = () => {
            if (!selectedVariant) return;
            addToCart(
              {
                id: selectedVariant.id,
                productId: product.id,
                title: product.title,
                variantTitle: selectedVariant.title,
                price: selectedVariant.price,
                image: images[0],
                handle: product.handle,
              },
              1
            );

            const partnerVariant = bundleItem.variants?.edges?.[0]?.node;
            if (partnerVariant) {
              addToCart(
                {
                  id: partnerVariant.id,
                  productId: bundleItem.id,
                  title: bundleItem.title,
                  variantTitle: partnerVariant.title,
                  price: partnerVariant.price,
                  image: bundleItem.featuredImage?.url,
                  handle: bundleItem.handle,
                },
                1
              );
            }

            setBundleAdded(true);
            setTimeout(() => setBundleAdded(false), 2000);
          };

          return (
            <div className="mt-16 rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <h3 className="text-base font-extrabold text-zinc-950">
                  {language === 'ua'
                    ? 'Часто купують разом (Комплект зі знижкою -15%)'
                    : 'Frequently Bought Together (15% Bundle Discount)'}
                </h3>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-zinc-200 shadow-sm max-w-xs">
                    <img src={images[0]} alt={product.title} className="h-14 w-14 rounded-xl object-contain" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 truncate max-w-[140px]">{product.title}</h4>
                      <span className="text-xs font-bold text-zinc-700">{formatPrice(p1, 'USD', currency)}</span>
                    </div>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 font-bold text-sm">
                    +
                  </span>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-zinc-200 shadow-sm max-w-xs">
                    <img
                      src={bundleItem.featuredImage?.url}
                      alt={bundleItem.title}
                      className="h-14 w-14 rounded-xl object-contain"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 truncate max-w-[140px]">
                        {bundleItem.title}
                      </h4>
                      <span className="text-xs font-bold text-zinc-700">{formatPrice(p2, 'USD', currency)}</span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:pl-6 lg:border-l border-zinc-200">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-zinc-950 font-mono">
                        {formatPrice(discountedTotal, 'USD', currency)}
                      </span>
                      <span className="text-xs text-zinc-400 line-through font-mono">
                        {formatPrice(originalTotal, 'USD', currency)}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      {language === 'ua' ? 'Економія 15% на комплекті' : 'Save 15% on bundle'}
                    </span>
                  </div>

                  <button
                    onClick={handleAddBundle}
                    className={`flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-bold shadow-md transition-all active:scale-95 ${
                      bundleAdded ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  >
                    {bundleAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>{language === 'ua' ? 'Комплект у кошику!' : 'Bundle Added!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        <span>{language === 'ua' ? 'Купити комплект' : 'Buy Complete Bundle'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Detailed Tabs Section */}
        <div className="mt-20 border-t border-zinc-200 pt-12">
          <div className="flex border-b border-zinc-200 gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {t.descTab}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {t.specsTab}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {t.shippingTab}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span>{t.reviewsTab}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 font-bold">
                {reviews.length}
              </span>
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'desc' && (
              <div className="max-w-3xl text-sm text-zinc-700 space-y-4 leading-relaxed">
                <p className="text-base font-medium text-zinc-900">{product.description}</p>
                <p>
                  {language === 'ua'
                    ? 'Кожна одиниця спорядження Proboard постачається безпосередньо з центрального європейського логістичного хабу. Це гарантує 100% оригінальність товару, наявність серійного заводського номера та збереження фірмової міжнародної гарантії від виробника.'
                    : 'Each piece of Proboard gear is supplied directly from the central European warehouse. This guarantees 100% genuine equipment, serial numbers, and manufacturer international warranty.'}
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
                    {language === 'ua' ? 'Передпродажна підготовка:' : 'Pre-delivery inspection:'}
                  </h4>
                  <ul className="list-disc pl-5 text-xs space-y-1.5 text-zinc-600">
                    <li>
                      {language === 'ua'
                        ? 'Візуальна перевірка геометрії кантів та відсутності розшарувань'
                        : 'Visual inspection of edge geometry and core integrity'}
                    </li>
                    <li>
                      {language === 'ua'
                        ? 'Збереження фабричного парафіну швидкого ковзання'
                        : 'Factory speed wax retained'}
                    </li>
                    <li>
                      {language === 'ua'
                        ? 'Оригінальна коробка та захисні кутики для безпечного транспортування Новою Поштою'
                        : 'Original packaging with shock-absorbing corners for safe transport'}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <ProductSpecsTable specs={product.specs} vendor={product.vendor} />
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl text-sm text-zinc-600 space-y-4 leading-relaxed">
                <h4 className="font-bold text-zinc-900 text-base">
                  {language === 'ua' ? 'Доставка Новою Поштою по Україні' : 'Express Delivery by Nova Poshta'}
                </h4>
                <p>
                  • <strong>{language === 'ua' ? 'Терміни:' : 'Delivery time:'}</strong>{' '}
                  {language === 'ua'
                    ? '1-3 робочих дні у будь-яке вантажне відділення або поштомат.'
                    : '1-3 business days across Ukraine.'}
                </p>
                <p>
                  • <strong>{language === 'ua' ? 'Безкоштовна доставка:' : 'Free shipping:'}</strong>{' '}
                  {language === 'ua'
                    ? 'для замовлень на суму від 3000 грн або $75.'
                    : 'for orders over $75 (3,000 ₴).'}
                </p>
                <h4 className="font-bold text-zinc-900 text-base pt-2">
                  {language === 'ua' ? 'Способи оплати' : 'Payment Methods'}
                </h4>
                <p>
                  • <strong>{language === 'ua' ? 'Післяплата (COD):' : 'Cash on Delivery (COD):'}</strong>{' '}
                  {language === 'ua'
                    ? 'Оплата готівкою або карткою при отриманні після огляду посилки.'
                    : 'Pay after inspecting the parcel at pickup.'}
                </p>
                <p>
                  • <strong>{language === 'ua' ? 'Онлайн-оплата:' : 'Online Payment:'}</strong>{' '}
                  Visa, Mastercard, Apple Pay, Google Pay.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-8">
                {/* Review Form */}
                <form
                  onSubmit={handleAddReview}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-4"
                >
                  <h4 className="text-sm font-bold text-zinc-900">{t.leaveReviewBtn}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        {language === 'ua' ? "Ваше ім'я або нікнейм" : 'Your name / rider handle'}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'ua' ? 'Наприклад, Богдан (Буковель)' : 'e.g., Alex (Bukovel)'}
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">
                        {language === 'ua' ? 'Оцінка' : 'Rating'}
                      </label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      >
                        <option value={5}>★★★★★ (5 / 5)</option>
                        <option value={4}>★★★★☆ (4 / 5)</option>
                        <option value={3}>★★★☆☆ (3 / 5)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {language === 'ua' ? 'Ваш відгук' : 'Your review'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        language === 'ua'
                          ? 'Поділіться враженнями від катання, жорсткості, поведінки на схилі...'
                          : 'Share your impressions on flex, edge hold, pop...'
                      }
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
                  >
                    {reviewSubmitted
                      ? language === 'ua'
                        ? 'Відгук опубліковано!'
                        : 'Review posted!'
                      : language === 'ua'
                      ? 'Опублікувати відгук'
                      : 'Submit review'}
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="rounded-2xl border border-zinc-100 p-5 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-zinc-900">{rev.author}</span>
                        <span className="text-xs text-zinc-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-zinc-200 pt-16">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 mb-8">
              {language === 'ua'
                ? 'Рекомендоване спорядження до комплекту'
                : 'Recommended Complete Gear'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
