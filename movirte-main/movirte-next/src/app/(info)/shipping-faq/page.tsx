import { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Shipping FAQ — MOVIRTE",
  description: "Learn about MOVIRTE shipping policies, delivery times, and international shipping.",
};

export default function ShippingFAQPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Shipping Information</h1>
      <div className={styles.prose}>
        <h2>UK Delivery</h2>
        <p>Free shipping on all UK orders over £175. Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available at checkout for an additional fee.</p>

        <h2>International Delivery</h2>
        <p>We ship to most countries worldwide. Free international shipping on orders over £300. Standard international delivery takes 5–10 business days depending on destination.</p>

        <h2>Duties & Taxes</h2>
        <p>All orders to the USA, Canada and Europe are shipped with duties and taxes prepaid — so there are no surprise charges at delivery. For other international destinations, import duties may be charged by your local customs authority.</p>

        <h2>Order Processing</h2>
        <p>Orders placed before 2pm GMT (Monday–Friday) are dispatched the same day. Orders placed after 2pm or on weekends will be dispatched the next business day.</p>

        <h2>Tracking</h2>
        <p>Once your order has been dispatched, you will receive an email with full tracking information. You can also track your order by logging into your account.</p>

        <h2>Free Tote Bag</h2>
        <p>Orders over £175 receive a complimentary MOVIRTE tote bag — while stocks last.</p>
      </div>
    </div>
  );
}
