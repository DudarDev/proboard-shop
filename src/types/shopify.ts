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
  compareAtPrice?: ShopifyPrice;
  selectedOptions?: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
}

export interface ShopifyMetafield {
  key: string;
  value: string;
  namespace: string;
  type?: string;
}

export interface BoardSpecs {
  flex?: string;
  flexRating?: number; // 1-10
  profile?: string;
  camberType?: 'camber' | 'rocker' | 'hybrid' | 'flat';
  shape?: string;
  terrain?: string;
  level?: string;
  gender?: 'men' | 'women' | 'unisex' | 'kids';
  subCategory?: string;
  origin?: string;
  warranty?: string;
  waistWidth?: string;
  features?: string[];
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
  compareAtPrice?: ShopifyPrice;
  isStaffPick?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  productType?: string;
  vendor?: string;
  specs?: BoardSpecs;
  metafields?: (ShopifyMetafield | null)[];
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

export interface ShopifyCartUserError {
  code?: string;
  field: string[];
  message: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}
