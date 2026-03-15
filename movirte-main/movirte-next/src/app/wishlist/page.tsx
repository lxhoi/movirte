"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import WishlistToast from "@/components/WishlistToast/WishlistToast";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  const { items, remove, count } = useWishlist();
  const { addItem, loading: cartLoading } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const handleRemove = useCallback(
    (productId: string, title: string) => {
      remove(productId);
      setToast(`${title} removed from wishlist`);
    },
    [remove]
  );

  const handleAddToCart = useCallback(
    async (productId: string, title: string) => {
      // Use the productId as a variant ID placeholder
      // In production, you'd resolve the default variant ID from the product
      try {
        await addItem(productId);
        setToast(`${title} added to bag ✓`);
      } catch {
        setToast(`Could not add ${title} — please select size on product page`);
      }
    },
    [addItem]
  );

  return (
    <>
      <AnnouncementStrip />
      <div className={styles.page}>
        <h1 className={styles.heading}>
          Wishlist {count > 0 && <span className={styles.count}>({count})</span>}
        </h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>♥</div>
            <p className={styles.emptyText}>Your wishlist is empty.</p>
            <p className={styles.emptySub}>
              Browse our collections and tap the heart icon to save your favourites.
            </p>
            <Link href="/new-in" className={styles.shopLink}>
              DISCOVER NEW IN
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.productId} className={styles.card}>
                <Link href={`/product/${item.handle}`} className={styles.imageWrap}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.img}
                  />
                  {/* Remove button */}
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(item.productId, item.title);
                    }}
                    aria-label={`Remove ${item.title} from wishlist`}
                  >
                    ✕
                  </button>
                </Link>

                <div className={styles.info}>
                  <Link href={`/product/${item.handle}`} className={styles.name}>
                    {item.title}
                  </Link>
                  <p className={styles.price}>{item.price}</p>
                  <p className={styles.addedDate}>
                    Added {new Date(item.addedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>

                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(item.productId, item.title)}
                  disabled={cartLoading}
                >
                  {cartLoading ? "ADDING…" : "ADD TO BAG"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FeaturesBar />

      <WishlistToast
        message={toast}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
