import { ImageResponse } from 'next/og';
import { getProductByHandle } from '@/lib/shopify';
import fs from 'fs';
import path from 'path';

export const alt = 'PROBOARD SHOP • Сноуборд та спорядження';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  const title = product?.title || 'Екстремальне спорядження';
  const vendor = product?.vendor || 'PROBOARD';
  const price = product?.priceRange?.minVariantPrice?.amount
    ? `$${product.priceRange.minVariantPrice.amount}`
    : '$460';
  const flex = product?.specs?.flex || (product?.specs?.flexRating ? `${product.specs.flexRating}/10` : null);
  const camber = product?.specs?.camberType || product?.specs?.profile || null;
  const terrain = product?.specs?.terrain || null;

  // Resolve image (local base64 or remote URL)
  let imageBase64: string | null = null;
  const rawUrl = product?.featuredImage?.url || product?.images?.edges?.[0]?.node?.url;

  if (rawUrl) {
    if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
      imageBase64 = rawUrl;
    } else if (rawUrl.startsWith('/')) {
      try {
        const localPath = path.join(process.cwd(), 'public', rawUrl);
        if (fs.existsSync(localPath)) {
          const fileBuffer = fs.readFileSync(localPath);
          const ext = path.extname(rawUrl).toLowerCase();
          const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
          imageBase64 = `data:${mime};base64,${fileBuffer.toString('base64')}`;
        }
      } catch {
        // Fallback gracefully without throwing
        imageBase64 = null;
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 90% 10%, #064e3b 0%, #09090b 60%)',
          padding: '48px 56px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: '24px',
            borderBottom: '1px solid #27272a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '24px',
                color: '#000000',
              }}
            >
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '0.05em' }}>
                PROBOARD SHOP
              </span>
              <span style={{ fontSize: '12px', color: '#a1a1aa', letterSpacing: '0.15em' }}>
                PREMIUM BOARDSTORE • proboardshop.ua
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              fontSize: '13px',
              fontWeight: 700,
              color: '#10b981',
            }}
          >
            <span>● 2026/2027 СЕЗОН</span>
          </div>
        </div>

        {/* Main Body */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            padding: '24px 0',
            gap: '40px',
          }}
        >
          {/* Left Info Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              maxWidth: '680px',
            }}
          >
            {/* Vendor badge */}
            <div style={{ display: 'flex', marginBottom: '14px' }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: '#10b981',
                  backgroundColor: '#064e3b40',
                  border: '1px solid #059669',
                  padding: '4px 14px',
                  borderRadius: '6px',
                }}
              >
                {vendor}
              </span>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontSize: title.length > 35 ? '38px' : '48px',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>

            {/* Spec tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {flex && (
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#e4e4e7',
                  }}
                >
                  ⚡ Жорсткість: {flex}
                </div>
              )}
              {camber && (
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#e4e4e7',
                  }}
                >
                  🏔️ Прогин: {camber}
                </div>
              )}
              {terrain && (
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#e4e4e7',
                  }}
                >
                  ❄️ {terrain}
                </div>
              )}
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span style={{ fontSize: '42px', fontWeight: 900, color: '#10b981' }}>
                {price}
              </span>
              <span style={{ fontSize: '14px', color: '#a1a1aa' }}>
                Оригінал • Післяплата Нова Пошта • 14 днів обмін
              </span>
            </div>
          </div>

          {/* Right Image Column */}
          <div
            style={{
              width: '360px',
              height: '380px',
              borderRadius: '24px',
              backgroundColor: '#18181b',
              border: '2px solid #27272a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {imageBase64 ? (
              <img
                src={imageBase64}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#71717a',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '64px', marginBottom: '8px' }}>🏂</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                  PROBOARD GEAR
                </span>
                <span style={{ fontSize: '12px', color: '#a1a1aa' }}>100% Authentic</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #27272a',
            fontSize: '13px',
            color: '#71717a',
          }}
        >
          <span>proboardshop.ua • Офіційний склад бордспорту в Україні</span>
          <span style={{ color: '#10b981' }}>✓ Гарантія надійності та швидка доставка</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
