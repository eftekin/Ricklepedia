import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCharacters, getCharactersByIds, getEpisodes } from "@/lib/api";
import CharacterGrid from "@/components/character/CharacterGrid";
import CharacterFilters from "@/components/character/CharacterFilters";
import Pagination from "@/components/character/Pagination";
import StatusPill from "@/components/character/StatusPill";
import { SearchParams, Character } from "@/types";

interface HomeProps {
  searchParams: Promise<{
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: string;
  }>;
}

const FAMILY_IDS = [1, 2, 3, 4, 5];
const FAN_IDS = [2, 1, 265]; // Morty, Rick, Pickle Rick

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;
  const currentPage = sp.page ? parseInt(sp.page) || 1 : 1;

  const apiParams: SearchParams = { page: currentPage };
  if (sp.name) apiParams.name = sp.name;
  if (sp.status) apiParams.status = sp.status as SearchParams["status"];
  if (sp.species) apiParams.species = sp.species;
  if (sp.gender) apiParams.gender = sp.gender as SearchParams["gender"];
  const filtered = Boolean(sp.name || sp.status || sp.species || sp.gender);
  const query = new URLSearchParams(
    Object.entries({ name: sp.name, status: sp.status, species: sp.species, gender: sp.gender }).filter(
      (e): e is [string, string] => Boolean(e[1])
    )
  ).toString();

  let characters: Character[] = [];
  let totalPages = 1;
  let total = 0;
  let error: string | null = null;
  let featured: Character[] = [];
  let episodeCount = 51;

  const [list, extra, episodes] = await Promise.allSettled([
    getCharacters(apiParams),
    getCharactersByIds(Array.from(new Set([...FAMILY_IDS, ...FAN_IDS]))),
    getEpisodes(1),
  ]);
  if (list.status === "fulfilled") {
    characters = list.value.results;
    totalPages = list.value.info.pages;
    total = list.value.info.count;
  } else if (!String(list.reason).includes("404")) {
    error = "Characters load from rickandmortyapi.com, which is down or out of reach right now.";
  }
  if (extra.status === "fulfilled") featured = extra.value;
  if (episodes.status === "fulfilled") episodeCount = episodes.value.info.count;

  const byId = new Map(featured.map((c) => [c.id, c]));
  const family = FAMILY_IDS.map((id) => byId.get(id)).filter((c): c is Character => Boolean(c));
  const fan = FAN_IDS.map((id) => byId.get(id)).filter((c): c is Character => Boolean(c));
  const mostSeen = [...characters].sort((a, b) => b.episode.length - a.episode.length || a.name.localeCompare(b.name)).slice(0, 8);
  const showFamily = !filtered && currentPage === 1 && family.length > 0;

  return (
    <>
      <section className="hero" aria-label="Search the archive">
        <div className="wrap">
          <div className="hero-copy">
            <h1 id="hero-logo">
              <Image src="/logo.png" alt="Ricklepedia" width={1024} height={389} priority />
            </h1>
            <p>Every Rick and Morty character and episode, seasons 1 to 5.</p>
            <form className="search" role="search" action="/#cast" method="get">
              <label className="visually-hidden" htmlFor="hero-q">
                Character name
              </label>
              <input className="input" id="hero-q" name="name" type="search" placeholder="Try Squanchy" autoComplete="off" defaultValue={sp.name} />
              <button className="btn btn--primary" type="submit">
                Search
              </button>
              <Link className="btn btn--ghost" href="/random" prefetch={false}>
                Random character
              </Link>
            </form>
          </div>
          {fan.length === 3 && (
            <div className="fan" aria-hidden="true">
              {fan.map((c) => (
                <figure className="cel" key={c.id}>
                  <Image className="portrait" src={c.image} alt="" width={300} height={300} priority />
                  <figcaption>{c.name}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {showFamily && (
        <section className="section wrap" aria-labelledby="family-title">
          <div className="section-head">
            <h2 id="family-title">The Smith household</h2>
          </div>
          <ul className="family">
            {family.map((c) => (
              <li key={c.id}>
                <Link className="cel" href={`/character/${c.id}`}>
                  <Image className="portrait" src={c.image} alt="" width={300} height={300} />
                  <h3>{c.name}</h3>
                  <div className="meta">
                    <StatusPill status={c.status} />
                    <span>{c.species}</span>
                  </div>
                  <p className="eps">
                    <span className="num">{c.episode.length}</span>episodes
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="section wrap" id="cast" aria-labelledby="cast-title">
        <div className="section-head">
          <h2 id="cast-title">{filtered ? "Search results" : "All characters"}</h2>
          {total > 0 && (
            <p>
              <span className="num">{total}</span> {filtered ? "match" : "characters in the archive"}, page{" "}
              <span className="num">{currentPage}</span> of <span className="num">{totalPages}</span>.
            </p>
          )}
        </div>
        <Suspense>
          <CharacterFilters />
        </Suspense>
        {error ? (
          <div className="cel state" role="alert">
            <h3>The archive did not answer</h3>
            <p>{error} Try again in a minute.</p>
            <Link className="btn btn--primary" href={query ? `/?${query}#cast` : "/#cast"}>
              Try again
            </Link>
          </div>
        ) : (
          <>
            <CharacterGrid characters={characters} />
            <Pagination currentPage={currentPage} totalPages={totalPages} query={query} />
          </>
        )}
      </section>

      {mostSeen.length > 1 && (
        <section className="section wrap" aria-labelledby="most-title">
          <div className="section-head">
            <h2 id="most-title">Who shows up most</h2>
            <p>
              On this page, out of <span className="num">{episodeCount}</span> episodes.
            </p>
          </div>
          <ol className="bars">
            {mostSeen.map((c) => (
              <li key={c.id}>
                <span className="who">{c.name}</span>
                <span className="track" aria-hidden="true">
                  <span className="fill" style={{ width: `${(c.episode.length / episodeCount) * 100}%` }} />
                </span>
                <span className="count num">{c.episode.length}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </>
  );
}
