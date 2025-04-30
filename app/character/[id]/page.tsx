import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getCharacter, getCharacters } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortalLoader } from "@/components/ui/portal-loader";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import FavoriteButton from "./favorite-button";

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const allCharacters = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await getCharacters({ page: currentPage });
      allCharacters.push(...response.results);

      // Check if there are more pages
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

export default async function CharacterPage({ params }: CharacterPageProps) {
  const characterId = parseInt(params.id);

  if (isNaN(characterId)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-[#00ffd1]">
        <h1 className="text-2xl font-bold mb-4">Invalid Character ID</h1>
        <p className="mb-6 text-[#98fffd]">The character ID must be a number.</p>
        <Link href="/" passHref>
          <Button className="text-[#00ffd1] border-[#00ffd1] hover:bg-[#00ffd1] hover:text-black">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Button>
        </Link>
      </div>
    );
  }

  try {
    const character = await getCharacter(characterId);
    const episodeNumbers = character.episode
      .map((ep: string) => {
        const match = ep.match(/\/(\d+)$/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    return (
      <div className="container mx-auto px-4 py-8 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center mb-6 text-[#9cf7f7] hover:text-[#ffffff]"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Characters
          </Link>

          <Card className="border border-[#00ffd1] bg-[#0a0a0a] shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="relative w-full max-w-[300px] aspect-square">
                    <Image
                      src={character.image}
                      alt={character.name}
                      fill
                      className="rounded-lg object-cover"
                      priority
                    />
                    <div className="absolute top-2 right-2 z-10">
                      <FavoriteButton characterId={characterId} />
                    </div>
                  </div>
                </div>

                <div className="text-[#98fffd] space-y-6">
                  <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold mb-4 text-[#00ffd1]">
                      {character.name}
                    </h1>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Status
                      </h2>
                      <Badge
                        variant="outline"
                        className="text-[#98fffd] border-[#98fffd]"
                      >
                        {character.status}
                      </Badge>
                    </div>

                    <Separator className="border-[#00ffd1]" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Species
                      </h2>
                      <p>{character.species}</p>
                    </div>

                    <Separator className="border-[#00ffd1]" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Gender
                      </h2>
                      <p>{character.gender}</p>
                    </div>

                    <Separator className="border-[#00ffd1]" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Origin
                      </h2>
                      <p>{character.origin.name}</p>
                    </div>

                    <Separator className="border-[#00ffd1]" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Last Known Location
                      </h2>
                      <p>{character.location.name}</p>
                    </div>

                    <Separator className="border-[#00ffd1]" />

                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#00ffd1]">
                        Episodes
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {episodeNumbers.map((epNum) => (
                          <Badge
                            key={epNum}
                            variant="outline"
                            className="text-[#98fffd] border-[#98fffd]"
                          >
                            Episode {epNum}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#00ffd1]">Character Not Found</h1>
        <p className="mb-6 text-[#98fffd]">Sorry, we couldn't find that character.</p>
        <Link href="/" passHref>
          <Button className="text-[#00ffd1] border-[#00ffd1] hover:bg-[#00ffd1] hover:text-black">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Button>
        </Link>
      </div>
    );
  }
}
