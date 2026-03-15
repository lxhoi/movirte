import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import HeroCanvas from "@/components/HeroCanvas/HeroCanvas";
import EditorialSlideshow from "@/components/EditorialSlideshow/EditorialSlideshow";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import EditorialBanner from "@/components/EditorialBanner/EditorialBanner";
import StockistBar from "@/components/StockistBar/StockistBar";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";

export default function Home() {
  return (
    <>
      {/* Hero scroll-driven canvas animation (desktop only) */}
      <HeroCanvas />

      {/* Main content — appears after hero scroll on desktop, immediately on mobile */}
      <section id="product-section" style={{ position: "relative", zIndex: 2 }}>
        {/* Announcement strip */}
        <AnnouncementStrip />

        {/* Editorial hero slideshow */}
        <EditorialSlideshow />

        {/* Product grid with category tabs */}
        <div style={{ padding: "0 24px" }}>
          <ProductGrid />
        </div>

        {/* Featured collection banner */}
        <EditorialBanner
          imageSrc="/products/noir heritage pants/8904.webp"
          imageAlt="Noir Heritage Collection"
          label="Featured — Noir Heritage"
          heading={
            <>
              Heritage meets<br /><em>modern edge.</em>
            </>
          }
          ctaText="EXPLORE COLLECTION"
          ctaHref="/collections/noir-heritage"
        />

        {/* Stockist logos */}
        <StockistBar />

        {/* Features bar */}
        <FeaturesBar />
      </section>
    </>
  );
}
