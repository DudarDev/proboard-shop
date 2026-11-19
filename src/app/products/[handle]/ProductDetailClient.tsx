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
  Award,
  Layers,
  Compass,
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
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [copied, setCopied] = useState(false);

  // Simulated Ukrainian rider reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Ігор С. (Драгобрат / Буковель)',
      rating: 5,
      date: 'Вчора',
      text: 'Спорядження найвищого рівня! Дошка тримає крижаний схил як по рейках, клацання з кікерів вибухове. Прийшло Новою Поштою за 2 дні в ідеальній упаковці з гарантійним талоном.',
    },
    {
      id: 2,
      author: 'Максим Т. (Київ)',
      rating: 5,
      date: '3 дні тому',
      text: 'Брав комплектом. Калькулятор ростовки порахував точно під мої 178 см і 76 кг — дошка лягла в руку ідеально. Дуже зручно, що є оплата при отриманні на пошті!',
    },
    {
      id: 3,
      author: 'Олена К. (Львів)',
      rating: 5,
      date: '1 тиждень тому',
      text: 'Оригінал 100%! Мембрана і фурнітура перевірені в сильний снігопад і мороз -12°C. Дякую команді Proboard за швидку консультацію в Telegram.',
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = product.images?.edges?.map((e) => e.node.url) || [
    product.featuredImage?.url || 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop',
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
              <span>Головна</span>
            </Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-zinc-900 transition-colors">
              Каталог спорядження
            </Link>
            <span>/</span>
            <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copied ? 'Посилання скопійовано!' : 'Поділитися'}</span>
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
                title={isFavorite ? 'Видалити з обраного' : 'Додати в обране'}
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
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                <span className="bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60 font-black">
                  {product.vendor || 'Proboard Official'}
                </span>
                <span>•</span>
                <span className="text-zinc-500">{product.productType || 'Спорядження'}</span>
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
                <span className="text-xs text-zinc-500 font-semibold">{reviews.length} відгуки райдерів</span>
              </div>

              {/* Price & Stock */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-zinc-950">
                  {formatPrice(currentPrice.amount, currentPrice.currencyCode, currency)}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                  В наявності на європейському складі
                </span>
              </div>

              {/* Board quick specs highlight pillbox */}
              {product.specs && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs">
                  {product.specs.flex && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">Жорсткість</span>
                      <span className="font-bold text-zinc-900">{product.specs.flex.split(' ')[0]}</span>
                    </div>
                  )}
                  {product.specs.profile && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">Прогин</span>
                      <span className="font-bold text-zinc-900 truncate block">{product.specs.profile.split(' ')[0]}</span>
                    </div>
                  )}
                  {product.specs.terrain && (
                    <div>
                      <span className="text-[10px] text-zinc-400 uppercase font-black block">Стиль</span>
                      <span className="font-bold text-zinc-900 truncate block">{product.specs.terrain.split('/')[0]}</span>
                    </div>
                  )}
                  {product.specs.level && (
                    <div className="col-span-2 sm:col-span-3 pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-semibold">Рівень райдера:</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
                        {product.specs.level}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <p className="mt-5 text-sm text-zinc-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants?.edges && product.variants.edges.length > 1 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                      Оберіть ростовку / розмір ({product.variants.edges.length} доступно)
                    </label>

                    {product.productType === 'Сноуборди' ? (
                      <button
                        type="button"
                        onClick={() => setIsCalculatorOpen(true)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 transition-all active:scale-95"
                      >
                        <Ruler className="h-3.5 w-3.5" />
                        <span>Калькулятор ростовки</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline"
                      >
                        <Ruler className="h-3.5 w-3.5" />
                        <span>Таблиця розмірів</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.edges.map(({ node }) => (
                      <button
                        key={node.id}
                        onClick={() => setSelectedVariant(node)}
                        className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all ${
                          selectedVariant?.id === node.id
                            ? 'border-zinc-950 bg-zinc-950 text-white shadow-md'
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
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
                  Кількість
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
                      : 'bg-zinc-950 text-white hover:bg-zinc-800 hover:shadow-2xl'
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

              {/* Board Size Calculator Modal */}
              <BoardSizeCalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
              />

              {/* Key Guarantees */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-zinc-600 border-t border-zinc-100 pt-6">
                <div className="flex flex-col items-center text-center gap-1.5">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-zinc-900">Безкоштовна доставка</span>
                  <span className="text-[11px] text-zinc-400">при замовленні від 5000 ₴</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <RefreshCw className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-zinc-900">14 днів на обмін</span>
                  <span className="text-[11px] text-zinc-400">швидка заміна ростовки</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold text-zinc-900">Гарантія 2 роки</span>
                  <span className="text-[11px] text-zinc-400">офіційний паспорт бренду</span>
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
          <div className="flex border-b border-zinc-200 gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Опис спорядження
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Технічні характеристики
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Доставка Новою Поштою & Оплата
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold transition-all relative flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'text-zinc-950 border-b-2 border-zinc-950'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <span>Відгуки райдерів</span>
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
                  Кожна одиниця спорядження Proboard постачається безпосередньо з центрального європейського логістичного хабу. Це гарантує 100% оригінальність товару, наявність серійного заводського номера та збереження фірмової міжнародної гарантії від виробника.
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">Передпродажна підготовка:</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1.5 text-zinc-600">
                    <li>Візуальна перевірка геометрії кантів та відсутності розшарувань</li>
                    <li>Збереження фабричного парафіну швидкого ковзання</li>
                    <li>Оригінальна коробка та захисні кутики для безпечного транспортування Новою Поштою</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <dl className="divide-y divide-zinc-100 text-sm">
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500 font-medium">Бренд / Виробник</dt>
                    <dd className="font-bold text-zinc-950">{product.vendor || 'Proboard Gear'}</dd>
                  </div>
                  <div className="py-3 flex justify-between">
                    <dt className="text-zinc-500 font-medium">Категорія</dt>
                    <dd className="font-bold text-zinc-950">{product.productType || 'Бордспорт'}</dd>
                  </div>
                  {product.specs?.flex && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Жорсткість (Flex Index)</dt>
                      <dd className="font-bold text-emerald-700">{product.specs.flex}</dd>
                    </div>
                  )}
                  {product.specs?.profile && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Прогин / Геометрія</dt>
                      <dd className="font-bold text-zinc-900">{product.specs.profile}</dd>
                    </div>
                  )}
                  {product.specs?.shape && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Форма (Shape)</dt>
                      <dd className="font-bold text-zinc-900">{product.specs.shape}</dd>
                    </div>
                  )}
                  {product.specs?.terrain && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Стиль катання (Terrain)</dt>
                      <dd className="font-bold text-zinc-900">{product.specs.terrain}</dd>
                    </div>
                  )}
                  {product.specs?.level && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Рекомендований рівень</dt>
                      <dd className="font-bold text-emerald-700">{product.specs.level}</dd>
                    </div>
                  )}
                  {product.specs?.waistWidth && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Ширина талії</dt>
                      <dd className="font-mono text-xs text-zinc-800">{product.specs.waistWidth}</dd>
                    </div>
                  )}
                  {product.specs?.origin && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Походження / Склад</dt>
                      <dd className="text-zinc-800 font-semibold">{product.specs.origin}</dd>
                    </div>
                  )}
                  {product.specs?.warranty && (
                    <div className="py-3 flex justify-between">
                      <dt className="text-zinc-500 font-medium">Офіційна гарантія</dt>
                      <dd className="font-bold text-emerald-700">{product.specs.warranty}</dd>
                    </div>
                  )}
                  {product.specs?.features && product.specs.features.length > 0 && (
                    <div className="py-3">
                      <dt className="text-zinc-500 font-medium mb-2">Ключові технології:</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {product.specs.features.map((feat, i) => (
                          <span key={i} className="text-xs font-semibold bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-lg">
                            ✓ {feat}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl text-sm text-zinc-600 space-y-4 leading-relaxed">
                <h4 className="font-bold text-zinc-900 text-base">Доставка Новою Поштою по Україні</h4>
                <p>
                  • <strong>Терміни:</strong> 1-3 робочих дні у будь-яке працююче вантажне відділення або поштомат Нової Пошти.
                </p>
                <p>
                  • <strong>Безкоштовна доставка:</strong> для замовлень на суму від 5000 грн або $150.
                </p>
                <p>
                  • <strong>Кур'єрська доставка:</strong> до дверей у Києві, Львові, Дніпрі, Одесі, Харкові та інших містах.
                </p>
                <h4 className="font-bold text-zinc-900 text-base pt-2">Способи оплати</h4>
                <p>
                  • <strong>Накладений платіж (COD):</strong> Оплата готівкою або карткою при отриманні у відділенні Нової Пошти після огляду посилки. Без передоплати!
                </p>
                <p>
                  • <strong>Онлайн-оплата:</strong> Visa, Mastercard, Apple Pay, Google Pay через захищений еквайринг.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-8">
                {/* Review Form */}
                <form onSubmit={handleAddReview} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-900">Залишити відгук про спорядження</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Ваше ім'я або нікнейм</label>
                      <input
                        type="text"
                        placeholder="Наприклад, Богдан (Буковель)"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Оцінка</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                      >
                        <option value={5}>★★★★★ (5 з 5) — Топ ракета</option>
                        <option value={4}>★★★★☆ (4 з 5) — Добре спорядження</option>
                        <option value={3}>★★★☆☆ (3 з 5) — Нормально</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Ваш відгук</label>
                    <textarea
                      rows={3}
                      placeholder="Поділіться враженнями від катання, жорсткості, поведінки на схилі та швидкості доставки..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 px-3.5 py-2 text-xs text-zinc-900 bg-white focus:border-zinc-900 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-colors"
                  >
                    {reviewSubmitted ? 'Відгук опубліковано!' : 'Опублікувати відгук'}
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
              Рекомендоване спорядження до комплекту
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
