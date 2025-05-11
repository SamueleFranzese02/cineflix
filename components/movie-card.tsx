import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MovieSearchResult, MovieWithRating } from "@/types/movie";
import { useFavourites } from "@/contexts/favourites-context";
import { memo, MouseEvent, useState } from "react";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: MovieSearchResult | MovieWithRating;
}

function MovieCardComponent({ movie }: MovieCardProps) {
  const { isFavourite, addFavourite, removeFavourite, getMovieRating } =
    useFavourites();
  const [isHovering, setIsHovering] = useState(false);
  const isFav = isFavourite(movie.imdbID);
  const rating =
    "rating" in movie ? movie.rating : getMovieRating(movie.imdbID);
  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.Title)}`;

  const handleFavouriteClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      removeFavourite(movie.imdbID);
    } else {
      addFavourite(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.imdbID}`}>
      <Card
        className="py-0 overflow-hidden transition-all hover:shadow-lg relative group gap-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.Title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <button
            onClick={handleFavouriteClick}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${isFav ? "bg-yellow-400 text-black" : "bg-black/50 text-white opacity-0 group-hover:opacity-100"}`}
          >
            <Star className={`h-5 w-5 ${isFav ? "fill-current" : ""}`} />
          </button>
          {rating && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating}</span>
            </div>
          )}
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

export const MovieCard = memo(MovieCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.movie.imdbID === nextProps.movie.imdbID &&
    ("rating" in prevProps.movie ? prevProps.movie.rating : undefined) ===
      ("rating" in nextProps.movie ? nextProps.movie.rating : undefined)
  );
});
