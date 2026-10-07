'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { WishlistItem } from '@/types';

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'lata_jewellers_wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage quota full fallback
      }
    }
  }, [items, isLoaded]);

  const addItem = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.some((item) => item.productId === productId)) return prev;
      return [...prev, { productId, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.productId === productId);
      if (exists) {
        return prev.filter((item) => item.productId !== productId);
      }
      return [...prev, { productId, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleItem,
        isInWishlist,
        clearWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
