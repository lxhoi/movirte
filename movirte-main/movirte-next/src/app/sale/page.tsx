import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchCollectionCards } from "@/lib/shopify/listings";

export const metadata: Metadata = {
  title: "Sale",
  description: "Shop MOVIRTE on sale. Luxury fashion at reduced prices.",
};

export default async function SalePage() {
  const collection = await fetchCollectionCards(["sale"], {
    first: 24,
    sortKey: "BEST_SELLING",
  }).catch(() => null);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Sale"
        description="Selected pieces at reduced prices. While stocks last."
        products={collection?.products ?? []}
      />
    </>
  );
}
