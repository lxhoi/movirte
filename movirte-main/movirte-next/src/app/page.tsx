"use client";

import { useRef, useCallback } from "react";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import HeroCanvas from "@/components/HeroCanvas/HeroCanvas";
import NavOverlay, { NavOverlayHandle } from "@/components/NavOverlay/NavOverlay";
import SubnavPanel from "@/components/SubnavPanel/SubnavPanel";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import EditorialSlideshow from "@/components/EditorialSlideshow/EditorialSlideshow";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import EditorialBanner from "@/components/EditorialBanner/EditorialBanner";
import StockistBar from "@/components/StockistBar/StockistBar";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import Footer from "@/components/Footer/Footer";
import { MEN_ITEMS, WOMEN_ITEMS, GIFTING_ITEMS } from "@/lib/navigation";
import { useState } from "react";
import styles from "./home.module.css";

const SUBNAV_DATA: Record<string, { label: string; items: typeof MEN_ITEMS }> = {
  Men: { label: "Men", items: MEN_ITEMS },
  Women: { label: "Women", items: WOMEN_ITEMS },
  Gifting: { label: "Gifting", items: GIFTING_ITEMS },
};

export default function Home() {
  // Use ref for scrollFraction to avoid re-rendering on every scroll tick
  const scrollFractionRef = useRef(0);
  const navOverlayRef = useRef<NavOverlayHandle>(null);

  const [activeSubnav, setActiveSubnav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleScrollProgress = useCallback((fraction: number) => {
    scrollFractionRef.current = fraction;
    // Directly update NavOverlay without re-rendering
    navOverlayRef.current?.update(fraction);
  }, []);

  const handleSubnavToggle = useCallback((label: string) => {
    setActiveSubnav((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      {/* Nav Overlay — homepage scroll-driven navigation */}
      <NavOverlay
        ref={navOverlayRef}
        scrollFraction={0}
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

      {/* HeroCanvas + product-section overlay */}
      <HeroCanvas onScrollProgress={handleScrollProgress}>
        <div id="main-content" className={styles.mainContent}>
          <div className={`${styles.productGridWrap} ${styles.productGridWrapSettled}`}>
            <AnnouncementStrip />
            <EditorialSlideshow />

            <div className={styles.gridSection}>
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
            <Footer />
          </div>
        </div>
      </HeroCanvas>
    </>
  );
}
