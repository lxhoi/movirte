"use client";

import { useState } from "react";
import styles from "./FilterPanel.module.css";

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  sizes: string[];
  types: string[];
  inStockOnly: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const PRODUCT_TYPES = [
  "Sweatshirts & Hoodies",
  "T-Shirts",
  "Shirts",
  "Outerwear",
  "Denim",
  "Trousers & Bottoms",
  "Shorts",
  "Accessories",
  "Hats & Caps",
];

export default function FilterPanel({ open, onClose, onApply }: FilterPanelProps) {
  const [sizes, setSizes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleSize = (s: string) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleType = (t: string) =>
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleApply = () => {
    onApply({ sizes, types, inStockOnly });
    onClose();
  };

  const handleClear = () => {
    setSizes([]);
    setTypes([]);
    setInStockOnly(false);
    onApply({ sizes: [], types: [], inStockOnly: false });
  };

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.panel} ${open ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>FILTERS</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">✕</button>
        </div>

        <div className={styles.body}>
          {/* Size */}
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>SIZE</h4>
            <div className={styles.chips}>
              {SIZES.map((s) => (
                <button
                  key={s}
                  className={`${styles.chip} ${sizes.includes(s) ? styles.chipActive : ""}`}
                  onClick={() => toggleSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div className={styles.group}>
            <h4 className={styles.groupTitle}>PRODUCT TYPE</h4>
            <div className={styles.checkboxes}>
              {PRODUCT_TYPES.map((t) => (
                <label key={t} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={types.includes(t)}
                    onChange={() => toggleType(t)}
                    className={styles.checkbox}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In stock */}
          <div className={styles.group}>
            <label className={styles.toggleRow}>
              <span className={styles.groupTitle}>IN STOCK ONLY</span>
              <button
                className={`${styles.toggle} ${inStockOnly ? styles.toggleOn : ""}`}
                onClick={() => setInStockOnly((v) => !v)}
                role="switch"
                aria-checked={inStockOnly}
              >
                <span className={styles.toggleThumb} />
              </button>
            </label>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClear}>CLEAR ALL</button>
          <button className={styles.applyBtn} onClick={handleApply}>APPLY FILTERS</button>
        </div>
      </aside>
    </>
  );
}
