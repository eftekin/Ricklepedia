"use client";

import { useState, useSyncExternalStore } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

export default function FavoriteButton({ characterId }: { characterId: number }) {
  // the server never knows the visitor's favorites, so it renders "not saved"
  const [, rerender] = useState(0);
  const isFav = useSyncExternalStore(subscribe, () => isFavorite(characterId), () => false);

  return (
    <button
      className="btn btn--primary"
      type="button"
      aria-pressed={isFav}
      onClick={() => {
        toggleFavorite(characterId);
        rerender((n) => n + 1);
      }}
    >
      {isFav ? "In favorites" : "Add to favorites"}
    </button>
  );
}
