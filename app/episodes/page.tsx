import Link from "next/link";
import { getAllEpisodes } from "@/lib/api";
import { Episode } from "@/types";

export default async function EpisodesPage() {
  let episodes: Episode[] = [];
  let failed = false;
  try {
    episodes = await getAllEpisodes();
  } catch {
    failed = true;
  }

  // "S02E05" -> season 2, episode 5
  const seasons = new Map<number, Episode[]>();
  for (const e of episodes) {
    const season = parseInt(e.episode.slice(1, 3));
    seasons.set(season, [...(seasons.get(season) ?? []), e]);
  }
  const first = episodes[0];
  const last = episodes[episodes.length - 1];

  return (
    <div className="page wrap">
      <div className="section-head">
        <h1>
          {seasons.size > 0 ? `${seasons.size} seasons, ${episodes.length} episodes` : "Episodes"}
        </h1>
        {first && last && (
          <p>
            {first.air_date} to {last.air_date}.
          </p>
        )}
      </div>

      {failed ? (
        <div className="cel state" role="alert">
          <h2>The archive did not answer</h2>
          <p>Episodes load from rickandmortyapi.com, which is down or out of reach right now. Try again in a minute.</p>
          <Link className="btn btn--primary" href="/episodes">
            Try again
          </Link>
        </div>
      ) : (
        <div className="seasons">
          {Array.from(seasons.entries()).map(([season, list]) => {
            const years = Array.from(new Set(list.map((e) => e.air_date.slice(-4))));
            return (
              <article className="cel season" key={season}>
                <div className="season-head">
                  <h2 style={{ fontSize: "var(--text-lg)" }}>Season {season}</h2>
                  <span className="num">{years.length > 1 ? `${years[0]} to ${years[years.length - 1]}` : years[0]}</span>
                </div>
                <ol>
                  {list.map((e) => (
                    <li key={e.id}>
                      <Link href={`/episodes/${e.id}`}>
                        <span className="num">{parseInt(e.episode.slice(4))}</span>
                        <span>{e.name}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
