import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchCollectionCards } from "@/lib/shopify/listings";

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

export default async function GiftingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = GIFTING_PAGES[slug];
  if (!page) notFound();
  const collection = await fetchCollectionCards(
    [`gifting-${slug}`, slug],
    { first: 24, sortKey: "BEST_SELLING" }
  ).catch(() => null);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title={page.title}
        description={page.description}
        products={collection?.products ?? []}
        bannerImage={collection?.image}
        bannerAlt={collection?.title ?? page.title}
      />
    </>
  );
}
