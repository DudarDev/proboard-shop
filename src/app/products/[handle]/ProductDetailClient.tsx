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
import {
  Heart,
  ShoppingBag,
  Check,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  Zap,
  Ruler,
  Sparkles,
} from 'lucide-react';

interface Props {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { currency } = useConfig();

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    product.variants?.edges?.[0]?.node || null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isOneClickOpen, setIsOneClickOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [copied, setCopied] = useState(false);

  // Simulated reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Александр М.',
      rating: 5,
      date: '2 дня назад',
      text: 'Качество превзошло все ожидания! Материал плотный, швы идеальные. Доставили за 2 дня в аккуратной коробке.',
    },
    {
      id: 2,
      author: 'Елена В.',
      rating: 5,
      date: '1 неделю назад',
      text: 'Очень стильная вещь, сидит превосходно. В жизни выглядит даже лучше, чем на фотографиях на сайте.',
    },
    {
      id: 3,
      author: 'Дмитрий К.',
      rating: 4,
      date: '2 недели назад',
      text: 'Отличный товар, полностью соответствует описанию. Однозначно рекомендую!',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = product.images?.edges?.map((e) => e.node.url) || [
    product.featuredImage?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
  ];

  const currentPrice = selectedVariant?.price || product.priceRange?.minVariantPrice || {
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
        date: 'Только что',
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
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
        {/* Breadcrumbs & Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Главная</span>
            </Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-zinc-900 transition-colors">
              Каталог
            </Link>
            <span>/</span>
            <span className="text-zinc-900 font-medium truncate max-w-xs">{product.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? 'Ссылка скопирована!' : 'Поделиться'}</span>
          </button>
        </div>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery Column */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-200/80 shadow-sm">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md shadow-md transition-all ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-white/90 text-zinc-700 hover:bg-white hover:text-rose-500'
                }`}
                title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-zinc-900 shadow-md ring-2 ring-zinc-900/10'
                        : 'border-zinc-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                <span>{product.vendor || 'Atelier Nordic'}</span>
                <span>•</span>
                <span>{product.productType || 'Каталог'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
                {product.title}
              </h1>

              {/* Rating preview */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-900">4.9</span>
                <span className="text-xs text-zinc-400">•</span>
                <span className="text-xs text-zinc-500">{reviews.length} отзывов покупателей</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-zinc-950">
                  {formatPrice(currentPrice.amount, currentPrice.currencyCode, currency)}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  В наличии на складе
                </span>
              </div>

              <p className="mt-6 text-sm text-zinc-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants?.edges && product.variants.edges.length > 1 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                      Оберіть варіант ({product.variants.edges.length} доступно)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      <span>Таблиця розмірів</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.edges.map(({ node }) => (
                      <button
                        key={node.id}
                        onClick={() => setSelectedVariant(node)}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                          selectedVariant?.id === node.id
                            ? 'border-zinc-900 bg-zinc-900 text-white shadow-md'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        {node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  Количество
                </span>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm hover:bg-zinc-100 disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm hover:bg-zinc-100"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-10 pt-6 border-t border-zinc-100">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold shadow-xl transition-all active:scale-[0.98] ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800 hover:shadow-2xl'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Додано в кошик!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      <span>
                        Додати в кошик • {formatPrice(Number(currentPrice.amount) * quantity, currentPrice.currencyCode, currency)}
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsOneClickOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl border-2 border-amber-500 bg-amber-50/80 px-6 py-4 text-sm font-bold text-amber-900 hover:bg-amber-100 transition-all active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 text-amber-600 fill-amber-500" />
                  <span>Купити в 1 клік</span>
                </button>
              </div>

              {/* One Click Modal */}
              <OneClickModal
                product={product}
                variant={selectedVariant}
                quantity={quantity}
                isOpen={isOneClickOpen}
                onClose={() => setIsOneClickOpen(false)}
              />

              {/* Size Guide Modal */}
              <SizeGuideModal
                isOpen={isSizeGuideOpen}
                onClose={() => setIsSizeGuideOpen(false)}
              />

              {/* Key Guarantees */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-zinc-600 border-t border-zinc-100 pt-6">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-zinc-900">Бесплатная доставка</span>
                  <span className="text-[11px] text-zinc-400">при заказе от $150</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <RefreshCw className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-zinc-900">30 дней на возврат</span>
                  <span className="text-[11px] text-zinc-400">без лишних вопросов</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-zinc-900">Гарантия 2 года</span>
                  <span className="text-[11px] text-zinc-400">официальный сервис</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        {relatedProducts.length > 0 && (() => {
          const bundleItem = relatedProducts[0];
          const p1 = Number(currentPrice.amount) || 0;
          const p2 = Number(bundleItem.priceRange?.minVariantPrice.amount) || 38;
          const originalTotal = p1 + p2;
          const discountedTotal = originalTotal * 0.85;

          const handleAddBundle = () => {
            if (!selectedVariant) return;
            // Add main product
            addToCart({
              id: selectedVariant.id,
              productId: product.id,
              title: product.title,
              variantTitle: selectedVariant.title,
              price: selectedVariant.price,
              image: images[0],
              handle: product.handle,
            }, 1);

            // Add bundle partner
            const partnerVariant = bundleItem.variants?.edges?.[0]?.node;
            if (partnerVariant) {
              addToCart({
                id: partnerVariant.id,
                productId: bundleItem.id,
                title: bundleItem.title,
                variantTitle: partnerVariant.title,
                price: partnerVariant.price,
                image: bundleItem.featuredImage?.url,
                handle: bundleItem.handle,
              }, 1);
            }

            setBundleAdded(true);
            setTimeout(() => setBundleAdded(false), 2000);
          };

          return (
            <div className="mt-16 rounded-3xl border border-zinc-200/90 bg-zinc-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <h3 className="text-base font-extrabold text-zinc-950">
                  Часто купують разом (Комплект зі знижкою -15%)
                </h3>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-zinc-200 shadow-sm max-w-xs">
                    <img src={images[0]} alt={product.title} className="h-14 w-14 rounded-xl object-cover" />
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
                    <img src={bundleItem.featuredImage?.url} alt={bundleItem.title} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 truncate max-w-[140px]">{bundleItem.title}</h4>
                      <span className="text-xs font-bold text-zinc-700">{formatPrice(p2, 'USD', currency)}</span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:pl-6 lg:border-l border-zinc-200">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-zinc-950">
                        {formatPrice(discountedTotal, 'USD', currency)}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        {formatPrice(originalTotal, 'USD', currency)}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">Економія 15% на комплекті</span>
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
                        <span>Комплект у кошику!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        <span>Купити комплект</span>
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
          <div className="flex border-b border-zinc-200 gap-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === 'desc'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Подробное описание
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === 'specs'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Характеристики
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === 'shipping'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Доставка и оплата
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span>Отзывы</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                {reviews.length}
              </span>
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'desc' && (
              <div className="max-w-3xl text-sm text-zinc-600 space-y-4 leading-relaxed">
                <p>{product.description}</p>
                <p>
                  Каждое изделие проходит строгий трехступенчатый контроль качества перед отправкой.
                  Мы используем экологичные сертифицированные материалы и поддерживаем принципы
                  ответственного потребления.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <dl className="divide-y divide-zinc-100 text-sm">
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500">Производитель / Бренд</dt>
                    <dd className="font-semibold text-zinc-900">{product.vendor || 'Nordic Studio'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500">Категория</dt>
                    <dd className="font-semibold text-zinc-900">{product.productType || 'Аксессуары'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500">Артикул (Handle)</dt>
                    <dd className="font-mono text-xs text-zinc-700">{product.handle}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500">Shopify Product ID</dt>
                    <dd className="font-mono text-xs text-zinc-400">{product.id}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500">Теги</dt>
                    <dd className="text-zinc-700">{product.tags?.join(', ') || 'Стандарт'}</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl text-sm text-zinc-600 space-y-4 leading-relaxed">
                <h4 className="font-bold text-zinc-900">Условия доставки</h4>
                <p>
                  • <strong>Стандартная доставка:</strong> 2-4 рабочих дня курьером или в пункт выдачи. Бесплатно при заказе от $150.
                </p>
                <p>
                  • <strong>Экспресс-доставка:</strong> в день заказа или на следующий день.
                </p>
                <h4 className="font-bold text-zinc-900 pt-2">Способы оплаты</h4>
                <p>
                  Оплата картами Visa, Mastercard, МИР, Apple Pay, Google Pay через безопасный защищенный шлюз Shopify Payments.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-8">
                {/* Review Form */}
                <form onSubmit={handleAddReview} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-900">Оставить отзыв о товаре</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Например, Михаил"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Оценка</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      >
                        <option value={5}>★★★★★ (5 из 5)</option>
                        <option value={4}>★★★★☆ (4 из 5)</option>
                        <option value={3}>★★★☆☆ (3 из 5)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Ваш отзыв</label>
                    <textarea
                      rows={3}
                      placeholder="Поделитесь впечатлениями о качестве, материалах и доставке..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                  >
                    {reviewSubmitted ? 'Отзыв опубликован!' : 'Опубликовать отзыв'}
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
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-8">
              Вам также может понравиться
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
