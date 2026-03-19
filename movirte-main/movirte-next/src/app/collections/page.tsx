import { Metadata } from "next";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import { fetchCollections } from "@/lib/shopify/api";
import { fetchCollectionCards, fetchProductCards } from "@/lib/shopify/listings";

export const metadata: Metadata = {
  title: "Collections & Capsules",
  description: "Explore curated MOVIRTE collections and capsule edits.",
};

export default async function CollectionsPage() {
  const collections = await fetchCollections(8).catch(() => []);
  const preferredHandles = collections.map((collection) => collection.handle);
  const featured = await fetchCollectionCards(preferredHandles, {
    first: 24,
    sortKey: "MANUAL",
  }).catch(() => null);
  const products = featured?.products.length
    ? featured.products
    : await fetchProductCards({ first: 24, sortKey: "BEST_SELLING" }).catch(() => []);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Collections & Capsules"
        description="Curated edits, capsule releases, and signature pieces from the MOVIRTE world."
        products={products}
        bannerImage={featured?.image ?? "/products/noir heritage pants/8904.webp"}
        bannerAlt={featured?.title ?? "Collections and Capsules"}
      />
    </>
  );
}
