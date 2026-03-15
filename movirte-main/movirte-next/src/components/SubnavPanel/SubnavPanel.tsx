"use client";

import Link from "next/link";
import styles from "./SubnavPanel.module.css";
import type { NavSubItem } from "@/lib/navigation";

interface SubnavPanelProps {
  label: string;
  items: NavSubItem[];
  open: boolean;
  onClose: () => void;
}

export default function SubnavPanel({ label, items, open, onClose }: SubnavPanelProps) {
  return (
    <div className={`${styles.panel} ${open ? styles.open : ""}`}>
      <div className={styles.inner}>
        <span className={styles.category}>{label}</span>
        <div className={styles.links}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link} onClick={onClose}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
