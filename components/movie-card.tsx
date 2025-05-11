import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieSearchResult } from "@/types/movie";

interface MovieCardProps {
  movie: MovieSearchResult;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <Card className="py-0 overflow-hidden transition-all hover:shadow-lg relative group gap-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold line-clamp-1">{movie.Title}</h3>
          <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
            <span>{movie.Year}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
