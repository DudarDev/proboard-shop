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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  if (!product) {
    return {
      title: 'Товар не знайдено | PROBOARD SHOP',
    };
  }
  return {
    title: `${product.title} | PROBOARD TACTICS • proboardshop.ua`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [product.featuredImage.url] : [],
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

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
