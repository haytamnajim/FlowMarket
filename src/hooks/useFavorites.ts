"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "flowmarket_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Ignore storage errors
    }
    setMounted(true);
  }, []);

  const toggleFavorite = (workflowId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(workflowId);
      const next = isFav ? prev.filter((id) => id !== workflowId) : [...prev, workflowId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const isFavorite = (workflowId: string) => favorites.includes(workflowId);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    mounted,
  };
}
