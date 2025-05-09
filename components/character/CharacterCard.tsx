"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Character } from "@/types";
import { cn } from "@/lib/utils";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [isFav, setIsFav] = useState(isFavorite(character.id));
  const { toast } = useToast();

  // Get status color
  const getStatusColor = (status: Character["status"]) => {
    switch (status) {
      case "Alive":
        return "bg-[#00ff9f]";
      case "Dead":
        return "bg-red-500";
      default:
        return "bg-[#98fffd]";
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = toggleFavorite(character.id);
    setIsFav(newState);

    toast({
      title: newState ? "Added to favorites" : "Removed from favorites",
      description: newState
        ? `${character.name} has been added to your favorites.`
        : `${character.name} has been removed from your favorites.`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/character/${character.id}`} passHref>
      <Card className="group relative h-full overflow-hidden border border-[#00ffd1] bg-gradient-to-b from-[#0a0a0a] to-[#0f1a1a] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,255,209,0.3)]">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-[#0a0a0a]/30 backdrop-blur-sm hover:bg-[#0a0a0a]/50 z-10 transition-all duration-300 hover:scale-110"
            onClick={handleFavoriteToggle}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all duration-300",
                isFav
                  ? "fill-red-500 text-red-500 scale-110"
                  : "fill-transparent text-[#98fffd]"
              )}
            />
          </Button>
        </div>
        <CardContent className="p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg line-clamp-1 text-[#00ffd1] group-hover:text-[#00ff9f] transition-colors duration-300">
            {character.name}
          </h3>
          <div className="flex items-center mt-2">
            <span
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full mr-2 ${getStatusColor(
                character.status
              )} animate-pulse`}
            ></span>
            <span className="text-xs sm:text-sm text-[#98fffd] group-hover:text-white transition-colors duration-300">
              {character.status} - {character.species}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-3 pt-0 sm:p-4 sm:pt-0">
          <Badge
            variant="secondary"
            className="text-xs bg-[#00ffd1]/10 text-[#00ffd1] hover:bg-[#00ffd1]/20 transition-colors duration-300"
          >
            {character.gender}
          </Badge>
          {character.type && (
            <Badge
              variant="outline"
              className="text-xs border-[#98fffd] text-[#98fffd] hover:bg-[#98fffd]/10 transition-colors duration-300"
            >
              {character.type}
            </Badge>
          )}
          <Badge
            variant="outline"
            className="text-xs border-[#98fffd] text-[#98fffd] cursor-pointer hover:bg-[#98fffd]/10 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const firstEpisodeId = character.episode[0].split("/").pop();
              window.location.href = `/episodes/${firstEpisodeId}`;
            }}
          >
            {`${character.episode.length} Episode${
              character.episode.length !== 1 ? "s" : ""
            }`}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
