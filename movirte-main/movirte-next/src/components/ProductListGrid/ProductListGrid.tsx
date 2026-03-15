"use client";

import { useState } from "react";
import ProductCard, { type ProductCardData } from "@/components/ProductCard/ProductCard";
import styles from "./ProductListGrid.module.css";

type ViewMode = "col2" | "col3" | "list";

interface ProductListGridProps {
  products: ProductCardData[];
  initialView?: ViewMode;
}

export default function ProductListGrid({
  products,
  initialView = "col3",
}: ProductListGridProps) {
  const [view, setView] = useState<ViewMode>(initialView);

  return (
    <div>
      {/* View toggle */}
      <div className={styles.toolbar}>
        <span className={styles.count}>{products.length} products</span>
        <div className={styles.toggles}>
          <button
            className={`${styles.toggleBtn} ${view === "col2" ? styles.active : ""}`}
            onClick={() => setView("col2")}
            aria-label="2 columns"
            title="2 columns"
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="14" rx="1" /><rect x="9" y="1" width="6" height="14" rx="1" /></svg>
          </button>
          <button
            className={`${styles.toggleBtn} ${view === "col3" ? styles.active : ""}`}
            onClick={() => setView("col3")}
            aria-label="3 columns"
            title="3 columns"
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="1" width="4" height="14" rx="1" /><rect x="6" y="1" width="4" height="14" rx="1" /><rect x="11" y="1" width="4" height="14" rx="1" /></svg>
          </button>
          <button
            className={`${styles.toggleBtn} ${view === "list" ? styles.active : ""}`}
            onClick={() => setView("list")}
            aria-label="List view"
            title="List view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="1" width="14" height="3" rx="1" /><rect x="1" y="6" width="14" height="3" rx="1" /><rect x="1" y="11" width="14" height="3" rx="1" /></svg>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        className={`${styles.grid} ${
          view === "col2" ? styles.grid2 : view === "list" ? styles.gridList : styles.grid3
        }`}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} layout={view === "list" ? "list" : "grid"} />
        ))}
      </div>
    </div>
  );
}
