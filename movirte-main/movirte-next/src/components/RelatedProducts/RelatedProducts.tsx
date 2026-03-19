"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/contexts/WishlistContext";
import styles from "./RelatedProducts.module.css";

interface RelatedProduct {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

export default function RelatedProducts({
  products,
  title = "Related products",
}: RelatedProductsProps) {
  const { isWishlisted, toggle } = useWishlist();

  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.grid}>
        {products.slice(0, 4).map((product) => (
          <Link key={product.id} href={`/product/${product.handle}`} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles.img}
              />
              <button
                type="button"
                className={`${styles.wishlistBtn} ${isWishlisted(product.id) ? styles.wishlisted : ""}`}
                aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  toggle({
                    productId: product.id,
                    handle: product.handle,
                    title: product.title,
                    imageUrl: product.image,
                    price: product.price,
                  });
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.addCartBtn}
                aria-label="View product"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  window.location.href = `/product/${product.handle}`;
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
            <p className={styles.name}>{product.title}</p>
            <span className={styles.price}>{product.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
