import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "Our most popular pieces. Discover MOVIRTE best sellers loved by our community.",
};

const PLACEHOLDER_PRODUCTS = [
  { id: "1", handle: "acron-hoodie-black", title: "Acron Hoodie — Black", price: "£120", image: "/products/black acorn/ACRONHOODIE.webp" },
  { id: "2", handle: "noir-heritage-pant", title: "Noir Heritage Pant", price: "£145", image: "/products/noir heritage pants/8904.webp" },
  { id: "3", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
  { id: "4", handle: "acron-graphic-tee", title: "Acron Graphic Tee", price: "£85", image: "/products/black acorn/acrontee.jpg" },
];

export default function BestSellersPage() {
  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Best Sellers"
        description="Our most loved pieces, curated by community favourites."
        products={PLACEHOLDER_PRODUCTS}
      />
    </>
  );
}
