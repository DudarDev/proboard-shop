import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle, getRelatedProducts, FALLBACK_PRODUCTS } from '@/lib/shopify';
import { ProductDetailClient } from './ProductDetailClient';
import { Metadata } from 'next';

interface Props {
  params: {
    handle: string;
  };
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    return {
      title: 'Товар не знайдено | PROBOARD SHOP',
    };
  }

  const productUrl = `${siteUrl}/products/${product.handle}`;
  const rawImage = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;
  const imageUrl = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${siteUrl}${rawImage}`
    : undefined;

  return {
    title: `${product.title} | PROBOARD STORE • proboardshop.ua`,
    description: product.description?.slice(0, 160) || 'Офіційний магазин та спорядження PROBOARD SHOP',
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.title} • PROBOARD SHOP`,
      description: product.description?.slice(0, 200),
      url: productUrl,
      siteName: 'PROBOARD SHOP',
      locale: 'uk_UA',
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description?.slice(0, 200),
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export function generateStaticParams() {
  return FALLBACK_PRODUCTS.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(params.handle);

  const productUrl = `${siteUrl}/products/${product.handle}`;
  const rawImage = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;
  const imageUrl = rawImage
    ? rawImage.startsWith('http')
      ? rawImage
      : `${siteUrl}${rawImage}`
    : undefined;

  const firstVariant = product.variants?.edges?.[0]?.node;
  const price = product.priceRange?.minVariantPrice?.amount || firstVariant?.price?.amount || '460';
  const currency = product.priceRange?.minVariantPrice?.currencyCode || firstVariant?.price?.currencyCode || 'USD';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.title,
        description: product.description,
        image: imageUrl ? [imageUrl] : [],
        sku: firstVariant?.id || product.handle,
        brand: {
          '@type': 'Brand',
          name: product.vendor || 'PROBOARD',
        },
        offers: {
          '@type': 'Offer',
          price: price,
          priceCurrency: currency,
          availability:
            product.availableForSale !== false
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          url: productUrl,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'PROBOARD SHOP',
          },
        },
        ...(product.rating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.reviewCount || 12,
              },
            }
          : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Головна',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: product.productType || 'Сноуборди',
            item: `${siteUrl}/#catalog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.title,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ProductDetailClient product={product} relatedProducts={related} />
    </>
  );
}
