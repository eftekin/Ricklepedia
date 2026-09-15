import { getEpisodes } from "@/lib/api";
import EpisodeContent from "./episode-content";

interface EpisodePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const allEpisodes = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await getEpisodes(currentPage);
      allEpisodes.push(...response.results);

      // Check if there are more pages
      hasNextPage = response.info.next !== null;
      currentPage++;
    }

    return allEpisodes.map((episode: { id: number }) => ({
      id: episode.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id } = await params;
  return <EpisodeContent episodeId={id} />;
}
