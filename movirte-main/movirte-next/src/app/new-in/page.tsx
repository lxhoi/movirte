import { Metadata } from "next";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";

export const metadata: Metadata = {
  title: "New In",
  description: "Discover the latest arrivals from MOVIRTE. Fresh designs, quiet luxury.",
};

const PLACEHOLDER_PRODUCTS = [
  { id: "1", handle: "acron-hoodie-onyx", title: "Acron Hoodie — Onyx", price: "£120", image: "/products/black acorn/ACRONHOODIE.webp" },
  { id: "2", handle: "noir-heritage-pant", title: "Noir Heritage Pant", price: "£145", image: "/products/noir heritage pants/8904.webp" },
  { id: "3", handle: "acron-hoodie-cocoa", title: "Acron Hoodie — Cocoa", price: "£120", image: "/products/hoodie/ACRONHOODIE.webp" },
  { id: "4", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
  { id: "5", handle: "acron-graphic-tee", title: "Acron Graphic Tee", price: "£85", image: "/products/black acorn/acrontee.jpg" },
  { id: "6", handle: "noir-heritage-pant-washed", title: "Noir Heritage Pant — Washed", price: "£145", image: "/products/noir heritage pants/NHPANTS2.webp" },
  { id: "7", handle: "noir-cargo-pant", title: "Noir Cargo Pant", price: "£155", image: "/products/noir heritage pants/NHPANTS3.webp" },
  { id: "8", handle: "specialist-cap-slate", title: "Specialist Cap — Slate", price: "£72", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
  { id: "9", handle: "noir-relaxed-pant", title: "Noir Relaxed Pant", price: "£145", image: "/products/noir heritage pants/NHPANTS4.webp" },
  { id: "10", handle: "acron-tee-embroid", title: "Acron Tee — Embroid", price: "£85", image: "/products/black acorn/acrontee.jpg" },
  { id: "11", handle: "acron-heavyweight-hoodie", title: "Acron Heavyweight Hoodie", price: "£130", image: "/products/hoodie/ACRONHOODIE.webp" },
  { id: "12", handle: "specialist-cap-olive", title: "Specialist Cap — Olive", price: "£72", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
];

export default function NewInPage() {
  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="New In"
        description="The latest additions to our collection. Discover new pieces crafted with meticulous attention to detail."
        products={PLACEHOLDER_PRODUCTS}
        bannerImage="/products/hoodie/ACRONHOODIE.webp"
        bannerAlt="New Arrivals"
      />
    </>
  );
}
