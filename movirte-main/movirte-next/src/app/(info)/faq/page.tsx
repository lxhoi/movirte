import { Metadata } from "next";
import Accordion from "@/components/Accordion/Accordion";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "FAQ — MOVIRTE",
  description: "Frequently asked questions about MOVIRTE. Orders, shipping, returns, sizing and more.",
};

const FAQ_ITEMS = [
  {
    title: "How do I track my order?",
    defaultOpen: true,
    content: (
      <p>Once your order has shipped, you&apos;ll receive an email with a tracking link. You can also log into your account and view order history to see the status and tracking number.</p>
    ),
  },
  {
    title: "What is your returns policy?",
    content: (
      <p>We offer free exchanges and returns for UK orders within 30 days of delivery. Items must be unworn, unwashed and in original packaging with tags attached. International returns may incur shipping costs.</p>
    ),
  },
  {
    title: "How does shipping work?",
    content: (
      <p>UK orders over £175 qualify for free shipping. International orders over £300 receive free shipping. Delivery typically takes 3–5 business days in the UK and 5–10 business days internationally. Duties and taxes are prepaid for USA, Canada and Europe.</p>
    ),
  },
  {
    title: "How do I find my size?",
    content: (
      <p>Each product page includes a size guide. We recommend measuring a garment you already own and comparing it to our measurements. If you&apos;re between sizes, we suggest sizing up for a relaxed fit or down for a closer fit.</p>
    ),
  },
  {
    title: "Do you ship internationally?",
    content: (
      <p>Yes. We ship to most countries. International orders over £300 qualify for free shipping. All orders to the USA, Canada and Europe are shipped with duties and taxes prepaid so there are no surprise charges at delivery.</p>
    ),
  },
  {
    title: "How can I contact customer service?",
    content: (
      <p>You can reach us via the <a href="/contact">Contact</a> page, or use the chat widget on this site. We aim to respond within 24 hours on business days.</p>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Frequently Asked Questions</h1>
      <Accordion items={FAQ_ITEMS} />
    </div>
  );
}
