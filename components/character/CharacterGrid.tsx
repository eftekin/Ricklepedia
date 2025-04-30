import { Character } from '@/types';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No characters found</h2>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}