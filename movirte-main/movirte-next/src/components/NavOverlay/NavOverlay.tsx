"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavOverlay.module.css";
import { NAV_ITEMS } from "@/lib/navigation";

interface NavOverlayProps {
  /** 0–1 scroll fraction, driven by HeroCanvas / LenisProvider */
  scrollFraction: number;
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onSubnavToggle: (label: string) => void;
  activeSubnav: string | null;
}

const ChevronIcon = () => (
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function NavOverlay({
  scrollFraction,
  onSearchOpen,
  onCartOpen,
  onSubnavToggle,
  activeSubnav,
}: NavOverlayProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const [titleFlown, setTitleFlown] = useState(false);
  const [subtitleFlown, setSubtitleFlown] = useState(false);
  const [itemsFlown, setItemsFlown] = useState(false);
  const [navSettled, setNavSettled] = useState(false);
  const [itemsHidden, setItemsHidden] = useState(false);

  // Drive all animations from scrollFraction
  useEffect(() => {
    const headingThreshold = 0.3;
    const settleThreshold = 0.8;

    // Glassmorphism border opacity — fades by 20% scroll
    if (contentRef.current) {
      const frameOpacity = Math.max(0, 1 - scrollFraction * 5);
      contentRef.current.style.setProperty("--frame-opacity", String(frameOpacity));
      (contentRef.current as HTMLElement).querySelector(":scope")?.parentElement;
      // Apply to ::before via inline var
    }

    // Title fly at 30%
    if (scrollFraction > headingThreshold) {
      if (!titleFlown && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const scaledHeight = rect.height * 0.38;
        const targetX = 68 - rect.left;
        const targetY = (25 - scaledHeight / 2) - rect.top;
        titleRef.current.style.setProperty("--fly-x", `${targetX}px`);
        titleRef.current.style.setProperty("--fly-y", `${targetY}px`);
        titleRef.current.style.transitionDelay = "0s";
        setTitleFlown(true);
      }
    } else {
      if (titleFlown && titleRef.current) {
        titleRef.current.style.transitionDelay = "0.12s";
        setTitleFlown(false);
      }
    }

    // Subtitle fly at 30%
    if (scrollFraction > headingThreshold) {
      if (!subtitleFlown && subtitleRef.current) {
        const rect = subtitleRef.current.getBoundingClientRect();
        const targetX = 32 - rect.left;
        const targetY = 24 - rect.top;
        subtitleRef.current.style.setProperty("--fly-x", `${targetX}px`);
        subtitleRef.current.style.setProperty("--fly-y", `${targetY}px`);
        subtitleRef.current.style.transitionDelay = "0.15s";
        setSubtitleFlown(true);
      }
    } else {
      if (subtitleFlown && subtitleRef.current) {
        subtitleRef.current.style.transitionDelay = "0s";
        setSubtitleFlown(false);
      }
    }

    // Nav items fly to bottom-left at 30%
    if (scrollFraction > headingThreshold) {
      if (!itemsFlown) {
        const items = itemRefs.current.filter(Boolean) as HTMLElement[];
        const rects = items.map((el) => el.getBoundingClientRect());
        const gap = 6;
        const totalHeight = rects.reduce((sum, r) => sum + r.height + gap, -gap);
        const stackTop = window.innerHeight - 32 - totalHeight;

        let accY = stackTop;
        items.forEach((el, j) => {
          const r = rects[j];
          const flyX = 32 - r.left;
          const flyY = accY - r.top;
          el.style.setProperty("--fly-x", `${flyX}px`);
          el.style.setProperty("--fly-y", `${flyY}px`);
          el.style.transitionDelay = `${j * 0.08}s`;
          accY += r.height + gap;
        });
        setItemsFlown(true);
      }
    } else {
      if (itemsFlown) {
        const items = itemRefs.current.filter(Boolean) as HTMLElement[];
        items.forEach((el, i) => {
          el.style.transitionDelay = `${(items.length - 1 - i) * 0.06}s`;
        });
        setItemsFlown(false);
      }
    }

    // Nav settles at 80%
    setNavSettled(scrollFraction > settleThreshold);

    // Reset hidden state if scroll goes back
    if (scrollFraction <= settleThreshold && itemsHidden) {
      setItemsHidden(false);
    }
  }, [scrollFraction, titleFlown, subtitleFlown, itemsFlown, itemsHidden]);

  const handleToggle = useCallback(() => {
    setItemsHidden((h) => !h);
  }, []);

  const isDark = scrollFraction > 0.8;

  return (
    <>
      {/* Nav overlay — centered panel */}
      <div className={`${styles.overlay} ${itemsHidden ? styles.itemsHidden : ""}`}>
        <div
          ref={contentRef}
          className={`${styles.content} ${isDark ? styles.contentDark : ""}`}
          style={{ "--frame-opacity": Math.max(0, 1 - scrollFraction * 5) } as React.CSSProperties}
        >
          {/* Heading */}
          <div className={styles.heading}>
            <h1
              ref={titleRef}
              className={`${styles.title} ${titleFlown ? styles.titleFlown : ""}`}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                <Image
                  src="/brand-assets/homepage-logo.svg"
                  alt="MOVIRTE"
                  width={180}
                  height={42}
                  className={styles.logoImg}
                  priority
                />
              </Link>
            </h1>
            <p
              ref={subtitleRef}
              className={`${styles.subtitle} ${subtitleFlown ? styles.subtitleFlown : ""}`}
            >
              A new world of commerce.<br />150+ product updates.
            </p>
          </div>

          {/* Nav links */}
          <div className={styles.list}>
            {NAV_ITEMS.map((item, i) => (
              <span
                key={item.label}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`${styles.navRow} ${itemsFlown ? styles.itemFlown : ""}`}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={styles.navLink}
                      onClick={() => onSubnavToggle(item.label)}
                    >
                      {item.label}
                    </button>
                    <button
                      type="button"
                      className={`${styles.chevron} ${navSettled ? styles.chevronVisible : ""} ${activeSubnav === item.label ? styles.chevronOpen : ""}`}
                      onClick={() => onSubnavToggle(item.label)}
                      aria-label={`Open ${item.label} submenu`}
                    >
                      <ChevronIcon />
                    </button>
                  </>
                ) : (
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle button — appears at 80% */}
      <button
        type="button"
        className={`${styles.toggleBtn} ${navSettled ? styles.toggleBtnVisible : ""} ${itemsHidden ? styles.toggleX : ""}`}
        onClick={handleToggle}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.tbar} />
        <span className={styles.tbar} />
        <span className={styles.tbar} />
      </button>

      {/* Nav title background — 50px beige strip */}
      <div className={`${styles.titleBg} ${navSettled ? styles.titleBgVisible : ""}`}>
        <div className={styles.titleIcons}>
          <Link href="/sign-in" className={styles.iconLink} aria-label="Sign in">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button type="button" className={styles.iconLink} onClick={onSearchOpen} aria-label="Search">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button type="button" className={styles.iconLink} onClick={onCartOpen} aria-label="Open cart">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
