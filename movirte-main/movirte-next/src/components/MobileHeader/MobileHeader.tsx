"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./MobileHeader.module.css";
import { NAV_ITEMS } from "@/lib/navigation";

interface MobileHeaderProps {
  onCartOpen: () => void;
}

export default function MobileHeader({ onCartOpen }: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const openDrawer = () => {
    setDrawerOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setExpandedItem(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* Mobile top header */}
      <header className={styles.header}>
        <button className={styles.burger} onClick={openDrawer} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <Link href="/" className={styles.logo}>
          <Image src="/brand-assets/homepage-logo.svg" alt="MOVIRTE" width={100} height={24} priority />
        </Link>
        <button className={styles.bagBtn} onClick={onCartOpen}>
          Bag (0)
        </button>
      </header>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayOpen : ""}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <nav className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
        <button className={styles.close} onClick={closeDrawer} aria-label="Close menu">
          ✕
        </button>
        <Link href="/" className={styles.drawerLogo} onClick={closeDrawer}>
          <Image src="/brand-assets/homepage-logo.svg" alt="MOVIRTE" width={100} height={24} />
        </Link>
        <div className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className={styles.navLink}
                    onClick={() =>
                      setExpandedItem(expandedItem === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <svg
                      className={`${styles.navChevron} ${expandedItem === item.label ? styles.navChevronOpen : ""}`}
                      width="10" height="7" viewBox="0 0 10 7" fill="none"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {expandedItem === item.label && (
                    <div className={styles.subItems}>
                      {item.children.map((sub) => (
                        <Link key={sub.href} href={sub.href} className={styles.subLink} onClick={closeDrawer}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} className={styles.navLink} onClick={closeDrawer}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
