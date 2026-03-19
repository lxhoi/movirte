import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchProductCards } from "@/lib/shopify/listings";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Our most popular pieces. Discover MOVIRTE best sellers loved by our community.",
};

export default async function BestSellersPage() {
  const products = await fetchProductCards({
    first: 24,
    sortKey: "BEST_SELLING",
  }).catch(() => []);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Best Sellers"
        description="Our most loved pieces, curated by community favourites."
        products={products}
        bannerImage="/products/black acorn/ACRONHOODIE.webp"
        bannerAlt="Best Sellers"
      />
    </>
  );
}
