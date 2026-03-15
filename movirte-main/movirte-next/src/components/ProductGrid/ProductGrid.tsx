"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductGrid.module.css";

/**
 * Static product card data — will be replaced with Shopify data
 * once the store is connected. For now, mirrors the existing static site.
 */
const STATIC_PRODUCTS = [
  {
    id: "specialist-trucker-cap",
    handle: "specialist-trucker-cap",
    title: "Specialist Trucker Cap",
    price: "$68",
    image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
  },
  {
    id: "acron-graphic-tee",
    handle: "acron-graphic-tee",
    title: "Acron Graphic Tee",
    price: "$85",
    image: "/products/black acorn/acrontee.jpg",
  },
  {
    id: "acron-hoodie-black",
    handle: "acron-hoodie-black",
    title: "Acron Hoodie — Black",
    price: "$120",
    image: "/products/black acorn/ACRONHOODIE.webp",
  },
  {
    id: "noir-heritage-pant",
    handle: "noir-heritage-pant",
    title: "Noir Heritage Pant",
    price: "$145",
    image: "/products/noir heritage pants/8904.webp",
  },
];

export default function ProductGrid() {
  /* TODO: Replace with `fetchProducts()` once Shopify store is live */
  const products = STATIC_PRODUCTS;

  return (
    <section className={styles.section}>
      {/* Category tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>MENS</button>
        <button className={styles.tab}>WOMENS</button>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.handle}`} className={styles.link}>
            <div className={styles.item}>
              <div className={styles.imageWrap}>
                <button
                  className={styles.wishlist}
                  aria-label="Add to wishlist"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={styles.img}
                />
              </div>
              <p className={styles.name}>{p.title}</p>
              <span className={styles.price}>{p.price}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Shop CTA */}
      <div className={styles.cta}>
        <Link href="/shop" className={styles.shopBtn}>SHOP</Link>
      </div>
    </section>
  );
}
