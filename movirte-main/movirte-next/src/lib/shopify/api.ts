/**
 * Shopify Storefront API — high-level data functions.
 *
 * Import these in Server Components or Route Handlers.
 * They wrap the low-level `shopifyFetch` client with typed queries.
 */

import { shopifyFetch } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTION_BY_HANDLE,
  GET_COLLECTIONS,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINE,
  REMOVE_FROM_CART,
  GET_CART,
  UPDATE_CART_NOTE,
} from "./queries";
import type {
  Product,
  Collection,
  Cart,
  GetProductsResponse,
  GetProductByHandleResponse,
  GetCollectionByHandleResponse,
  GetCollectionsResponse,
  CartCreateResponse,
  CartLinesAddResponse,
  CartLinesUpdateResponse,
  CartLinesRemoveResponse,
  GetCartResponse,
  CartNoteUpdateResponse,
} from "./types";

/* ─── Product Fetchers ────────────────────────────────────────── */

export type ProductSortKey =
  | "BEST_SELLING"
  | "CREATED_AT"
  | "PRICE"
  | "TITLE"
  | "RELEVANCE";

interface FetchProductsOpts {
  first?: number;
  after?: string;
  sortKey?: ProductSortKey;
  reverse?: boolean;
}

/**
 * Fetch a paginated list of products.
 */
export async function fetchProducts(opts: FetchProductsOpts = {}) {
  const { first = 24, after, sortKey = "BEST_SELLING", reverse = false } = opts;

  const data = await shopifyFetch<GetProductsResponse>({
    query: GET_PRODUCTS,
    variables: { first, after, sortKey, reverse },
  });

  return {
    products: data.products.edges.map((e) => e.node),
    pageInfo: data.products.pageInfo,
    cursors: data.products.edges.map((e) => e.cursor),
  };
}

/**
 * Fetch a single product by its URL handle.
 */
export async function fetchProductByHandle(
  handle: string
): Promise<Product | null> {
  const data = await shopifyFetch<GetProductByHandleResponse>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  return data.productByHandle;
}

/* ─── Collection Fetchers ─────────────────────────────────────── */

export type CollectionSortKey =
  | "BEST_SELLING"
  | "CREATED"
  | "PRICE"
  | "TITLE"
  | "MANUAL"
  | "RELEVANCE";

interface FetchCollectionOpts {
  handle: string;
  first?: number;
  after?: string;
  sortKey?: CollectionSortKey;
  reverse?: boolean;
}

/**
 * Fetch a single collection and its products by handle.
 */
export async function fetchCollection(opts: FetchCollectionOpts) {
  const {
    handle,
    first = 24,
    after,
    sortKey = "BEST_SELLING",
    reverse = false,
  } = opts;

  const data = await shopifyFetch<GetCollectionByHandleResponse>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first, after, sortKey, reverse },
  });

  if (!data.collection) return null;

  return {
    ...data.collection,
    products: data.collection.products
      ? {
          items: data.collection.products.edges.map((e) => e.node),
          pageInfo: data.collection.products.pageInfo,
          cursors: data.collection.products.edges.map((e) => e.cursor),
        }
      : undefined,
  };
}

/**
 * Fetch all collections (without products).
 */
export async function fetchCollections(
  first: number = 50
): Promise<Collection[]> {
  const data = await shopifyFetch<GetCollectionsResponse>({
    query: GET_COLLECTIONS,
    variables: { first },
  });

  return data.collections.edges.map((e) => e.node);
}

/* ─── Cart Operations ─────────────────────────────────────────── */

/**
 * Create a new Shopify cart, optionally with initial line items.
 */
export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart> {
  const data = await shopifyFetch<CartCreateResponse>({
    query: CREATE_CART,
    variables: { input: { lines } },
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartCreate.cart;
}

/**
 * Add line items to an existing cart.
 */
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesAddResponse>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartLinesAdd.cart;
}

/**
 * Update quantities of existing cart lines.
 */
export async function updateCartLine(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesUpdateResponse>({
    query: UPDATE_CART_LINE,
    variables: { cartId, lines },
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartLinesUpdate.cart;
}

/**
 * Remove line items from a cart.
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesRemoveResponse>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartLinesRemove.cart;
}

/**
 * Fetch an existing cart by its ID.
 */
export async function fetchCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<GetCartResponse>({
    query: GET_CART,
    variables: { cartId },
  });

  return data.cart;
}

/**
 * Update the note on a cart (order notes).
 */
export async function updateCartNote(
  cartId: string,
  note: string
): Promise<Cart> {
  const data = await shopifyFetch<CartNoteUpdateResponse>({
    query: UPDATE_CART_NOTE,
    variables: { cartId, note },
  });

  if (data.cartNoteUpdate.userErrors.length > 0) {
    throw new Error(
      data.cartNoteUpdate.userErrors.map((e) => e.message).join("\n")
    );
  }

  return data.cartNoteUpdate.cart;
}
