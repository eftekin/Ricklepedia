"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Character } from '@/types';
import { cn } from '@/lib/utils';
import { toggleFavorite, isFavorite } from '@/lib/favorites';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [isFav, setIsFav] = useState(isFavorite(character.id));
  const { toast } = useToast();
  
  // Get status color
  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newState = toggleFavorite(character.id);
    setIsFav(newState);
    
    toast({
      title: newState ? 'Added to favorites' : 'Removed from favorites',
      description: newState 
        ? `${character.name} has been added to your favorites.` 
        : `${character.name} has been removed from your favorites.`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/character/${character.id}`} passHref>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/30 backdrop-blur-sm hover:bg-background/50 z-10"
            onClick={handleFavoriteToggle}
          >
            <Heart 
              className={cn(
                "h-5 w-5 transition-colors",
                isFav ? "fill-red-500 text-red-500" : "fill-transparent text-white"
              )} 
            />
          </Button>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-bold text-lg line-clamp-1">{character.name}</h3>
          <div className="flex items-center mt-2">
            <span className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusColor(character.status)}`}></span>
            <span className="text-sm text-muted-foreground">{character.status} - {character.species}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          <Badge variant="secondary" className="text-xs">
            {character.gender}
          </Badge>
          {character.type && (
            <Badge variant="outline" className="text-xs">
              {character.type}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}