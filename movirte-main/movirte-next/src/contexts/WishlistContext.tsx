"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

/* ─── Types ───────────────────────────────────────────────────── */

export interface WishlistItem {
  /** Shopify product ID */
  productId: string;
  /** URL handle — used to link to PDP */
  handle: string;
  /** Display title */
  title: string;
  /** Main image URL */
  imageUrl: string;
  /** Price string e.g. "£245.00" */
  price: string;
  /** ISO timestamp of when this was added */
  addedAt: string;
}

interface WishlistContextValue {
  /** All wishlisted items */
  items: WishlistItem[];
  /** Number of items */
  count: number;
  /** Check if a product is in the wishlist */
  isWishlisted: (productId: string) => boolean;
  /** Toggle an item in/out of the wishlist */
  toggle: (item: Omit<WishlistItem, "addedAt">) => void;
  /** Add an item to the wishlist */
  add: (item: Omit<WishlistItem, "addedAt">) => void;
  /** Remove an item by product ID */
  remove: (productId: string) => void;
  /** Clear everything */
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "movirte_wishlist";

/* ─── Helpers ─────────────────────────────────────────────────── */

function loadFromStorage(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: WishlistItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage full or unavailable — silently degrade
  }
}

/* ─── Provider ────────────────────────────────────────────────── */

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  /* Persist whenever items change (skip initial empty render) */
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const isWishlisted = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const add = useCallback(
    (item: Omit<WishlistItem, "addedAt">) => {
      setItems((prev) => {
        if (prev.some((i) => i.productId === item.productId)) return prev;
        return [...prev, { ...item, addedAt: new Date().toISOString() }];
      });
    },
    []
  );

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const toggle = useCallback(
    (item: Omit<WishlistItem, "addedAt">) => {
      setItems((prev) => {
        const exists = prev.some((i) => i.productId === item.productId);
        if (exists) {
          return prev.filter((i) => i.productId !== item.productId);
        }
        return [...prev, { ...item, addedAt: new Date().toISOString() }];
      });
    },
    []
  );

  const clear = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        isWishlisted,
        toggle,
        add,
        remove,
        clear,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/* ─── Hook ────────────────────────────────────────────────────── */

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a <WishlistProvider>");
  }
  return ctx;
}
