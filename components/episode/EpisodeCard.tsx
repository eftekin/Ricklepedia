import Link from "next/link";
import { Episode } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link href={`/episode/${episode.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group border-[#00ffd1]/20 bg-[#0a0a0a] hover:border-[#00ffd1]/40">
        <CardContent className="pt-6">
          <h3 className="font-bold text-lg line-clamp-1 text-[#00ffd1]">
            {episode.name}
          </h3>
          <p className="text-sm text-[#98fffd] mt-2">{episode.air_date}</p>
          <p className="text-sm text-[#98fffd] mt-1">
            Characters: {episode.characters.length}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          <Badge
            variant="secondary"
            className="text-xs bg-[#00ffd1]/10 text-[#00ffd1] hover:bg-[#00ffd1]/20"
          >
            {episode.episode}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
