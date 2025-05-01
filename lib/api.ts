import { CharacterApiResponse, SearchParams } from "@/types";

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
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getCharacter(id: number): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
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
  const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch episodes");
  return response.json();
}

export async function getEpisode(id: string) {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  if (!response.ok) throw new Error("Failed to fetch episode");
  return response.json();
}

export async function getMultipleCharacters(ids: number[]) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(",")}`
  );
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
}
