import { CharacterApiResponse, SearchParams } from "@/types";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(params: SearchParams = {}): Promise<CharacterApiResponse> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/character${queryString ? `?${queryString}` : ''}`;
  
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

export async function searchCharacters(name: string, page = 1): Promise<CharacterApiResponse> {
  return getCharacters({ name, page });
}