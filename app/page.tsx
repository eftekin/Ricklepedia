import { Suspense } from "react";
import { getCharacters } from "@/lib/api";
import CharacterGrid from "@/components/character/CharacterGrid";
import SearchInput from "@/components/ui/search-input";
import CharacterFilters from "@/components/character/CharacterFilters";
import Pagination from "@/components/character/Pagination";
import { PortalLoader } from "@/components/ui/portal-loader";
import { SearchParams, Character } from "@/types";
import Image from "next/image";

interface HomeProps {
  searchParams: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  // Prepare API parameters
  const apiParams: SearchParams = {};

  if (searchParams.name) apiParams.name = searchParams.name;
  if (searchParams.status) apiParams.status = searchParams.status as any;
  if (searchParams.species) apiParams.species = searchParams.species;
  if (searchParams.gender) apiParams.gender = searchParams.gender as any;
  if (currentPage) apiParams.page = currentPage;

  let characters: Character[] = [];
  let totalPages = 1;
  let error = null;

  try {
    const response = await getCharacters(apiParams);
    characters = response.results;
    totalPages = response.info.pages;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch characters";
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 max-w-3xl mx-auto text-center">
        <Image
          src="logo.png"
          alt="Rick and Morty Logo"
          width={500}
          height={100}
          className="mx-auto mb-4"
        />
        <p className="text-muted-foreground text-lg mb-6">
          Explore all characters from the Rick and Morty multiverse
        </p>
        <div className="flex justify-center mb-6">
          <SearchInput />
        </div>
      </div>

      <div className="mb-6">
        <CharacterFilters />
      </div>

      <Suspense fallback={<PortalLoader className="py-20" />}>
        {error ? (
          <div className="text-center py-10">
            <div className="text-destructive text-xl font-semibold mb-2">Error</div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <>
            <CharacterGrid characters={characters} />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </>
        )}
      </Suspense>
    </div>
  );
}
