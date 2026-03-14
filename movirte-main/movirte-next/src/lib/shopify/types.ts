/* ─── Shopify Storefront API Types ───────────────────────────── */

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  vendor: string;
  productType: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  images: {
    edges: { node: ShopifyImage }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
  options: ProductOption[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products?: {
    edges: { node: Product; cursor: string }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: MoneyV2;
    compareAtPrice: MoneyV2 | null;
    image: ShopifyImage | null;
    product: {
      title: string;
      handle: string;
    };
    selectedOptions?: { name: string; value: string }[];
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  note: string | null;
  cost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
  };
  lines: {
    edges: { node: CartLine }[];
  };
}

/* ─── Query Response Types ───────────────────────────────────── */

export interface GetProductByHandleResponse {
  productByHandle: Product | null;
}

export interface GetProductsResponse {
  products: {
    edges: { node: Product; cursor: string }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface GetCollectionByHandleResponse {
  collection: Collection | null;
}

export interface GetCollectionsResponse {
  collections: {
    edges: { node: Collection }[];
  };
}

export interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
    userErrors: { field: string; message: string }[];
  };
}

export interface GetCartResponse {
  cart: Cart | null;
}
