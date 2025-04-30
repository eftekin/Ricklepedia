"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
  characterId: number;
  characterName: string;
}

export default function FavoriteButton({
  characterId,
  characterName,
}: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsFav(isFavorite(characterId));
    setIsLoaded(true);
  }, [characterId]);

  const handleFavoriteToggle = () => {
    const newState = toggleFavorite(characterId);
    setIsFav(newState);

    toast({
      title: newState ? "Added to favorites" : "Removed from favorites",
      description: newState
        ? `${characterName} has been added to your favorites.`
        : `${characterName} has been removed from your favorites.`,
      duration: 3000,
    });
  };

  if (!isLoaded) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-background/30 backdrop-blur-sm hover:bg-background/50"
      onClick={handleFavoriteToggle}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFav ? "fill-red-500 text-red-500" : "fill-transparent text-white"
        )}
      />
    </Button>
  );
}
