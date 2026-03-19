import { Metadata } from "next";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import CollectionPage from "@/components/CollectionPage/CollectionPage";

export const metadata: Metadata = {
  title: "Collections & Capsules",
  description: "Explore curated MOVIRTE collections and capsule edits.",
};

const COLLECTION_PRODUCTS = [
  {
    id: "1",
    handle: "acron-hoodie-onyx",
    title: "Acron Hoodie - Onyx",
    price: "£120",
    image: "/products/black acorn/ACRONHOODIE.webp",
  },
  {
    id: "2",
    handle: "noir-heritage-pant",
    title: "Noir Heritage Pant",
    price: "£145",
    image: "/products/noir heritage pants/8904.webp",
  },
  {
    id: "3",
    handle: "specialist-trucker-cap",
    title: "Specialist Trucker Cap",
    price: "£68",
    image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
  },
  {
    id: "4",
    handle: "acron-graphic-tee",
    title: "Acron Graphic Tee",
    price: "£85",
    image: "/products/black acorn/acrontee.jpg",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title="Collections & Capsules"
        description="Curated edits, capsule releases, and signature pieces from the MOVIRTE world."
        products={COLLECTION_PRODUCTS}
        bannerImage="/products/noir heritage pants/8904.webp"
        bannerAlt="Collections and Capsules"
      />
    </>
  );
}
