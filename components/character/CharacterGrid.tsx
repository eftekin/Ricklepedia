import { Character } from "@/types";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  if (!characters || characters.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-[#00ffd1] mb-4">
          No characters found
        </h2>
        <p className="text-[#98fffd] mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {characters.map((character) => (
          <div
            key={character.id}
            className="h-full transform transition-all duration-300 hover:-translate-y-1"
          >
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
    </div>
  );
}
