"use client";

import { useRef, useEffect } from "react";
import styles from "./SearchPanel.module.css";

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchPanel({ open, onClose }: SearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = "";
    }
  }, [open]);

  return (
    <div
      className={`${styles.panel} ${open ? styles.open : ""}`}
      aria-hidden={!open}
    >
      <div className={styles.inner}>
        <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          className={styles.input}
          placeholder="SEARCH FOR..."
          autoComplete="off"
          aria-label="Search"
          onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
        />
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 2l14 14M16 2L2 16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
