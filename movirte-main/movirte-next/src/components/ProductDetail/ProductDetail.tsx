"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import Accordion from "@/components/Accordion/Accordion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/lib/shopify/types";
import styles from "./ProductDetail.module.css";

const COLOR_MAP: Record<string, string> = {
  Black: "#111",
  White: "#f2efe7",
  Navy: "#1b2240",
  Grey: "#818181",
  Gray: "#818181",
  Cream: "#d8cfb9",
  Olive: "#4a5a3a",
  Brown: "#5c3a1e",
  Cocoa: "#8b6914",
  Sand: "#c4b896",
  Red: "#8b2020",
  Blue: "#2a4a7a",
  Green: "#2d5a3a",
};

interface ProductDetailProps {
  product: Product;
}

function formatMoney(amount: string, currencyCode: string) {
  const symbol = currencyCode === "GBP" ? "£" : currencyCode === "USD" ? "$" : `${currencyCode} `;
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}

function buildSku(handle: string) {
  return handle.replace(/-/g, "-").toUpperCase();
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, loading: cartLoading } = useCart();
  const { isWishlisted, toggle: toggleWishlist } = useWishlist();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const sizeOption = product.options.find((o) => o.name.toLowerCase() === "size");
  const colorOption = product.options.find(
    (o) => o.name.toLowerCase() === "color" || o.name.toLowerCase() === "colour"
  );

  const [selectedSize, setSelectedSize] = useState<string | null>(sizeOption?.values[0] ?? null);
  const [selectedColor, setSelectedColor] = useState<string | null>(colorOption?.values[0] ?? null);

  const selectedVariant = useMemo(() => {
    return product.variants.edges.find(({ node: variant }) => {
      const sizeMatch = !sizeOption || variant.selectedOptions.some(
        (option) => option.name.toLowerCase() === "size" && option.value === selectedSize
      );
      const colorMatch = !colorOption || variant.selectedOptions.some(
        (option) =>
          (option.name.toLowerCase() === "color" || option.name.toLowerCase() === "colour") &&
          option.value === selectedColor
      );
      return sizeMatch && colorMatch;
    })?.node;
  }, [colorOption, product.variants.edges, selectedColor, selectedSize, sizeOption]);

  const sizeAvailability = useMemo(() => {
    if (!sizeOption) return {};
    return Object.fromEntries(
      sizeOption.values.map((size) => {
        const variant = product.variants.edges.find(({ node }) => {
          const matchesSize = node.selectedOptions.some(
            (option) => option.name.toLowerCase() === "size" && option.value === size
          );
          const matchesColor = !colorOption || node.selectedOptions.some(
            (option) =>
              (option.name.toLowerCase() === "color" || option.name.toLowerCase() === "colour") &&
              option.value === selectedColor
          );
          return matchesSize && matchesColor;
        });

        return [size, variant?.node.availableForSale ?? false];
      })
    );
  }, [colorOption, product.variants.edges, selectedColor, sizeOption]);

  const colors = colorOption
    ? colorOption.values.map((name) => ({
        name,
        value: COLOR_MAP[name] ?? "#999",
      }))
    : [];

  const images = product.images.edges.map((edge) => edge.node);
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice ?? null;
  const priceStr = formatMoney(price.amount, price.currencyCode);
  const compareStr =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount)
      ? formatMoney(compareAt.amount, compareAt.currencyCode)
      : null;
  const selectedSizeInStock = selectedSize ? sizeAvailability[selectedSize] !== false : true;

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(null), 2500);
  }, []);

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      showToast("Please select a size");
      return;
    }

    await addItem(selectedVariant.id);
    showToast("Added to bag");
  };

  const handleWishlist = () => {
    const productId = product.id;
    const alreadyWishlisted = isWishlisted(productId);
    toggleWishlist({
      productId,
      handle: product.handle,
      title: product.title,
      imageUrl: images[0]?.url ?? "",
      price: priceStr,
    });
    showToast(alreadyWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const accordionItems = [
    {
      title: "Product Details",
      content: (
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }} />
      ),
    },
    {
      title: "Shipping & Returns",
      content: (
        <>
          <p>Free UK delivery on orders over £175.</p>
          <p>International shipping available with duties prepaid to selected regions.</p>
          <p>Returns accepted on unworn items with tags attached.</p>
        </>
      ),
    },
    {
      title: "Returns & Exchanges",
      content: (
        <>
          <p>Free exchanges & returns for UK orders where eligible.</p>
          <p>International return shipping costs may apply.</p>
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageWrap}>
      <div className={styles.breadcrumb}>
        <Link href="/new-in">New In</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{product.title}</span>
      </div>

      <div className={styles.main}>
        <div className={styles.galleryCol}>
          <ImageGallery images={images} />
        </div>

        <div className={styles.infoCol}>
          <p className={styles.brand}>{product.vendor}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>{priceStr}</p>
          {compareStr && <p className={styles.comparePrice}>{compareStr}</p>}
          <p className={styles.desc}>
            {product.description || "Crafted for quiet luxury with signature embroidery, rich fabrics, and a refined silhouette."}
          </p>

          {sizeOption && (
            <div className={styles.optionSection}>
              <div className={styles.optionLabelRow}>
                <span className={styles.optionLabel}>Size</span>
                <button type="button" className={styles.sizeGuide}>
                  Size guide
                </button>
              </div>
              <div className={styles.sizeGrid}>
                {sizeOption.values.map((size) => {
                  const available = sizeAvailability[size] !== false;
                  return (
                    <button
                      key={size}
                      type="button"
                      className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnSelected : ""}`}
                      onClick={() => setSelectedSize(size)}
                      disabled={!available}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <p className={styles.stock}>{selectedSizeInStock ? "In stock" : "Out of stock"}</p>
            </div>
          )}

          <p className={styles.urgency}>
            Order within the next 08 Hours 35 Minutes with Priority Shipping to receive by Fri, Mar 28.
          </p>

          {colors.length > 0 && (
            <div className={styles.optionSection}>
              <span className={styles.optionLabel}>Colour</span>
              <div className={styles.swatches}>
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`${styles.swatch} ${selectedColor === color.name ? styles.swatchSelected : ""}`}
                    style={{ background: color.value }}
                    title={color.name}
                    aria-label={color.name}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className={styles.addToCart}
            onClick={handleAddToCart}
            disabled={cartLoading}
          >
            {cartLoading ? "ADDING..." : "ADD TO CART"}
          </button>

          <button type="button" className={styles.shopPay}>
            Buy with Shop Pay
          </button>

          <button
            type="button"
            className={styles.wishlistBtn}
            onClick={handleWishlist}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          </button>

          <p className={styles.clearpay}>
            Clearpay available for orders between £70 - £2,500. <span aria-hidden="true">ⓘ</span>
          </p>

          <div className={styles.accordionWrap}>
            <Accordion items={accordionItems} />
          </div>

          <p className={styles.sku}>SKU: {buildSku(product.handle)}</p>
        </div>
      </div>

      {toastMsg && <div className={styles.toast}>{toastMsg}</div>}
    </div>
  );
}
