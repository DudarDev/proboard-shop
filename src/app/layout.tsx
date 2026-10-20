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

export const metadata: Metadata = {
  title: 'ATELIER | Headless Shopify Storefront',
  description: 'Современный высокопроизводительный интернет-магазин на Next.js 14 и Shopify Storefront API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white flex flex-col justify-between pb-16 sm:pb-0">
        <ConfigProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <WishlistDrawer />
              <ProductModal />
              <StoreSettingsModal />
              <MobileNav />
            </WishlistProvider>
          </CartProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
