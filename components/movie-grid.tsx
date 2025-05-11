"use client";

import { searchMovies } from "@/lib/actions";
import MovieCard from "@/components/movie-card";
import { MovieSearchResult } from "@/types/movie";
import { useEffect, useState } from "react";

interface MovieGridProps {
  initialQuery?: string;
}

export default function MovieGrid({
  initialQuery = "harry potter",
}: MovieGridProps) {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const result = await searchMovies(initialQuery);

      if (result.error) {
        setError(result.error);
      } else {
        setMovies(result.movies);
        setError(null);
      }

      setLoading(false);
    }

    fetchMovies();
  }, [initialQuery]);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Movies results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
