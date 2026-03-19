"use client";

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./NavOverlay.module.css";
import { NAV_ITEMS } from "@/lib/navigation";

interface NavOverlayProps {
  /** Initial scroll fraction (0 on mount) */
  scrollFraction: number;
  onSearchOpen: () => void;
  onCartOpen: () => void;
  onSubnavToggle: (label: string) => void;
  activeSubnav: string | null;
}

export interface NavOverlayHandle {
  update: (fraction: number) => void;
}

const ChevronIcon = () => (
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NavOverlay = forwardRef<NavOverlayHandle, NavOverlayProps>(function NavOverlay(
  { onSearchOpen, onCartOpen, onSubnavToggle, activeSubnav },
  ref
) {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const titleBgRef = useRef<HTMLDivElement>(null);

  // Track animation state via refs to avoid re-render cascades
  const titleFlownRef = useRef(false);
  const subtitleFlownRef = useRef(false);
  const itemsFlownRef = useRef(false);
  const navSettledRef = useRef(false);
  const itemsHiddenRef = useRef(false);

  const HEADING_THRESHOLD = 0.3;
  const SETTLE_THRESHOLD = 0.8;

  const getGlassmorphismHref = useCallback((href: string, fallback?: string) => {
    if (href && href !== "#") return href;
    return fallback ?? "/";
  }, []);

  // Imperative scroll update — no React re-renders, pure DOM manipulation
  const applyScroll = useCallback((scrollFraction: number) => {
    // Glassmorphism border opacity — fades between 90%-99%
    if (contentRef.current) {
      const fadeStart = 0.45;
      const fadeEnd = 0.55;
      const frameOpacity = scrollFraction < fadeStart
        ? 1
        : Math.max(0, 1 - (scrollFraction - fadeStart) / (fadeEnd - fadeStart));
      contentRef.current.style.setProperty("--frame-opacity", String(frameOpacity));
    }

    // Dark text at 99%
    if (contentRef.current) {
      contentRef.current.classList.toggle(styles.contentDark, scrollFraction > SETTLE_THRESHOLD);
    }

    // Title fly
    if (scrollFraction > HEADING_THRESHOLD) {
      if (!titleFlownRef.current && titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const scaledHeight = rect.height * 0.38;
        const targetX = 68 - rect.left;
        const targetY = (25 - scaledHeight / 2) - rect.top;
        titleRef.current.style.setProperty("--fly-x", `${targetX}px`);
        titleRef.current.style.setProperty("--fly-y", `${targetY}px`);
        titleRef.current.style.transitionDelay = "0s";
        titleRef.current.classList.add(styles.titleFlown);
        titleFlownRef.current = true;
      }
    } else {
      if (titleFlownRef.current && titleRef.current) {
        titleRef.current.style.transitionDelay = "0.12s";
        titleRef.current.classList.remove(styles.titleFlown);
        titleFlownRef.current = false;
      }
    }

    // Subtitle fly
    if (scrollFraction > HEADING_THRESHOLD) {
      if (!subtitleFlownRef.current && subtitleRef.current) {
        const rect = subtitleRef.current.getBoundingClientRect();
        const targetX = 32 - rect.left;
        const targetY = 24 - rect.top;
        subtitleRef.current.style.setProperty("--fly-x", `${targetX}px`);
        subtitleRef.current.style.setProperty("--fly-y", `${targetY}px`);
        subtitleRef.current.style.transitionDelay = "0.15s";
        subtitleRef.current.classList.add(styles.subtitleFlown);
        subtitleFlownRef.current = true;
      }
    } else {
      if (subtitleFlownRef.current && subtitleRef.current) {
        subtitleRef.current.style.transitionDelay = "0s";
        subtitleRef.current.classList.remove(styles.subtitleFlown);
        subtitleFlownRef.current = false;
      }
    }

    // Nav items fly to bottom-left
    if (scrollFraction > HEADING_THRESHOLD) {
      if (!itemsFlownRef.current) {
        const items = itemRefs.current.filter(Boolean) as HTMLElement[];
        const rects = items.map((el) => el.getBoundingClientRect());
        const gap = 6;
        const totalHeight = rects.reduce((sum, r) => sum + r.height + gap, -gap);
        const stackTop = window.innerHeight - 32 - totalHeight;

        let accY = stackTop;
        items.forEach((el, j) => {
          const r = rects[j];
          el.style.setProperty("--fly-x", `${32 - r.left}px`);
          el.style.setProperty("--fly-y", `${accY - r.top}px`);
          el.style.transitionDelay = `${j * 0.08}s`;
          el.classList.add(styles.itemFlown);
          accY += r.height + gap;
        });
        itemsFlownRef.current = true;
      }
    } else {
      if (itemsFlownRef.current) {
        const items = itemRefs.current.filter(Boolean) as HTMLElement[];
        items.forEach((el, i) => {
          el.style.transitionDelay = `${(items.length - 1 - i) * 0.06}s`;
          el.classList.remove(styles.itemFlown);
        });
        itemsFlownRef.current = false;
      }
    }

    // Nav settles at last ~5 frames
    const settled = scrollFraction > SETTLE_THRESHOLD;
    if (settled !== navSettledRef.current) {
      navSettledRef.current = settled;
      toggleRef.current?.classList.toggle(styles.toggleBtnVisible, settled);
      titleBgRef.current?.classList.toggle(styles.titleBgVisible, settled);
      overlayRef.current?.querySelectorAll(`.${styles.chevron}`)
        .forEach((ch) => ch.classList.toggle(styles.chevronVisible, settled));
      document.body.classList.toggle("nav-settled", settled);
    }

    // Reset hidden state if scrolled back
    if (!settled && itemsHiddenRef.current) {
      itemsHiddenRef.current = false;
      overlayRef.current?.classList.remove(styles.itemsHidden);
      toggleRef.current?.classList.remove(styles.toggleX);
      document.body.classList.remove("nav-collapsed");
    }
  }, []);

  // Expose imperative update handle
  useImperativeHandle(ref, () => ({ update: applyScroll }), [applyScroll]);

  const handleToggle = useCallback(() => {
    itemsHiddenRef.current = !itemsHiddenRef.current;
    overlayRef.current?.classList.toggle(styles.itemsHidden, itemsHiddenRef.current);
    toggleRef.current?.classList.toggle(styles.toggleX, itemsHiddenRef.current);
    document.body.classList.toggle("nav-collapsed", itemsHiddenRef.current);
  }, []);

  useEffect(() => {
    return () => {
      document.body.classList.remove("nav-settled", "nav-collapsed");
    };
  }, []);

  return (
    <>
      {/* Nav overlay — centered panel */}
      <div ref={overlayRef} className={styles.overlay}>
        <div ref={contentRef} className={styles.content}>
          {/* Heading */}
          <div className={styles.heading}>
            <h1 ref={titleRef} className={styles.title}>
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
            <p ref={subtitleRef} className={styles.subtitle}>
              A new world of commerce.<br />150+ product updates.
            </p>
          </div>

          {/* Nav links */}
          <div className={styles.list}>
            {NAV_ITEMS.map((item, i) => (
              <span
                key={item.label}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={styles.navRow}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={styles.navLink}
                      onClick={() => {
                        if (!navSettledRef.current) {
                          router.push(getGlassmorphismHref(item.href, item.children?.[0]?.href));
                          return;
                        }
                        onSubnavToggle(item.label);
                      }}
                    >
                      {item.label}
                    </button>
                    <button
                      type="button"
                      className={`${styles.chevron} ${activeSubnav === item.label ? styles.chevronOpen : ""}`}
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

      {/* Toggle button */}
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggleBtn}
        onClick={handleToggle}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.tbar} />
        <span className={styles.tbar} />
        <span className={styles.tbar} />
      </button>

      {/* Nav title background — 50px beige strip */}
      <div ref={titleBgRef} className={styles.titleBg}>
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
});

export default NavOverlay;
