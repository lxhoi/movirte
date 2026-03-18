"use client";

import { useState, useCallback } from "react";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import HeroCanvas from "@/components/HeroCanvas/HeroCanvas";
import NavOverlay from "@/components/NavOverlay/NavOverlay";
import SubnavPanel from "@/components/SubnavPanel/SubnavPanel";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import EditorialSlideshow from "@/components/EditorialSlideshow/EditorialSlideshow";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import EditorialBanner from "@/components/EditorialBanner/EditorialBanner";
import StockistBar from "@/components/StockistBar/StockistBar";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import { MEN_ITEMS, WOMEN_ITEMS, GIFTING_ITEMS } from "@/lib/navigation";

const SUBNAV_DATA: Record<string, { label: string; items: typeof MEN_ITEMS }> = {
  Men: { label: "Men", items: MEN_ITEMS },
  Women: { label: "Women", items: WOMEN_ITEMS },
  Gifting: { label: "Gifting", items: GIFTING_ITEMS },
};

export default function Home() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeSubnav, setActiveSubnav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleScrollProgress = useCallback((fraction: number) => {
    setScrollFraction(fraction);
  }, []);

  const handleSubnavToggle = useCallback((label: string) => {
    setActiveSubnav((prev) => (prev === label ? null : label));
  }, []);

  const contentVisible = scrollFraction > 0.8;

  return (
    <>
      {/* Hero scroll-driven canvas animation (desktop only) */}
      <HeroCanvas onScrollProgress={handleScrollProgress} />

      {/* Nav Overlay — homepage-only scroll-driven navigation */}
      <NavOverlay
        scrollFraction={scrollFraction}
        onSearchOpen={() => setSearchOpen(true)}
        onCartOpen={() => setCartOpen(true)}
        onSubnavToggle={handleSubnavToggle}
        activeSubnav={activeSubnav}
      />

      {/* Subnav panels — Men / Women / Gifting */}
      {Object.entries(SUBNAV_DATA).map(([key, { label, items }]) => (
        <SubnavPanel
          key={key}
          label={label}
          items={items}
          open={activeSubnav === key}
          onClose={() => setActiveSubnav(null)}
        />
      ))}

      {/* Overlays */}
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main content — appears after hero scroll on desktop, immediately on mobile */}
      <section
        id="product-section"
        style={{
          position: "relative",
          zIndex: 2,
          opacity: contentVisible ? 1 : 0,
          pointerEvents: contentVisible ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <AnnouncementStrip />
        <EditorialSlideshow />
        <div style={{ padding: "0 24px" }}>
          <ProductGrid />
        </div>
        <EditorialBanner
          imageSrc="/products/noir heritage pants/8904.webp"
          imageAlt="Noir Heritage Collection"
          label="Featured — Noir Heritage"
          heading={<>Heritage meets<br /><em>modern edge.</em></>}
          ctaText="EXPLORE COLLECTION"
          ctaHref="/collections/noir-heritage"
        />
        <StockistBar />
        <FeaturesBar />
      </section>
    </>
  );
}
