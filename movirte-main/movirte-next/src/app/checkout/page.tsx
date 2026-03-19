"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import { useCart } from "@/contexts/CartContext";
import styles from "./checkout.module.css";

type PaymentMethod = "card" | "shop-pay" | "paypal" | "crypto";

export default function CheckoutPage() {
  const { lines, totalQuantity, subtotal, loading, checkout } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const isEmpty = lines.length === 0;

  return (
    <>
      <AnnouncementStrip />
      <div className={styles.page}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Secure Checkout</p>
            <h1 className={styles.title}>Checkout</h1>
          </div>
          <Link href="/cart" className={styles.backLink}>
            Return to bag
          </Link>
        </div>

        {isEmpty ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Your bag is empty.</p>
            <p className={styles.emptyText}>Add a few pieces before continuing to checkout.</p>
            <Link href="/new-in" className={styles.primaryBtn}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.main}>
              <section className={styles.card}>
                <div className={styles.expressCheckout}>
                  <p className={styles.sectionKicker}>Express checkout</p>
                  <div className={styles.expressButtons}>
                    <button type="button" className={`${styles.expressBtn} ${styles.shopPay}`}>
                      Shop Pay
                    </button>
                    <button type="button" className={`${styles.expressBtn} ${styles.paypal}`}>
                      PayPal
                    </button>
                    <button type="button" className={`${styles.expressBtn} ${styles.gpay}`}>
                      G Pay
                    </button>
                  </div>
                  <p className={styles.orText}>or continue below</p>
                </div>

                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2>Contact</h2>
                    <Link href="/sign-in">Log in</Link>
                  </div>
                  <div className={styles.formGrid}>
                    <input className={styles.input} type="email" placeholder="Email address" />
                  </div>
                </div>

                <div className={styles.section}>
                  <h2>Delivery</h2>
                  <div className={styles.formGrid}>
                    <select className={styles.input} defaultValue="United Kingdom">
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>Vietnam</option>
                    </select>
                    <div className={styles.twoCol}>
                      <input className={styles.input} type="text" placeholder="First name" />
                      <input className={styles.input} type="text" placeholder="Last name" />
                    </div>
                    <input className={styles.input} type="text" placeholder="Address" />
                    <input className={styles.input} type="text" placeholder="Apartment, suite, etc. (optional)" />
                    <div className={styles.threeCol}>
                      <input className={styles.input} type="text" placeholder="Postcode" />
                      <input className={styles.input} type="text" placeholder="City" />
                      <input className={styles.input} type="text" placeholder="Phone" />
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2>Payment</h2>
                  <div className={styles.paymentOptions}>
                    <label className={`${styles.paymentOption} ${paymentMethod === "card" ? styles.selected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span className={styles.paymentLabel}>Credit or debit card</span>
                      <span className={styles.paymentBadges}>
                        <span className={`${styles.cardBadge} ${styles.visa}`}>VISA</span>
                        <span className={`${styles.cardBadge} ${styles.mc}`}>MC</span>
                        <span className={`${styles.cardBadge} ${styles.amex}`}>AMEX</span>
                      </span>
                    </label>
                    {paymentMethod === "card" && (
                      <div className={styles.cardFields}>
                        <input className={styles.input} type="text" placeholder="Card number" />
                        <div className={styles.threeCol}>
                          <input className={styles.input} type="text" placeholder="Expiration date (MM / YY)" />
                          <input className={styles.input} type="text" placeholder="Security code" />
                          <input className={styles.input} type="text" placeholder="Name on card" />
                        </div>
                      </div>
                    )}
                    <label className={`${styles.paymentOption} ${paymentMethod === "shop-pay" ? styles.selected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "shop-pay"}
                        onChange={() => setPaymentMethod("shop-pay")}
                      />
                      <span className={styles.paymentLabel}>Shop Pay</span>
                    </label>
                    <label className={`${styles.paymentOption} ${paymentMethod === "paypal" ? styles.selected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                      />
                      <span className={styles.paymentLabel}>PayPal</span>
                    </label>
                    <label className={`${styles.paymentOption} ${paymentMethod === "crypto" ? styles.selected : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "crypto"}
                        onChange={() => setPaymentMethod("crypto")}
                      />
                      <span className={styles.paymentLabel}>USDC</span>
                    </label>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2>Remember me</h2>
                  <label className={styles.checkboxRow}>
                    <input type="checkbox" />
                    <span>Save my information for a faster checkout next time.</span>
                  </label>
                </div>
              </section>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryKicker}>Order summary</p>
                <h2 className={styles.summaryTitle}>Your order ({totalQuantity})</h2>

                <div className={styles.lineItems}>
                  {lines.map((line) => (
                    <div key={line.id} className={styles.lineItem}>
                      <div className={styles.lineThumb}>
                        {line.merchandise.image ? (
                          <Image
                            src={line.merchandise.image.url}
                            alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                            fill
                            sizes="72px"
                            className={styles.lineThumbImg}
                          />
                        ) : (
                          <div className={styles.lineThumbFallback} />
                        )}
                        <span className={styles.qtyBadge}>{line.quantity}</span>
                      </div>
                      <div className={styles.lineMeta}>
                        <p className={styles.lineTitle}>{line.merchandise.product.title}</p>
                        <p className={styles.lineVariant}>{line.merchandise.title}</p>
                      </div>
                      <p className={styles.linePrice}>
                        {line.merchandise.price.currencyCode === "GBP" ? "£" : "$"}
                        {(parseFloat(line.merchandise.price.amount) * line.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>{subtotal}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Shipping</span>
                    <span className={styles.muted}>Calculated next</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                    <span>Total</span>
                    <span>{subtotal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={checkout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay now"}
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
      <FeaturesBar />
    </>
  );
}
