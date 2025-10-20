import { searchMovies } from "@/lib/actions";
import { MovieCard } from "@/components/movie-card";
import { Skeleton } from "./ui/skeleton";

interface MovieGridProps {
  initialQuery: string;
}

export async function MovieGrid({ initialQuery }: MovieGridProps) {
  const { movies, error } = await searchMovies(initialQuery);

  if (error) {
    return <p>{error}</p>;
  }

  if (movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Movies results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export function MovieSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function MovieGridSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
