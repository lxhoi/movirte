"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(
    items.findIndex((i) => i.defaultOpen) ?? null
  );

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => (
        <div key={i} className={`${styles.item} ${openIdx === i ? styles.open : ""}`}>
          <button className={styles.trigger} onClick={() => toggle(i)} aria-expanded={openIdx === i}>
            <span className={styles.triggerText}>{item.title}</span>
            <span className={styles.icon}>{openIdx === i ? "−" : "+"}</span>
          </button>
          <div className={styles.content}>
            <div className={styles.inner}>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
