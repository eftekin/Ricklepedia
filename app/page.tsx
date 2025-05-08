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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d1515] to-[#0f1a1a]">
      <div className="container mx-auto px-4 py-12 relative">
        <div className="mb-12 max-w-3xl mx-auto text-center relative">
          <div className="relative inline-block">
            <div className="absolute -inset-8 bg-gradient-to-r from-transparent via-[#00ffd1]/5 to-transparent animate-pulse-slow rounded-full blur-xl" />
            <Image
              src="/logo.png"
              alt="Ricklepedia Logo"
              width={400}
              height={150}
              className="mx-auto mb-6 transform transition-all duration-500 hover:scale-105 relative z-10"
              priority
            />
          </div>
          <p className="text-lg text-[#98fffd] mb-8 font-mono italic animate-fade-in">
            Because the Citadel doesn&apos;t keep records — but we do!
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 flex items-center justify-center transform transition-all duration-300 hover:scale-[1.02]">
          <SearchInput />
        </div>

        <div className="mb-12 backdrop-blur-sm bg-[#0a0a0a]/30 rounded-lg p-4 border border-[#00ffd1]/20">
          <CharacterFilters />
        </div>

        {error ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <Suspense fallback={<PortalLoader />}>
            <CharacterGrid characters={characters} />
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
}
