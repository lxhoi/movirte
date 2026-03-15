"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./ImageGallery.module.css";

interface GalleryImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = images[activeIdx] ?? images[0];
  if (!active) return null;

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  return (
    <>
      <div className={styles.gallery}>
        {/* Thumbnail strip */}
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={img.url}
              className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img.url} alt={img.altText ?? ""} fill sizes="80px" className={styles.thumbImg} />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className={styles.main} onClick={() => setLightboxOpen(true)}>
          <Image
            src={active.url}
            alt={active.altText ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.mainImg}
            priority
          />
          <span className={styles.zoomHint}>🔍</span>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightbox} onClick={() => setLightboxOpen(false)}>
          <button className={styles.lbClose} onClick={() => setLightboxOpen(false)} aria-label="Close">✕</button>
          <button className={styles.lbArrow} style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <div className={styles.lbImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={active.url}
              alt={active.altText ?? ""}
              fill
              sizes="90vw"
              className={styles.lbImage}
            />
          </div>
          <button className={styles.lbArrow} style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
          <div className={styles.lbDots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.lbDot} ${i === activeIdx ? styles.lbDotActive : ""}`}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
