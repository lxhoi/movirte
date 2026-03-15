"use client";

import styles from "./SizeSelector.module.css";

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onChange: (size: string) => void;
  /** Map of size → available boolean */
  availability?: Record<string, boolean>;
}

export default function SizeSelector({ sizes, selected, onChange, availability }: SizeSelectorProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        SIZE {selected && <span className={styles.selected}>— {selected}</span>}
      </p>
      <div className={styles.sizes}>
        {sizes.map((size) => {
          const avail = availability ? availability[size] !== false : true;
          return (
            <button
              key={size}
              className={`${styles.size} ${selected === size ? styles.active : ""} ${!avail ? styles.disabled : ""}`}
              onClick={() => avail && onChange(size)}
              disabled={!avail}
              aria-label={`Size ${size}${!avail ? " — sold out" : ""}`}
            >
              {size}
              {!avail && <span className={styles.strikethrough} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
