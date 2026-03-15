"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import styles from "./cart.module.css";

export default function CartPage() {
  const {
    lines,
    totalQuantity,
    subtotal,
    note,
    loading,
    error,
    updateItem,
    removeItem,
    updateNote,
    checkout,
  } = useCart();

  const [noteValue, setNoteValue] = useState(note);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNoteChange = useCallback(
    (val: string) => {
      setNoteValue(val);
      // Debounce the API call
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updateNote(val);
      }, 800);
    },
    [updateNote]
  );

  const formatPrice = (amount: string, currency: string) => {
    const sym = currency === "GBP" ? "£" : "$";
    return `${sym}${parseFloat(amount).toFixed(2)}`;
  };

  const isEmpty = lines.length === 0;

  return (
    <>
      <AnnouncementStrip />
      <div className={styles.page}>
        <h1 className={styles.heading}>Your Bag ({totalQuantity})</h1>

        {error && <p className={styles.error}>{error}</p>}

        {isEmpty ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Your bag is empty.</p>
            <Link href="/new-in" className={styles.continueShopping}>
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* ── Cart items ─────────────────────── */}
            <div className={styles.items}>
              {lines.map((line) => {
                const variant = line.merchandise;
                const lineTotal = formatPrice(
                  (parseFloat(variant.price.amount) * line.quantity).toFixed(2),
                  variant.price.currencyCode
                );

                return (
                  <div key={line.id} className={styles.item}>
                    {/* Image */}
                    <Link
                      href={`/product/${variant.product.handle}`}
                      className={styles.itemImage}
                    >
                      {variant.image ? (
                        <Image
                          src={variant.image.url}
                          alt={variant.image.altText ?? variant.product.title}
                          fill
                          sizes="120px"
                          className={styles.img}
                        />
                      ) : (
                        <div className={styles.imgPlaceholder} />
                      )}
                    </Link>

                    {/* Details */}
                    <div className={styles.itemInfo}>
                      <Link
                        href={`/product/${variant.product.handle}`}
                        className={styles.itemTitle}
                      >
                        {variant.product.title}
                      </Link>
                      <p className={styles.itemVariant}>{variant.title}</p>

                      {variant.selectedOptions && (
                        <div className={styles.itemOptions}>
                          {variant.selectedOptions.map((opt) => (
                            <span key={opt.name} className={styles.itemOption}>
                              {opt.name}: {opt.value}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className={styles.itemPrice}>
                        {formatPrice(variant.price.amount, variant.price.currencyCode)}
                      </p>

                      {/* Quantity controls */}
                      <div className={styles.qtyRow}>
                        <button
                          className={styles.qtyBtn}
                          disabled={loading}
                          onClick={() =>
                            line.quantity === 1
                              ? removeItem(line.id)
                              : updateItem(line.id, line.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className={styles.qty}>{line.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          disabled={loading}
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Line total + remove */}
                    <div className={styles.itemRight}>
                      <span className={styles.lineTotal}>{lineTotal}</span>
                      <button
                        className={styles.removeBtn}
                        disabled={loading}
                        onClick={() => removeItem(line.id)}
                        aria-label={`Remove ${variant.product.title}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Summary sidebar ────────────────── */}
            <aside className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.muted}>Calculated at checkout</span>
              </div>

              <div className={styles.summaryTotal}>
                <span>Estimated Total</span>
                <span>{subtotal}</span>
              </div>

              {/* Order notes */}
              <div className={styles.noteSection}>
                <label className={styles.noteLabel} htmlFor="order-note">
                  ORDER NOTES
                </label>
                <textarea
                  id="order-note"
                  className={styles.noteInput}
                  placeholder="Special instructions for your order…"
                  value={noteValue}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  rows={3}
                />
              </div>

              <button
                className={styles.checkoutBtn}
                onClick={checkout}
                disabled={loading || isEmpty}
              >
                {loading ? "PROCESSING…" : "CHECKOUT"}
              </button>

              <Link href="/new-in" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
      <FeaturesBar />
    </>
  );
}
