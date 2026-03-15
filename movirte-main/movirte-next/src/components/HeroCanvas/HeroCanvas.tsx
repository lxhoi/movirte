"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./HeroCanvas.module.css";

const FRAME_COUNT = 511;
const EASE = 0.1;

/**
 * Build the URL for a given frame index.
 * Frames live in /scrolling%20fx/ with filenames like:
 *   Screen Recording 2026-02-18 at 6.28.17 PM_00001.jpg
 */
function frameSrc(index: number): string {
  const dir = "scrolling fx";
  const filename = `Screen Recording 2026-02-18 at 6.28.17 PM_${(index + 1)
    .toString()
    .padStart(5, "0")}.jpg`;
  return `${encodeURIComponent(dir)}/${encodeURIComponent(filename)}`;
}

/** Draw an image with "object-fit: cover" on the canvas */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
) {
  const c = ctx.canvas;
  const hRatio = c.width / img.width;
  const vRatio = c.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const cx = (c.width - img.width * ratio) / 2;
  const cy = (c.height - img.height * ratio) / 2;
  ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
}

interface HeroCanvasProps {
  onScrollProgress?: (fraction: number) => void;
}

export default function HeroCanvas({ onScrollProgress }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  /* Preload all frames */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 1025px)").matches;
    if (!isDesktop) return; // No canvas animation on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    // Animation loop
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

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Scroll handler — called by Lenis via parent */
  const handleScroll = useCallback(
    (scrollY: number) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? scrollY / maxScroll : 0;
      targetFrameRef.current = Math.min(
        FRAME_COUNT - 1,
        Math.floor(fraction * FRAME_COUNT)
      );
      onScrollProgress?.(fraction);
    },
    [onScrollProgress]
  );

  // Expose handleScroll via a data-attribute callback pattern
  // The LenisProvider will read this ref
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    (canvas as unknown as Record<string, unknown>).__onScroll = handleScroll;
  }, [handleScroll]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} id="hero-canvas" className={styles.canvas} />
    </div>
  );
}
