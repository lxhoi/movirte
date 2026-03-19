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
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.label}>Sort by:</span>
        <span className={styles.value}>{current?.label}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} aria-hidden="true">
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="menu">
          {OPTIONS.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={`${styles.option} ${opt.value === value ? styles.optionActive : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                role="menuitemradio"
                aria-checked={opt.value === value}
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
