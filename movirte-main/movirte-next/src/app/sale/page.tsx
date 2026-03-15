import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";

export const metadata: Metadata = {
  title: "Sale",
  description: "Shop MOVIRTE on sale. Luxury fashion at reduced prices.",
};

const PLACEHOLDER_PRODUCTS = [
  { id: "1", handle: "acron-graphic-tee", title: "Acron Graphic Tee", price: "£59", compareAtPrice: "£85", image: "/products/black acorn/acrontee.jpg" },
  { id: "2", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£48", compareAtPrice: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
];

export default function SalePage() {
  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Sale"
        description="Selected pieces at reduced prices. While stocks last."
        products={PLACEHOLDER_PRODUCTS}
      />
    </>
  );
}
