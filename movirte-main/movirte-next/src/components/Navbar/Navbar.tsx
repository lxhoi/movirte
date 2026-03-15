"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { NAV_ITEMS } from "@/lib/navigation";

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSubnav: string | null;
  onSubnavToggle: (label: string) => void;
}

const ChevronIcon = () => (
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar({ collapsed, onToggle, activeSubnav, onSubnavToggle }: NavbarProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <nav ref={ref} className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.heading}>
            <Link href="/" className={styles.logo}>
              <Image src="/brand-assets/homepage-logo.svg" alt="MOVIRTE" width={90} height={22} priority />
            </Link>
          </div>

          {/* Nav links */}
          <div className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <span key={item.label} className={styles.row}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={styles.link}
                      onClick={() => onSubnavToggle(item.label)}
                    >
                      {item.label}
                    </button>
                    <button
                      type="button"
                      className={`${styles.chevron} ${activeSubnav === item.label ? styles.chevronOpen : ""}`}
                      onClick={() => onSubnavToggle(item.label)}
                      aria-label={`Open ${item.label} submenu`}
                      aria-expanded={activeSubnav === item.label}
                    >
                      <ChevronIcon />
                    </button>
                  </>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </nav>

      {/* Toggle button */}
      <button
        type="button"
        className={`${styles.toggle} ${collapsed ? styles.toggleX : ""}`}
        onClick={onToggle}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.tbar} />
        <span className={styles.tbar} />
        <span className={styles.tbar} />
      </button>
    </>
  );
}
