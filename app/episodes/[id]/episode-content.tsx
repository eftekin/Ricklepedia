"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getEpisode, getMultipleCharacters } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PortalLoader } from "@/components/ui/portal-loader";
import CharacterGrid from "@/components/character/CharacterGrid";

interface EpisodeContentProps {
  episodeId: string;
}

export default function EpisodeContent({ episodeId }: EpisodeContentProps) {
  const [episode, setEpisode] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const episodeData = await getEpisode(episodeId);
        setEpisode(episodeData);

        const characterIds = episodeData.characters.map((url: string) =>
          parseInt(url.split("/").pop() || "0")
        );

        const charactersData = await getMultipleCharacters(characterIds);
        setCharacters(Array.isArray(charactersData) ? charactersData : [charactersData]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch episode data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [episodeId]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-24">
        <PortalLoader className="py-20" />
      </main>
    );
  }

  if (error || !episode) {
    return (
      <main className="container mx-auto px-4 py-24">
        <Link
          href="/episodes"
          className="inline-flex items-center mb-6 text-[#9cf7f7] hover:text-[#ffffff]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Episodes
        </Link>
        <div className="text-center py-10">
          <p className="text-red-500">{error || "Failed to load episode"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/episodes"
          className="inline-flex items-center mb-6 text-[#9cf7f7] hover:text-[#ffffff]"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Episodes
        </Link>

        <Card className="border border-[#00ffd1] bg-[#0a0a0a] shadow-lg mb-8">
          <CardContent className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-[#00ffd1]">{episode.name}</h1>
            <div className="flex flex-wrap gap-4 items-center mb-4">
              <Badge
                variant="secondary"
                className="text-sm bg-[#00ffd1]/10 text-[#00ffd1] hover:bg-[#00ffd1]/20"
              >
                {episode.episode}
              </Badge>
              <span className="text-[#98fffd]">{episode.air_date}</span>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6 text-[#00ffd1]">
          Characters in this episode
        </h2>
        <CharacterGrid characters={characters} />
      </div>
    </main>
  );
}
