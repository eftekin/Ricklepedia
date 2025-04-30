"use client";

import { Character } from "@/types";

export function getFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(characterId: number): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  
  if (!favorites.includes(characterId)) {
    const newFavorites = [...favorites, characterId];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }
}

export function removeFavorite(characterId: number): void {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const newFavorites = favorites.filter(id => id !== characterId);
  localStorage.setItem('favorites', JSON.stringify(newFavorites));
}

export function isFavorite(characterId: number): boolean {
  if (typeof window === 'undefined') return false;
  
  const favorites = getFavorites();
  return favorites.includes(characterId);
}

export function toggleFavorite(characterId: number): boolean {
  if (isFavorite(characterId)) {
    removeFavorite(characterId);
    return false;
  } else {
    addFavorite(characterId);
    return true;
  }
}