"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./TopBar.module.css";

interface TopBarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

export default function TopBar({ onSearchOpen, onCartOpen }: TopBarProps) {
  return (
    <header className={styles.bar}>
      {/* Profile */}
      <Link href="/sign-in" className={styles.iconBtn} aria-label="Sign in">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>

      {/* Center logo */}
      <Link href="/" className={styles.logo}>
        <Image src="/brand-assets/homepage-logo.svg" alt="MOVIRTE" width={120} height={28} priority />
      </Link>

      {/* Right icons */}
      <div className={styles.icons}>
        <button type="button" className={styles.iconBtn} onClick={onSearchOpen} aria-label="Search">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button type="button" className={styles.iconBtn} onClick={onCartOpen} aria-label="Open cart">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}
