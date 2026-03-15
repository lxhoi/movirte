import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";

const GIFTING_PAGES: Record<string, { title: string; description: string }> = {
  "gift-for-him": { title: "Gift for Him", description: "Curated luxury gifts for him. Hoodies, tees, caps, and accessories." },
  "gift-for-her": { title: "Gift for Her", description: "Thoughtful luxury gifts for her. Selected pieces she'll love." },
  lifestyle: { title: "Lifestyle", description: "Lifestyle pieces and home accessories from MOVIRTE." },
  "gift-cards": { title: "Gift Cards", description: "MOVIRTE gift cards — let them choose their own favourites." },
};

export async function generateStaticParams() {
  return Object.keys(GIFTING_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = GIFTING_PAGES[slug];
  if (!page) return { title: "Not Found" };
  return { title: page.title, description: page.description };
}

const PLACEHOLDER = [
  { id: "1", handle: "acron-hoodie-black", title: "Acron Hoodie — Black", price: "£120", image: "/products/black acorn/ACRONHOODIE.webp" },
  { id: "2", handle: "specialist-trucker-cap", title: "Specialist Trucker Cap", price: "£68", image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp" },
];

export default async function GiftingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = GIFTING_PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage title={page.title} description={page.description} products={PLACEHOLDER} />
    </>
  );
}
