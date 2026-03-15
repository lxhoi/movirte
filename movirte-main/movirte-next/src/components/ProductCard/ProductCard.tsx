"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

export interface ProductCardData {
  id: string;
  handle: string;
  title: string;
  price: string;
  compareAtPrice?: string;
  image: string;
  hoverImage?: string;
  vendor?: string;
}

interface ProductCardProps {
  product: ProductCardData;
  /** "grid" (default) or "list" */
  layout?: "grid" | "list";
  onWishlistToggle?: (id: string) => void;
  wishlisted?: boolean;
}

export default function ProductCard({
  product,
  layout = "grid",
  onWishlistToggle,
  wishlisted = false,
}: ProductCardProps) {
  const isOnSale = !!product.compareAtPrice;

  return (
    <div className={`${styles.card} ${layout === "list" ? styles.listCard : ""}`}>
      <Link href={`/product/${product.handle}`} className={styles.link}>
        <div className={styles.imageWrap}>
          {/* Wishlist heart */}
          <button
            className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ""}`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistToggle?.(product.id);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          {isOnSale && <span className={styles.saleBadge}>SALE</span>}

          {/* Base image */}
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes={layout === "list" ? "200px" : "(max-width: 768px) 50vw, 33vw"}
            className={`${styles.img} ${styles.imgBase}`}
          />
          {/* Hover image */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={`${product.title} — alternate`}
              fill
              sizes={layout === "list" ? "200px" : "(max-width: 768px) 50vw, 33vw"}
              className={`${styles.img} ${styles.imgHover}`}
            />
          )}
        </div>

        <div className={styles.info}>
          {product.vendor && <p className={styles.vendor}>{product.vendor}</p>}
          <p className={styles.name}>{product.title}</p>
          <div className={styles.priceRow}>
            <span className={isOnSale ? styles.salePrice : styles.price}>
              {product.price}
            </span>
            {product.compareAtPrice && (
              <span className={styles.comparePrice}>{product.compareAtPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
