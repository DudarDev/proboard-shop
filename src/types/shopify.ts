export interface ShopifyImage {
  id?: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale?: boolean;
  price: ShopifyPrice;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale?: boolean;
  featuredImage?: ShopifyImage;
  images?: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants?: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  priceRange?: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  tags?: string[];
  productType?: string;
  vendor?: string;
}

export interface CartItem {
  id: string; // variant id
  productId: string;
  title: string;
  variantTitle: string;
  price: ShopifyPrice;
  quantity: number;
  image?: string;
  handle: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage;
}
