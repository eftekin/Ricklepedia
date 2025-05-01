import { Character } from "@/types";
import CharacterCard from "./CharacterCard";

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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {characters.map((character) => (
          <div key={character.id} className="h-full">
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  );
}
