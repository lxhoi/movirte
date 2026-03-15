"use client";

import styles from "./AnnouncementStrip.module.css";

const MESSAGES = [
  "FREE TOTE BAG WITH ORDERS OVER £175",
  "FREE EXCHANGES & RETURNS FOR UK",
  "UK Free shipping on orders over £175",
  "INTERNATIONAL FREE SHIPPING OVER £300",
];

export default function AnnouncementStrip() {
  // Duplicate for seamless CSS loop
  const track = [...MESSAGES, ...MESSAGES];

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {track.map((msg, i) => (
          <span key={i}>
            <span className={styles.item}>{msg}</span>
            <span className={styles.sep}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
