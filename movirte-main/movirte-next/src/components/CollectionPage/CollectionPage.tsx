"use client";

import { useState } from "react";
import ProductListGrid from "@/components/ProductListGrid/ProductListGrid";
import FilterPanel, { type FilterState } from "@/components/FilterPanel/FilterPanel";
import SortDropdown, { type SortOption } from "@/components/SortDropdown/SortDropdown";
import Pagination from "@/components/Pagination/Pagination";
import EditorialBanner from "@/components/EditorialBanner/EditorialBanner";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";
import type { ProductCardData } from "@/components/ProductCard/ProductCard";
import styles from "./CollectionPage.module.css";

interface CollectionPageProps {
  title: string;
  description?: string;
  products: ProductCardData[];
  bannerImage?: string;
  bannerAlt?: string;
}

export default function CollectionPage({ 
  title, 
  description, 
  products,
  bannerImage,
  bannerAlt,
}: CollectionPageProps) {
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ sizes: [], types: [], inStockOnly: false });
  const [page, setPage] = useState(1);
  const perPage = 12;

  // Client-side sort (will be replaced by API params when Shopify is live)
  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""));
      case "price-desc":
        return parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, ""));
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <div className={styles.container}>
      {/* Editorial Banner */}
      {bannerImage && (
        <EditorialBanner 
          image={bannerImage} 
          alt={bannerAlt || title}
          heading={title}
        />
      )}

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        <div className={styles.controls}>
          <button className={styles.filterBtn} onClick={() => setFilterOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
            FILTERS
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Product grid */}
      <ProductListGrid products={paginated} />

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Filter drawer */}
      <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} onApply={setFilters} />
    </div>
  );
}
