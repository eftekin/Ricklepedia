import Image from "next/image";
import Link from "next/link";
import { getAllEpisodes, getCharacter, getCharacters, idFromUrl } from "@/lib/api";
import StatusPill from "@/components/character/StatusPill";
import { Character, Episode } from "@/types";
import FavoriteButton from "./favorite-button";

interface CharacterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const allCharacters = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await getCharacters({ page: currentPage });
      allCharacters.push(...response.results);
      hasNextPage = response.info.next !== null;
      currentPage++;
    }

    return allCharacters.map((character: { id: number }) => ({
      id: character.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

function NotFound({ title, text }: { title: string; text: string }) {
  return (
    <div className="page wrap">
      <Link className="back" href="/">
        Back to all characters
      </Link>
      <div className="cel state">
        <h1>{title}</h1>
        <p>{text}</p>
        <Link className="btn" href="/">
          Browse characters
        </Link>
      </div>
    </div>
  );
}

const label = (s: string) => (s === "unknown" ? "Unknown" : s);

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;
  const characterId = parseInt(id);

  if (isNaN(characterId)) {
    return <NotFound title="That is not a character number" text="Character addresses end in a number, like /character/1." />;
  }

  let character: Character;
  try {
    character = await getCharacter(characterId);
  } catch {
    return <NotFound title="No record for this character" text="The archive has no character with that number. It holds 826." />;
  }

  let episodes: Episode[] = [];
  try {
    const ids = new Set(character.episode.map(idFromUrl));
    episodes = (await getAllEpisodes()).filter((e) => ids.has(e.id));
  } catch {
    episodes = [];
  }
  const count = character.episode.length;

  return (
    <div className="page wrap">
      <Link className="back" href="/">
        Back to all characters
      </Link>
      <div className="dossier">
        <div className="cel">
          <Image className="portrait" src={character.image} alt="" width={300} height={300} priority />
        </div>
        <div className="record">
          <h1>{character.name}</h1>
          <div className="meta">
            <StatusPill status={character.status} />
          </div>
          <dl className="facts cel">
            <dt>Species</dt>
            <dd>{character.species}</dd>
            {character.type && (
              <>
                <dt>Type</dt>
                <dd>{character.type}</dd>
              </>
            )}
            <dt>Gender</dt>
            <dd>{label(character.gender)}</dd>
            <dt>Origin</dt>
            <dd>{label(character.origin.name)}</dd>
            <dt>Last seen</dt>
            <dd>{label(character.location.name)}</dd>
          </dl>
          <p className="big-count">
            In <span className="num">{count}</span>
            {count === 1 ? "episode" : "episodes"}
          </p>
          <div>
            <FavoriteButton characterId={characterId} />
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="eps-title">
        <div className="section-head">
          <h2 id="eps-title">Episodes</h2>
        </div>
        {episodes.length > 0 ? (
          <div className="cel table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Episode</th>
                  <th scope="col">Title</th>
                  <th scope="col">Aired</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((e) => (
                  <tr key={e.id}>
                    <td>{e.episode}</td>
                    <td>
                      <Link href={`/episodes/${e.id}`}>{e.name}</Link>
                    </td>
                    <td>{e.air_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="cel state">
            <p>The episode list did not load. Refresh the page to try again.</p>
          </div>
        )}
      </section>
    </div>
  );
}
