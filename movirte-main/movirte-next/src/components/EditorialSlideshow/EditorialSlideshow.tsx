"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./EditorialSlideshow.module.css";

const SLIDES = [
  { src: "/banners/BLAKESHEROBANNEr.webp", alt: "Hero Banner 1" },
  { src: "/banners/HERO_BANNER_LAUNCH.webp", alt: "Hero Banner 2" },
  { src: "/banners/Website_Hero_Banner.webp", alt: "Hero Banner 3" },
];

const DURATION = 5000; // ms per slide

export default function EditorialSlideshow() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, DURATION);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startTimer]);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };

  return (
    <div
      className={styles.slideshow}
      onMouseEnter={() => {
        setPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className={styles.imgWrap}>
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            className={`${styles.slideImg} ${i === current ? styles.active : ""}`}
          />
        ))}
      </div>
      <div className={styles.overlay} />

      {/* Dots */}
      <div className={styles.indicator}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <svg className={styles.ring} viewBox="0 0 36 36">
              <circle className={styles.ringBg} cx="18" cy="18" r="14" />
              <circle className={styles.ringFg} cx="18" cy="18" r="14" />
            </svg>
            <span className={styles.dotInner} />
          </button>
        ))}
      </div>
    </div>
  );
}
