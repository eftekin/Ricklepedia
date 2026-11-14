import { Character, CharacterApiResponse, Episode, EpisodeApiResponse, SearchParams } from "@/types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(
  params: SearchParams = {}
): Promise<CharacterApiResponse> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Oops! Looks like this one got lost in the multiverse (404 Not Found)"
      );
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }

  return response.json();
}

export async function getCharacter(id: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Oops! Looks like this one got lost in the multiverse (404 Not Found)"
      );
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }

  return response.json();
}

export async function searchCharacters(
  name: string,
  page = 1
): Promise<CharacterApiResponse> {
  return getCharacters({ name, page });
}

export async function getEpisodes(page = 1) {
  // the episode list is frozen at season 5, so one copy a day serves every page and the build
  const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`, { next: { revalidate: 86400 } });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Oops! Looks like this one got lost in the multiverse (404 Not Found)"
      );
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  return response.json();
}

export async function getEpisode(id: string) {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Oops! Looks like this one got lost in the multiverse (404 Not Found)"
      );
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  return response.json();
}

export async function getMultipleCharacters(ids: number[]) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Oops! Looks like this one got lost in the multiverse (404 Not Found)"
      );
    } else {
      throw new Error(`API request failed with status ${response.status}`);
    }
  }
  return response.json();
}

// the API answers a one-id list with a bare object
const asArray = <T,>(data: T | T[]): T[] => (Array.isArray(data) ? data : [data]);

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  return asArray(await getMultipleCharacters(ids));
}

export async function getEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  const response = await fetch(`${API_BASE_URL}/episode/${ids.join(",")}`);
  if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
  return asArray(await response.json());
}

export async function getAllEpisodes(): Promise<Episode[]> {
  const first: EpisodeApiResponse = await getEpisodes(1);
  const rest: EpisodeApiResponse[] = await Promise.all(
    Array.from({ length: first.info.pages - 1 }, (_, i) => getEpisodes(i + 2))
  );
  return [first, ...rest].flatMap((page) => page.results);
}

export const idFromUrl = (url: string) => Number(url.split("/").pop());
