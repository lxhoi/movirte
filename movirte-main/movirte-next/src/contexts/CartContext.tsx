"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Cart, CartLine } from "@/lib/shopify/types";
import {
  createCart as apiCreateCart,
  addToCart as apiAddToCart,
  updateCartLine as apiUpdateCartLine,
  removeFromCart as apiRemoveFromCart,
  fetchCart as apiFetchCart,
  updateCartNote as apiUpdateCartNote,
} from "@/lib/shopify/api";

/* ─── Types ───────────────────────────────────────────────────── */

interface CartContextValue {
  cart: Cart | null;
  lines: CartLine[];
  totalQuantity: number;
  subtotal: string;
  note: string;
  loading: boolean;
  error: string | null;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateNote: (note: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_ID_KEY = "movirte_cart_id";

/* ─── Provider ────────────────────────────────────────────────── */

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Hydrate cart from localStorage on mount */
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_ID_KEY);
    if (!savedCartId) return;

    setLoading(true);
    apiFetchCart(savedCartId)
      .then((c) => {
        if (c && c.totalQuantity > 0) {
          setCart(c);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(CART_ID_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  /* Persist cart ID whenever it changes */
  useEffect(() => {
    if (cart?.id) {
      localStorage.setItem(CART_ID_KEY, cart.id);
    }
  }, [cart?.id]);

  const ensureCart = useCallback(async (): Promise<string> => {
    if (cart?.id) return cart.id;
    const newCart = await apiCreateCart();
    setCart(newCart);
    return newCart.id;
  }, [cart?.id]);

  /* ── Actions ──────────────────────────────────────────────────── */

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setLoading(true);
      setError(null);
      try {
        const cartId = await ensureCart();
        const updated = await apiAddToCart(cartId, [{ merchandiseId, quantity }]);
        setCart(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add item");
      } finally {
        setLoading(false);
      }
    },
    [ensureCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart?.id) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await apiUpdateCartLine(cart.id, [{ id: lineId, quantity }]);
        setCart(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update item");
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart?.id) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await apiRemoveFromCart(cart.id, [lineId]);
        setCart(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove item");
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const updateNote = useCallback(
    async (note: string) => {
      if (!cart?.id) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await apiUpdateCartNote(cart.id, note);
        setCart(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update note");
      } finally {
        setLoading(false);
      }
    },
    [cart?.id]
  );

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart?.checkoutUrl]);

  /* ── Derived values ───────────────────────────────────────────── */

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = cart
    ? `${cart.cost.subtotalAmount.currencyCode === "GBP" ? "£" : "$"}${parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}`
    : "£0.00";
  const note = cart?.note ?? "";

  return (
    <CartContext.Provider
      value={{
        cart,
        lines,
        totalQuantity,
        subtotal,
        note,
        loading,
        error,
        addItem,
        updateItem,
        removeItem,
        updateNote,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ────────────────────────────────────────────────────── */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}
