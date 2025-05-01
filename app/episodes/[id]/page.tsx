import { getEpisodes } from "@/lib/api";
import EpisodeContent from "./episode-content";

interface EpisodePageProps {
  params: {
    id: string;
  };
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

export default function EpisodePage({ params }: EpisodePageProps) {
  return <EpisodeContent episodeId={params.id} />;
}
