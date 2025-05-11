"use client";

import { searchMovies } from "@/lib/actions";
import { MovieCard } from "@/components/movie-card";
import { MovieSearchResult } from "@/types/movie";
import { useCallback, useEffect, useMemo, useState } from "react";

interface MovieGridProps {
  initialQuery?: string;
}

export function MovieGrid({ initialQuery = "harry potter" }: MovieGridProps) {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (query: string) => {
    setLoading(true);
    const result = await searchMovies(query);

    if (result.error) {
      setError(result.error);
    } else {
      setMovies(result.movies);
      setError(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies(initialQuery);
  }, [initialQuery, fetchMovies]);

  const content = useMemo(() => {
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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Movies results</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    );
  }, [loading, error, movies]);

  return content;
}
