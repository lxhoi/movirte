"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductGrid.module.css";
import { useWishlist, type WishlistItem } from "@/contexts/WishlistContext";

type Category = "mens" | "womens";

type HomepageProduct = {
  id: string;
  handle: string;
  title: string;
  price: string;
  image: string;
  hoverImage?: string;
};

const MENS_PRODUCTS: HomepageProduct[] = [
  {
    id: "specialist-trucker-cap",
    handle: "specialist-trucker-cap",
    title: "Specialist Trucker Cap",
    price: "$68",
    image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
    hoverImage: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
  },
  {
    id: "acron-graphic-tee",
    handle: "acron-graphic-tee",
    title: "Acron Graphic Tee",
    price: "$85",
    image: "/products/black acorn/acrontee.jpg",
    hoverImage: "/products/black acorn/acrontee.jpg",
  },
  {
    id: "acron-hoodie-black",
    handle: "acron-hoodie-black",
    title: "Acron Hoodie — Black",
    price: "$120",
    image: "/products/black acorn/ACRONHOODIE.webp",
    hoverImage: "/products/black acorn/ACRONHOODIE.webp",
  },
  {
    id: "noir-heritage-pant",
    handle: "noir-heritage-pant",
    title: "Noir Heritage Pant",
    price: "$145",
    image: "/products/noir heritage pants/8904.webp",
    hoverImage: "/products/noir heritage pants/8904.webp",
  },
];

const WOMENS_PRODUCTS: HomepageProduct[] = [
  {
    id: "w-specialist-trucker-cap",
    handle: "specialist-trucker-cap",
    title: "Specialist Trucker Cap",
    price: "$68",
    image: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
    hoverImage: "/products/trucker cap/SPECIALIST_TRUCKER_CAP_FLAT_LAY.webp",
  },
  {
    id: "w-acron-graphic-tee",
    handle: "acron-graphic-tee",
    title: "Acron Graphic Tee",
    price: "$85",
    image: "/products/black acorn/acrontee.jpg",
    hoverImage: "/products/black acorn/acrontee.jpg",
  },
  {
    id: "w-acron-hoodie-black",
    handle: "acron-hoodie-black",
    title: "Acron Hoodie — Black",
    price: "$120",
    image: "/products/black acorn/ACRONHOODIE.webp",
    hoverImage: "/products/black acorn/ACRONHOODIE.webp",
  },
  {
    id: "w-noir-heritage-pant",
    handle: "noir-heritage-pant",
    title: "Noir Heritage Pant",
    price: "$145",
    image: "/products/noir heritage pants/8904.webp",
    hoverImage: "/products/noir heritage pants/8904.webp",
  },
];

const PRODUCTS_BY_CATEGORY: Record<Category, HomepageProduct[]> = {
  mens: MENS_PRODUCTS,
  womens: WOMENS_PRODUCTS,
};

type ToastState = {
  mode: "add" | "remove";
  product: HomepageProduct;
} | null;

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("mens");
  const [toast, setToast] = useState<ToastState>(null);
  const { isWishlisted, toggle } = useWishlist();

  const products = PRODUCTS_BY_CATEGORY[activeCategory];

  const handleWishlist = (product: HomepageProduct) => {
    const currentlyWishlisted = isWishlisted(product.handle);
    const item: Omit<WishlistItem, "addedAt"> = {
      productId: product.handle,
      handle: product.handle,
      title: product.title,
      imageUrl: product.image,
      price: product.price,
    };
    toggle(item);
    setToast({
      mode: currentlyWishlisted ? "remove" : "add",
      product,
    });
    window.setTimeout(() => {
      setToast((current) => (current?.product.handle === product.handle ? null : current));
    }, 3000);
  };

  return (
    <section className={styles.section} aria-label="Homepage products">
      {/* Category tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeCategory === "mens" ? styles.tabActive : ""}`}
          onClick={() => setActiveCategory("mens")}
          type="button"
        >
          MENS
        </button>
        <button
          className={`${styles.tab} ${activeCategory === "womens" ? styles.tabActive : ""}`}
          onClick={() => setActiveCategory("womens")}
          type="button"
        >
          WOMENS
        </button>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.handle}`} className={styles.link}>
            <div className={styles.item}>
              <div className={styles.imageWrap}>
                <button
                  className={`${styles.wishlist} ${isWishlisted(p.handle) ? styles.wishlisted : ""}`}
                  aria-label={isWishlisted(p.handle) ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted(p.handle)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist(p);
                  }}
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
                  className={`${styles.img} ${styles.baseImg}`}
                />
                {p.hoverImage && (
                  <Image
                    src={p.hoverImage}
                    alt={`${p.title} — on model`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={`${styles.img} ${styles.hoverImg}`}
                  />
                )}
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

      {toast && (
        <div className={`${styles.toast} ${styles.toastVisible}`} aria-live="polite">
          <div className={styles.toastThumb}>
            <Image
              src={toast.product.image}
              alt={toast.product.title}
              width={42}
              height={42}
              className={styles.toastThumbImg}
            />
          </div>
          <div className={styles.toastBody}>
            <p className={styles.toastLabel}>
              {toast.mode === "add" ? "Added to wishlist" : "Removed from wishlist"}
            </p>
            <p className={styles.toastTitle}>{toast.product.title.toUpperCase()}</p>
          </div>
          <Link href="/wishlist" className={styles.toastCta}>
            View
          </Link>
        </div>
      )}
    </section>
  );
}
