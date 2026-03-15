"use client";

import { useState, useMemo, useCallback } from "react";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import SizeSelector from "@/components/SizeSelector/SizeSelector";
import ColorSwatches from "@/components/ColorSwatches/ColorSwatches";
import Accordion from "@/components/Accordion/Accordion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/lib/shopify/types";
import styles from "./ProductDetail.module.css";

/** Map colour names to CSS colours for swatches */
const COLOR_MAP: Record<string, string> = {
  Black: "#111",
  White: "#f5f5f0",
  Navy: "#1a1a3e",
  Grey: "#7a7a7a",
  Cream: "#f0ead6",
  Olive: "#4a5a3a",
  Brown: "#5c3a1e",
  Red: "#8b2020",
  Blue: "#2a4a7a",
  Green: "#2d5a3a",
};

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, loading: cartLoading } = useCart();
  const { isWishlisted, toggle: toggleWishlist } = useWishlist();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  /* ── Parse options ───────────────────────────── */
  const sizeOption = product.options.find(
    (o) => o.name.toLowerCase() === "size"
  );
  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour"
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizeOption?.values[0] ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    colorOption?.values[0] ?? null
  );

  /* ── Find matching variant ───────────────────── */
  const selectedVariant = useMemo(() => {
    return product.variants.edges.find(({ node: v }) => {
      const sizeMatch = !sizeOption || v.selectedOptions.some(
        (o) => o.name.toLowerCase() === "size" && o.value === selectedSize
      );
      const colorMatch = !colorOption || v.selectedOptions.some(
        (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === selectedColor
      );
      return sizeMatch && colorMatch;
    })?.node;
  }, [product.variants.edges, selectedSize, selectedColor, sizeOption, colorOption]);

  /* ── Size availability ───────────────────────── */
  const sizeAvailability = useMemo(() => {
    if (!sizeOption) return {};
    const map: Record<string, boolean> = {};
    sizeOption.values.forEach((size) => {
      const variant = product.variants.edges.find(({ node: v }) => {
        const sMatch = v.selectedOptions.some(
          (o) => o.name.toLowerCase() === "size" && o.value === size
        );
        const cMatch = !colorOption || v.selectedOptions.some(
          (o) => (o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour") && o.value === selectedColor
        );
        return sMatch && cMatch;
      });
      map[size] = variant?.node.availableForSale ?? false;
    });
    return map;
  }, [product.variants.edges, sizeOption, colorOption, selectedColor]);

  /* ── Images ──────────────────────────────────── */
  const images = product.images.edges.map((e) => e.node);

  /* ── Price display ───────────────────────────── */
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice ?? null;
  const currencySymbol = price.currencyCode === "GBP" ? "£" : "$";
  const priceStr = `${currencySymbol}${parseFloat(price.amount).toFixed(2)}`;
  const compareStr = compareAt
    ? `${currencySymbol}${parseFloat(compareAt.amount).toFixed(2)}`
    : null;

  /* ── Color swatches data ─────────────────────── */
  const colors = colorOption
    ? colorOption.values.map((name) => ({
        name,
        value: COLOR_MAP[name] ?? "#999",
      }))
    : [];

  /* ── Handlers ────────────────────────────────── */
  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      showToast("Please select a size");
      return;
    }
    await addItem(selectedVariant.id);
    showToast("Added to bag ✓");
  };

  const handleWishlist = () => {
    toggleWishlist({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      imageUrl: images[0]?.url ?? "",
      price: priceStr,
    });
    showToast(
      isWishlisted(product.id) ? "Removed from wishlist" : "Added to wishlist ♥"
    );
  };

  /* ── Accordion items ─────────────────────────── */
  const accordionItems = [
    {
      title: "Product Details",
      defaultOpen: true,
      content: (
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
      ),
    },
    {
      title: "Shipping",
      content: (
        <>
          <p>UK Free Shipping on orders over £175.</p>
          <p>International Free Shipping over £300.</p>
          <p>Free Tote Bag with orders over £175.</p>
          <p>Duties &amp; taxes prepaid for USA, Canada &amp; Europe.</p>
        </>
      ),
    },
    {
      title: "Returns & Exchanges",
      content: (
        <>
          <p>Free exchanges &amp; returns for UK orders within 14 days.</p>
          <p>Items must be unworn, unwashed, and with tags attached.</p>
          <p>International returns are the responsibility of the customer.</p>
        </>
      ),
    },
  ];

  return (
    <div className={styles.pdp}>
      {/* Gallery */}
      <div className={styles.gallery}>
        <ImageGallery images={images} />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.vendor}>{product.vendor}</p>
        <h1 className={styles.title}>{product.title}</h1>

        <div className={styles.priceRow}>
          <span className={compareStr ? styles.salePrice : styles.price}>{priceStr}</span>
          {compareStr && <span className={styles.comparePrice}>{compareStr}</span>}
        </div>

        {/* Colour */}
        {colors.length > 0 && (
          <ColorSwatches
            colors={colors}
            selected={selectedColor}
            onChange={setSelectedColor}
          />
        )}

        {/* Size */}
        {sizeOption && (
          <SizeSelector
            sizes={sizeOption.values}
            selected={selectedSize}
            onChange={setSelectedSize}
            availability={sizeAvailability}
          />
        )}

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.addToCart}
            onClick={handleAddToCart}
            disabled={cartLoading}
          >
            {cartLoading ? "ADDING…" : "ADD TO BAG"}
          </button>
          <button
            className={`${styles.wishBtn} ${isWishlisted(product.id) ? styles.wishlisted : ""}`}
            onClick={handleWishlist}
            aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        {/* Accordion */}
        <Accordion items={accordionItems} />
      </div>

      {/* Toast */}
      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
    </div>
  );
}
