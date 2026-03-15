import { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Returns & Exchanges — MOVIRTE",
  description: "MOVIRTE returns and exchanges policy. Free UK returns within 30 days.",
};

export default function ReturnsFAQPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Returns & Exchanges</h1>
      <div className={styles.prose}>
        <h2>UK Returns</h2>
        <p>We offer free exchanges and returns for all UK orders within 30 days of delivery. Items must be in their original condition — unworn, unwashed, and with all tags attached.</p>

        <h2>How to Return</h2>
        <ol>
          <li>Log into your MOVIRTE account and navigate to your order history.</li>
          <li>Select the item(s) you wish to return and choose your reason.</li>
          <li>Print the prepaid return label provided.</li>
          <li>Package the item(s) securely and attach the label.</li>
          <li>Drop off at your nearest collection point.</li>
        </ol>

        <h2>Exchanges</h2>
        <p>For exchanges (different size or colour), please follow the return process above and place a new order for the desired item. This ensures the fastest processing.</p>

        <h2>International Returns</h2>
        <p>International returns are the responsibility of the customer. We recommend using a tracked shipping service. Once received and inspected, refunds will be processed within 5–7 business days.</p>

        <h2>Refunds</h2>
        <p>Refunds are processed to the original payment method within 5–7 business days of receiving the returned item. You will receive an email confirmation once your refund has been processed.</p>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Sale items marked as &ldquo;Final Sale&rdquo;</li>
          <li>Gift cards</li>
          <li>Items that have been worn, washed, or altered</li>
        </ul>
      </div>
    </div>
  );
}
