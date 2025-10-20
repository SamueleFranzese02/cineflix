import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getMovieDetails } from "@/lib/actions";
import { FavouriteButton } from "@/components/favourite-button";
import { RatingStars } from "@/components/rating-stars";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
    const { id } = await params;
  return (
    <Suspense fallback={<MovieDetailsSkeleton />}>
      <MovieDetails id={id} />
    </Suspense>
  );
}

async function MovieDetails({ id }: { id: string }) {
  const { movie, error } = await getMovieDetails(id);

  if (error || !movie) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">{error || "Movie not found"}</p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Link>
        </Button>
      </div>
    );
  }

  const posterUrl =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.Title)}`;

  const movieForFavourite = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back Home
        </Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md md:sticky md:top-6 md:self-start">
          <Image
            src={posterUrl || "/placeholder.svg"}
            alt={movie.Title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-2 right-2">
            <FavouriteButton movie={movieForFavourite} size="lg" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 mb-4">
            <Badge variant="outline">{movie.Year}</Badge>
            <Badge variant="outline">{movie.Rated}</Badge>
            <Badge variant="outline">{movie.Runtime}</Badge>
            {movie.imdbRating !== "N/A" && (
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{movie.imdbRating}/10</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Your Rating</h3>
            <RatingStars movie={movieForFavourite} size="lg" />
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-muted-foreground">{movie.Plot}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(", ").map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Director</h3>
                <p className="text-muted-foreground">{movie.Director}</p>
              </div>

              <div>
                <h3 className="font-medium">Actors</h3>
                <p className="text-muted-foreground">{movie.Actors}</p>
              </div>

              {movie.Writer !== "N/A" && (
                <div>
                  <h3 className="font-medium">Writer</h3>
                  <p className="text-muted-foreground">{movie.Writer}</p>
                </div>
              )}

              {movie.Awards !== "N/A" && (
                <div>
                  <h3 className="font-medium">Awards</h3>
                  <p className="text-muted-foreground">{movie.Awards}</p>
                </div>
              )}

              {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                <div>
                  <h3 className="font-medium">Box Office</h3>
                  <p className="text-muted-foreground">{movie.BoxOffice}</p>
                </div>
              )}

              {movie.Production && movie.Production !== "N/A" && (
                <div>
                  <h3 className="font-medium">Production</h3>
                  <p className="text-muted-foreground">{movie.Production}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Ratings</h3>
              <div className="space-y-2">
                {movie.Ratings.map((rating) => (
                  <div key={rating.Source} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {rating.Source}
                    </span>
                    <span className="font-medium">{rating.Value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-4/5" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
