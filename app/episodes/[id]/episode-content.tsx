import Link from "next/link";
import { getCharactersByIds, getEpisode, idFromUrl } from "@/lib/api";
import CharacterGrid from "@/components/character/CharacterGrid";
import { Character, Episode } from "@/types";

interface EpisodeContentProps {
  episodeId: string;
}

export default async function EpisodeContent({ episodeId }: EpisodeContentProps) {
  let episode: Episode | null = null;
  let characters: Character[] = [];
  try {
    episode = await getEpisode(episodeId);
    characters = await getCharactersByIds(episode!.characters.map(idFromUrl));
  } catch {
    // handled below
  }

  if (!episode) {
    return (
      <div className="page wrap">
        <Link className="back" href="/episodes">
          Back to all episodes
        </Link>
        <div className="cel state">
          <h1>No record for this episode</h1>
          <p>The archive holds 51 episodes, numbered 1 to 51.</p>
          <Link className="btn" href="/episodes">
            Browse episodes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page wrap">
      <Link className="back" href="/episodes">
        Back to all episodes
      </Link>
      <div className="section-head">
        <h1>{episode.name}</h1>
        <p>
          <span className="num">{episode.episode}</span>, aired {episode.air_date}.
        </p>
      </div>
      <section aria-labelledby="ep-cast">
        <div className="section-head">
          <h2 id="ep-cast" style={{ fontSize: "var(--text-xl)" }}>
            <span className="num">{episode.characters.length}</span> characters in this episode
          </h2>
        </div>
        <CharacterGrid characters={characters} />
      </section>
    </div>
  );
}
