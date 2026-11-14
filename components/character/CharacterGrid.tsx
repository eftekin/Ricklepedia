import Link from "next/link";
import { Character } from "@/types";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps {
  characters: Character[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  if (!characters || characters.length === 0) {
    return (
      <div className="cel state">
        <h3>Nobody here by that name</h3>
        <p>Try a shorter name, or set status and species back to all.</p>
        <Link className="btn" href="/">
          Clear filters
        </Link>
      </div>
    );
  }

  return (
    <ul className="cast">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  );
}
