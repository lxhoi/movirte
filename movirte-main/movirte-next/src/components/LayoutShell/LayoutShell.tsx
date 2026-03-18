"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar/TopBar";
import Navbar from "@/components/Navbar/Navbar";
import SubnavPanel from "@/components/SubnavPanel/SubnavPanel";
import MobileHeader from "@/components/MobileHeader/MobileHeader";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { MEN_ITEMS, WOMEN_ITEMS, GIFTING_ITEMS } from "@/lib/navigation";

const SUBNAV_DATA: Record<string, { label: string; items: typeof MEN_ITEMS }> = {
  Men: { label: "Men", items: MEN_ITEMS },
  Women: { label: "Women", items: WOMEN_ITEMS },
  Gifting: { label: "Gifting", items: GIFTING_ITEMS },
};

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [navCollapsed, setNavCollapsed] = useState(false);
  const [activeSubnav, setActiveSubnav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleSubnavToggle = useCallback((label: string) => {
    setActiveSubnav((prev) => (prev === label ? null : label));
  }, []);

  const handleNavToggle = useCallback(() => {
    setNavCollapsed((c) => !c);
    setActiveSubnav(null);
  }, []);

  return (
    <>
      {/* Desktop nav — only on inner pages (homepage has its own NavOverlay) */}
      {!isHomepage && (
        <>
          <TopBar
            onSearchOpen={() => setSearchOpen(true)}
            onCartOpen={() => setCartOpen(true)}
          />
          <Navbar
            collapsed={navCollapsed}
            onToggle={handleNavToggle}
            activeSubnav={activeSubnav}
            onSubnavToggle={handleSubnavToggle}
          />
          {Object.entries(SUBNAV_DATA).map(([key, { label, items }]) => (
            <SubnavPanel
              key={key}
              label={label}
              items={items}
              open={activeSubnav === key}
              onClose={() => setActiveSubnav(null)}
            />
          ))}
        </>
      )}

      {/* Mobile — always present */}
      <MobileHeader onCartOpen={() => setCartOpen(true)} />

      {/* Overlays — only on inner pages (homepage manages its own) */}
      {!isHomepage && (
        <>
          <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
      )}
      <ChatWidget />

      {/* Page content — no top padding on homepage */}
      <main style={{ paddingTop: isHomepage ? 0 : 50 }}>{children}</main>
    </>
  );
}
