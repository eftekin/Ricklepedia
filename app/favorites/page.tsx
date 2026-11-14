"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";
import { getCharactersByIds } from "@/lib/api";
import { Character } from "@/types";
import CharacterCard from "@/components/character/CharacterCard";

export default function FavoritesPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ids = getFavorites();
    getCharactersByIds(ids)
      .then(setCharacters)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page wrap">
      <div className="section-head">
        <h1>Favorites</h1>
        <p>Kept in this browser.</p>
      </div>

      {loading ? (
        <p aria-live="polite">Loading your favorites.</p>
      ) : error ? (
        <div className="cel state" role="alert">
          <h2>The archive did not answer</h2>
          <p>Your favorites are saved, but their records did not load. Refresh the page to try again.</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="cel state">
          <h2>Nothing saved yet</h2>
          <p>Open a character and press Add to favorites to keep them here.</p>
          <Link className="btn" href="/">
            Browse characters
          </Link>
        </div>
      ) : (
        <ul className="cast">
          {characters.map((c) => (
            <li key={c.id}>
              <CharacterCard character={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
