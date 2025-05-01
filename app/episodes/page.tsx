"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getEpisodes } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PortalLoader } from "@/components/ui/portal-loader";
import { Badge } from "@/components/ui/badge";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface EpisodesPageProps {
  searchParams?: {
    page?: string;
  };
}

export default function EpisodesPage({ searchParams }: EpisodesPageProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    setCurrentPage(page);

    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const data = await getEpisodes(page);
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch episodes");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [searchParams?.page]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <PortalLoader className="py-20" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#0a0a0a] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#00ffd1]">Episodes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <Link key={episode.id} href={`/episodes/${episode.id}`}>
            <Card className="h-full border border-[#00ffd1]/20 bg-[#0a0a0a] hover:border-[#00ffd1]/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-3 text-[#00ffd1]">{episode.name}</h2>
                <div className="flex flex-wrap gap-3 items-center mb-3">
                  <Badge
                    variant="secondary"
                    className="text-sm bg-[#00ffd1]/10 text-[#00ffd1] hover:bg-[#00ffd1]/20"
                  >
                    {episode.episode}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-sm border-[#98fffd] text-[#98fffd]"
                  >
                    {episode.characters.length} Characters
                  </Badge>
                </div>
                <p className="text-[#98fffd] text-sm">{episode.air_date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => {
              const newPage = currentPage - 1;
              window.location.href =
                newPage === 1 ? "/episodes" : `/episodes?page=${newPage}`;
            }}
            className="border-[#00ffd1]/20 hover:border-[#00ffd1]/40 bg-[#0a0a0a] text-[#98fffd] hover:bg-[#00ffd1]/10 hover:text-[#00ffd1] disabled:text-[#98fffd]/50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => {
              const newPage = currentPage + 1;
              window.location.href = `/episodes?page=${newPage}`;
            }}
            className="border-[#00ffd1]/20 hover:border-[#00ffd1]/40 bg-[#0a0a0a] text-[#98fffd] hover:bg-[#00ffd1]/10 hover:text-[#00ffd1] disabled:text-[#98fffd]/50"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
