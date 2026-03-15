"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./WishlistToast.module.css";

interface WishlistToastProps {
  message: string | null;
  /** Auto-dismiss duration in ms */
  duration?: number;
  onDismiss?: () => void;
}

export default function WishlistToast({
  message,
  duration = 2500,
  onDismiss,
}: WishlistToastProps) {
  const [visible, setVisible] = useState(false);
  const [displayMsg, setDisplayMsg] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      setDisplayMsg(message);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          onDismiss?.();
        }, 300); // wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, duration, onDismiss]);

  if (!displayMsg) return null;

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : ""}`}>
      <span className={styles.icon}>♥</span>
      <span className={styles.text}>{displayMsg}</span>
      <button
        className={styles.dismiss}
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
