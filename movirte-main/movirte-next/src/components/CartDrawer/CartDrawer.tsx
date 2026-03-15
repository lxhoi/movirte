"use client";

import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h3>YOUR BAG</h3>
          <button className={styles.close} onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.empty}>
            <p>Your bag is empty</p>
            <button className={styles.continueBtn} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <span>£0</span>
          </div>
          <p className={styles.shippingNote}>Shipping &amp; taxes calculated at checkout</p>
          <button className={styles.checkoutBtn} disabled>
            CHECKOUT
          </button>
          <button className={styles.continueLink} onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
