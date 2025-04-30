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
    <div className="container mx-auto px-4 py-8 bg-[#0a0a0a]">
      <div className="mb-8 max-w-3xl mx-auto text-center">
        <Image
          src="/logo.png"
          alt="Ricklepedia Logo"
          width={400}
          height={150}
          className="mx-auto mb-6"
          priority
        />
        <p className="text-lg text-[#98fffd] mb-8 font-mono italic">
          Because the Citadel doesn&apos;t keep records — but we do!
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-center">
        <SearchInput />
      </div>

      <div className="mb-8">
        <CharacterFilters />
      </div>

      {error ? (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <Suspense fallback={<PortalLoader />}>
          <CharacterGrid characters={characters} />
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
