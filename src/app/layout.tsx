import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ConfigProvider } from '@/context/ConfigContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { ProductModal } from '@/components/ProductModal';
import { StoreSettingsModal } from '@/components/StoreSettingsModal';
import { MobileNav } from '@/components/MobileNav';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { LiveSalesToasts } from '@/components/LiveSalesToasts';
import { LuckyDiscountModal } from '@/components/LuckyDiscountModal';

export const metadata: Metadata = {
  title: 'PROBOARD SHOP • Сноуборди, скейтборди та екстремальне спорядження | proboardshop.ua',
  description: 'Офіційний магазин та дропшипінг бордспорту в Україні: сноуборди Nitro, Burton, Capita, кріплення Union, черевики ThirtyTwo, шоломи Oakley та оптика Anon. Доставка Новою Поштою, оплата при отриманні (COD).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth overflow-x-clip max-w-full">
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white flex flex-col justify-between pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:pb-0 overflow-x-clip w-full max-w-full">
        <AnnouncementBar />
        <ConfigProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <WishlistDrawer />
              <ProductModal />
              <StoreSettingsModal />
              <MobileNav />
              <LiveSalesToasts />
              <LuckyDiscountModal />
            </WishlistProvider>
          </CartProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
