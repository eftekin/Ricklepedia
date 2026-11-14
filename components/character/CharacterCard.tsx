import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types";
import StatusPill from "./StatusPill";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <Link className="cel" href={`/character/${character.id}`}>
      <Image className="portrait" src={character.image} alt="" width={300} height={300} />
      <div>
        <h3>{character.name}</h3>
        <div className="meta">
          <StatusPill status={character.status} />
        </div>
        <p className="small">{character.species}</p>
      </div>
    </Link>
  );
}
