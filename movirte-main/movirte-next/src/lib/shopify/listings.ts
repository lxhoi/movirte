import type { Product } from "./types";
import { fetchCollection, fetchProducts, type CollectionSortKey, type ProductSortKey } from "./api";
import type { ProductCardData } from "@/components/ProductCard/ProductCard";

function formatMoney(amount: string, currencyCode: string) {
  const symbol = currencyCode === "GBP" ? "£" : currencyCode === "USD" ? "$" : `${currencyCode} `;
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}

export function mapShopifyProductToCard(product: Product): ProductCardData {
  const primaryImage = product.images.edges[0]?.node?.url ?? "/products/black acorn/ACRONHOODIE.webp";
  const hoverImage = product.images.edges[1]?.node?.url;
  const minPrice = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    vendor: product.vendor,
    image: primaryImage,
    hoverImage,
    price: formatMoney(minPrice.amount, minPrice.currencyCode),
    compareAtPrice:
      compareAt.amount !== "0" && parseFloat(compareAt.amount) > parseFloat(minPrice.amount)
        ? formatMoney(compareAt.amount, compareAt.currencyCode)
        : undefined,
  };
}

export async function fetchProductCards(opts?: {
  first?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
}) {
  const data = await fetchProducts(opts);
  return data.products.map(mapShopifyProductToCard);
}

export async function fetchCollectionCards(handles: string[], opts?: {
  first?: number;
  sortKey?: CollectionSortKey;
  reverse?: boolean;
}) {
  for (const handle of handles) {
    const collection = await fetchCollection({ handle, ...opts });
    const items = collection?.products?.items ?? [];
    if (items.length > 0) {
      return {
        title: collection?.title,
        description: collection?.description,
        image: collection?.image?.url,
        products: items.map(mapShopifyProductToCard),
      };
    }
  }

  return null;
}
