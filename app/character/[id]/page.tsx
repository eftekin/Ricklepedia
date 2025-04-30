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
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Character ID</h1>
        <p className="mb-6">The character ID must be a number.</p>
        <Link href="/" passHref>
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Button>
        </Link>
      </div>
    );
  }

  try {
    const character = await getCharacter(characterId);

    // Get episode numbers from URLs
    const episodeNumbers = character.episode
      .map((ep: string) => {
        const match = ep.match(/\/(\d+)$/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    // Get status color
    const getStatusColor = (status: string) => {
      switch (status) {
        case "Alive":
          return "bg-green-500";
        case "Dead":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    };

    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Characters
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="relative">
            <div className="bg-chart-5/10 p-1 border overflow-hidden relative group">
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                priority
                className="w-full rounded-md"
              />
              <div className="absolute top-3 right-3">
                <FavoriteButton
                  characterId={character.id}
                  characterName={character.name}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{character.name}</h1>
            </div>

            <div className="flex items-center mb-4">
              <span
                className={`h-3 w-3 rounded-full mr-2 ${getStatusColor(
                  character.status
                )}`}
              ></span>
              <span className="text-lg text-muted-foreground">
                {character.status} - {character.species}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Last known location</h3>
                  <p className="text-muted-foreground">{character.location.name}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">First seen in</h3>
                  <p className="text-muted-foreground">{character.origin.name}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                  <div>
                    <span className="text-muted-foreground">Gender:</span>{" "}
                    <span>{character.gender}</span>
                  </div>
                  {character.type && (
                    <div>
                      <span className="text-muted-foreground">Type:</span>{" "}
                      <span>{character.type}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Species:</span>{" "}
                    <span>{character.species}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>{" "}
                    <span>{new Date(character.created).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Episodes</h3>
                <div className="flex flex-wrap gap-2">
                  {episodeNumbers.map((epNum: string) => (
                    <Badge key={epNum} variant="outline" className="text-xs">
                      Episode {epNum}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Character Not Found</h1>
        <p className="mb-6">
          Sorry, we couldn&apos;t find the character you&apos;re looking for.
        </p>
        <Link href="/" passHref>
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Button>
        </Link>
      </div>
    );
  }
}
