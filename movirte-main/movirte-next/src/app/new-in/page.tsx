import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";

export const metadata: Metadata = {
  title: "New In",
  description: "Discover the latest arrivals from MOVIRTE. Fresh designs, quiet luxury.",
};

/* TODO: Replace with fetchProducts({ sortKey: "CREATED_AT", reverse: true }) when Shopify is live */
const PLACEHOLDER_PRODUCTS = [
  { id: "1", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
  { id: "2", handle: "acron-graphic-tee", title: "Acron Graphic Tee", price: "£85", image: "/products/black acorn/acrontee.jpg" },
  { id: "3", handle: "acron-hoodie-black", title: "Acron Hoodie — Black", price: "£120", image: "/products/black acorn/ACRONHOODIE.webp" },
  { id: "4", handle: "noir-heritage-pant", title: "Noir Heritage Pant", price: "£145", image: "/products/noir heritage pants/8904.webp" },
];

export default function NewInPage() {
  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="New In"
        description="The latest additions to our collection. Discover new pieces crafted with meticulous attention to detail."
        products={PLACEHOLDER_PRODUCTS}
      />
    </>
  );
}
