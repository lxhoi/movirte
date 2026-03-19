import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPage from "@/components/CollectionPage/CollectionPage";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import { fetchCollectionCards } from "@/lib/shopify/listings";

/** Men's category definitions — slug to display info */
const MEN_CATEGORIES: Record<string, { title: string; description: string }> = {
  "sale": { title: "Men's Sale", description: "Reduced pieces from the men's collection." },
  sweatshirts: { title: "Men's Sweatshirts", description: "Luxury sweatshirts and hoodies for men." },
  "t-shirts": { title: "Men's T-Shirts", description: "Premium cotton tees with signature MOVIRTE details." },
  shirts: { title: "Men's Shirts", description: "Contemporary shirts from casual to tailored." },
  outerwear: { title: "Men's Outerwear", description: "Jackets, coats, and layering pieces." },
  denim: { title: "Men's Denim", description: "Premium denim with a refined fit." },
  trousers: { title: "Men's Trousers & Bottoms", description: "Tailored trousers and relaxed bottoms." },
  shorts: { title: "Men's Shorts", description: "Casual and tailored shorts for the season." },
  "hats-caps": { title: "Men's Hats & Caps", description: "Trucker caps, beanies, and accessories." },
  accessories: { title: "Men's Accessories", description: "Bags, wallets, belts, and finishing touches." },
};

export async function generateStaticParams() {
  return Object.keys(MEN_CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = MEN_CATEGORIES[category];
  if (!cat) return { title: "Not Found" };
  return { title: cat.title, description: cat.description };
}

export default async function MenCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = MEN_CATEGORIES[category];
  if (!cat) notFound();
  const collection = await fetchCollectionCards(
    [`men-${category}`, category],
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
