import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchProductCards } from "@/lib/shopify/listings";

export const metadata: Metadata = {
  title: "New In",
  description: "Discover the latest arrivals from MOVIRTE. Fresh designs, quiet luxury.",
};

export default async function NewInPage() {
  const products = await fetchProductCards({
    first: 24,
    sortKey: "CREATED_AT",
    reverse: true,
  }).catch(() => []);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="New In"
        description="The latest additions to our collection. Discover new pieces crafted with meticulous attention to detail."
        products={products}
        bannerImage="/products/hoodie/ACRONHOODIE.webp"
        bannerAlt="New Arrivals"
      />
    </>
  );
}
