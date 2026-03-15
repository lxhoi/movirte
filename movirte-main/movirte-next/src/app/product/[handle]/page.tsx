import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductByHandle } from "@/lib/shopify/api";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import type { Product } from "@/lib/shopify/types";

/**
 * Fallback product data when Shopify API is not yet populated.
 * This lets the page render during development / before the store has products.
 */
function getFallbackProduct(handle: string): Product {
  return {
    id: `gid://shopify/Product/${handle}`,
    handle,
    title: handle
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: "A premium piece from the MOVIRTE collection. Crafted with meticulous attention to detail.",
    descriptionHtml:
      "<p>A premium piece from the MOVIRTE collection. Crafted with meticulous attention to detail.</p><ul><li>100% Premium Cotton</li><li>Heavy-weight fabric</li><li>Signature embroidery</li><li>Made in Portugal</li></ul>",
    tags: [],
    vendor: "MOVIRTE",
    productType: "Apparel",
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: "120.00", currencyCode: "GBP" },
      maxVariantPrice: { amount: "120.00", currencyCode: "GBP" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "GBP" },
      maxVariantPrice: { amount: "0", currencyCode: "GBP" },
    },
    images: {
      edges: [
        { node: { url: "/products/black acorn/ACRONHOODIE.webp", altText: "Product front", width: 800, height: 1067 } },
        { node: { url: "/products/black acorn/acrontee.jpg", altText: "Product back", width: 800, height: 1067 } },
        { node: { url: "/products/noir heritage pants/8904.webp", altText: "Product detail", width: 800, height: 1067 } },
      ],
    },
    variants: {
      edges: ["XS", "S", "M", "L", "XL"].map((size) => ({
        node: {
          id: `gid://shopify/ProductVariant/${handle}-${size}`,
          title: `${size} / Black`,
          availableForSale: size !== "XXL",
          price: { amount: "120.00", currencyCode: "GBP" },
          compareAtPrice: null,
          selectedOptions: [
            { name: "Size", value: size },
            { name: "Color", value: "Black" },
          ],
          image: null,
        },
      })),
    },
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Black"] },
    ],
  };
}

const RELATED_PRODUCTS = [
  { id: "r1", handle: "acron-graphic-tee", title: "Acron Graphic Tee", price: "£85", image: "/products/black acorn/acrontee.jpg" },
  { id: "r2", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
  { id: "r3", handle: "noir-heritage-pant", title: "Noir Heritage Pant", price: "£145", image: "/products/noir heritage pants/8904.webp" },
  { id: "r4", handle: "acron-hoodie-black", title: "Acron Hoodie — Black", price: "£120", image: "/products/black acorn/ACRONHOODIE.webp" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  let product: Product | null = null;

  try {
    product = await fetchProductByHandle(handle);
  } catch {
    /* fallback below */
  }

  if (!product) product = getFallbackProduct(handle);

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.images.edges[0]
        ? [{ url: product.images.edges[0].node.url }]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  let product: Product | null = null;

  try {
    product = await fetchProductByHandle(handle);
  } catch {
    /* API not available — use fallback */
  }

  if (!product) {
    product = getFallbackProduct(handle);
  }

  return (
    <>
      <AnnouncementStrip />
      <ProductDetail product={product} />
      <RelatedProducts products={RELATED_PRODUCTS} />
      <FeaturesBar />
    </>
  );
}
