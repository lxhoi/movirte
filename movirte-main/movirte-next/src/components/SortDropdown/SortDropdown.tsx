"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";

export type SortOption = "best-selling" | "newest" | "price-asc" | "price-desc" | "title-asc" | "title-desc";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "best-selling", label: "Best Selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "title-asc", label: "Name: A → Z" },
  { value: "title-desc", label: "Name: Z → A" },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === value);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen((o) => !o)}>
        <span className={styles.label}>Sort by:</span>
        <span className={styles.value}>{current?.label}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▾</span>
      </button>
      {open && (
        <ul className={styles.menu}>
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                className={`${styles.option} ${opt.value === value ? styles.optionActive : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
