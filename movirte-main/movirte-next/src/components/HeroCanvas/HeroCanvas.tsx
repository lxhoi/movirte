"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./HeroCanvas.module.css";

const FRAME_COUNT = 511;
const EASE = 0.1;
const PRODUCT_REVEAL_THRESHOLD = 0.8;
const DESKTOP_MEDIA_QUERY = "(min-width: 1025px)";

function subscribeDesktopQuery(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

/**
 * Build the URL for a given frame index.
 * Frames live in /scroll-frames/ in the public folder.
 */
function frameSrc(index: number): string {
  const padded = (index + 1).toString().padStart(5, "0");
  return `/scroll-frames/frame_${padded}.jpg`;
}

/** Draw an image with "object-fit: cover" on the canvas */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const c = ctx.canvas;
  const hRatio = c.width / img.width;
  const vRatio = c.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const cx = (c.width - img.width * ratio) / 2;
  const cy = (c.height - img.height * ratio) / 2;
  ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
}

interface HeroCanvasProps {
  /** Called with scroll fraction (0–1) so parent can drive nav animations */
  onScrollProgress?: (fraction: number) => void;
  /** Content that appears inside the product-section overlay */
  children?: React.ReactNode;
}

export default function HeroCanvas({ onScrollProgress, children }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const onScrollProgressRef = useRef(onScrollProgress);
  const productRef = useRef<HTMLElement>(null);
  const isDesktop = useSyncExternalStore(
    subscribeDesktopQuery,
    getDesktopSnapshot,
    () => false
  );
  const [contentVisible, setContentVisible] = useState(false);

  // Reset product section scroll to top when it becomes visible
  useEffect(() => {
    if (contentVisible && productRef.current) {
      productRef.current.scrollTop = 0;
    }
  }, [contentVisible]);

  // Keep the callback ref fresh
  useEffect(() => {
    onScrollProgressRef.current = onScrollProgress;
  }, [onScrollProgress]);

  /* Preload frames & start animation loop */
  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Preload all frames
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      if (i === 0) {
        img.onload = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          drawCover(ctx, img);
        };
      }
      imgs.push(img);
    }
    imagesRef.current = imgs;

    // Animation loop with lerp
    const animate = () => {
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) * EASE;
      if (Math.abs(targetFrameRef.current - currentFrameRef.current) > 0.01) {
        const frameNum = Math.round(currentFrameRef.current);
        const img = imgs[frameNum];
        if (img?.complete) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawCover(ctx, img);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Resize handler
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fIdx = Math.round(currentFrameRef.current);
      const img = imgs[fIdx];
      if (img?.complete) drawCover(ctx, img);
    };
    window.addEventListener("resize", onResize);

    // Listen for scroll events from LenisProvider
    const onLenisScroll = (e: Event) => {
      const { scroll } = (e as CustomEvent).detail;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? scroll / maxScroll : 0;
      targetFrameRef.current = Math.min(
        FRAME_COUNT - 1,
        Math.floor(fraction * FRAME_COUNT)
      );
      // Match the original static homepage: reveal the content at ~80% scroll.
      setContentVisible(fraction > PRODUCT_REVEAL_THRESHOLD);
      onScrollProgressRef.current?.(fraction);
    };
    window.addEventListener("lenis-scroll", onLenisScroll);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("lenis-scroll", onLenisScroll);
    };
  }, [isDesktop]);

  return (
    <>
      {/* Scroll container — creates 500vh of scroll room (desktop only) */}
      {isDesktop && (
        <div className={styles.container}>
          <canvas ref={canvasRef} id="hero-canvas" className={styles.canvas} />
        </div>
      )}

      {/* Product section — fixed fullscreen overlay with own scroll,
          starts hidden, fades in at 80% scroll.
          On mobile: static + visible immediately. */}
      <section
        ref={productRef}
        id="product-section"
        data-lenis-prevent
        className={`${styles.productSection} ${(!isDesktop || contentVisible) ? styles.productSectionVisible : ""}`}
      >
        {children}
      </section>
    </>
  );
}
