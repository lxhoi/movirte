"use client";

import styles from "./ColorSwatches.module.css";

interface ColorOption {
  name: string;
  /** CSS color or URL to swatch image */
  value: string;
}

interface ColorSwatchesProps {
  colors: ColorOption[];
  selected: string | null;
  onChange: (name: string) => void;
}

export default function ColorSwatches({ colors, selected, onChange }: ColorSwatchesProps) {
  if (colors.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        COLOUR {selected && <span className={styles.selected}>— {selected}</span>}
      </p>
      <div className={styles.swatches}>
        {colors.map((c) => (
          <button
            key={c.name}
            className={`${styles.swatch} ${selected === c.name ? styles.active : ""}`}
            onClick={() => onChange(c.name)}
            aria-label={`Colour: ${c.name}`}
            title={c.name}
          >
            <span
              className={styles.inner}
              style={{
                background: c.value.startsWith("http") ? `url(${c.value}) center/cover` : c.value,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
