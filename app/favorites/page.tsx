"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFavorites } from '@/lib/favorites';
import { getCharacter } from '@/lib/api';
import { Character } from '@/types';
import CharacterGrid from '@/components/character/CharacterGrid';
import { Button } from '@/components/ui/button';
import { PortalLoader } from '@/components/ui/portal-loader';
import { ChevronLeft } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get favorites from localStorage
    const favs = getFavorites();
    setFavorites(favs);

    // Fetch character data for each favorite
    if (favs.length > 0) {
      setLoading(true);
      
      Promise.all(
        favs.map((id) => getCharacter(id).catch(() => null))
      )
        .then((results) => {
          const validCharacters = results.filter(Boolean);
          setCharacters(validCharacters);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load favorites');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Characters
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Your Favorite Characters
      </h1>
      
      {loading ? (
        <PortalLoader className="py-20" />
      ) : error ? (
        <div className="text-center py-10">
          <div className="text-destructive text-xl font-semibold mb-2">Error</div>
          <p className="text-muted-foreground">{error}</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-6">
            You haven't added any characters to your favorites yet.
          </p>
          <Link href="/" passHref>
            <Button>Browse Characters</Button>
          </Link>
        </div>
      ) : (
        <CharacterGrid characters={characters} />
      )}
    </div>
  );
}