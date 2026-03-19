import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchCollectionCards } from "@/lib/shopify/listings";

const WOMEN_CATEGORIES: Record<string, { title: string; description: string }> = {
  "new-in": { title: "Women's New In", description: "The latest arrivals in women's fashion." },
  "new-in-w": { title: "Women's New In", description: "The latest arrivals in women's fashion." },
  sale: { title: "Women's Sale", description: "Reduced pieces from the women's collection." },
  sweats: { title: "Women's Sweatshirts", description: "Luxury sweatshirts and hoodies for women." },
  "t-shirts": { title: "Women's T-Shirts", description: "Premium cotton tees with feminine silhouettes." },
  shirts: { title: "Women's Shirts", description: "Contemporary women's shirts." },
  outerwear: { title: "Women's Outerwear", description: "Jackets and coats for her." },
  denim: { title: "Women's Denim", description: "Premium denim with refined fits." },
  trousers: { title: "Women's Trousers & Bottoms", description: "Tailored trousers and relaxed bottoms." },
  shorts: { title: "Women's Shorts", description: "Casual and tailored shorts." },
  "hats-caps": { title: "Women's Hats & Caps", description: "Caps, beanies, and accessories." },
  accessories: { title: "Women's Accessories", description: "Bags, jewellery, and finishing touches." },
};

export async function generateStaticParams() {
  return Object.keys(WOMEN_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = WOMEN_CATEGORIES[category];
  if (!cat) return { title: "Not Found" };
  return { title: cat.title, description: cat.description };
}

export default async function WomenCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = WOMEN_CATEGORIES[category];
  if (!cat) notFound();
  const collection = await fetchCollectionCards(
    [`women-${category}`, category],
    { first: 24, sortKey: category === "sale" ? "PRICE" : "BEST_SELLING" }
  ).catch(() => null);

  return (
    <>
      <AnnouncementStrip />
      <CollectionPage
        title={cat.title}
        description={cat.description}
        products={collection?.products ?? []}
        bannerImage={collection?.image}
        bannerAlt={collection?.title ?? cat.title}
      />
    </>
  );
}
