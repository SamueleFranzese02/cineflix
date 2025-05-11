"use client";

import MovieCard from "@/components/movie-card";
import { RatingStars } from "@/components/rating-stars";
import { Button } from "@/components/ui/button";
import { useFavourites } from "@/contexts/favourites-context";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FavouritesPage() {
  const { favourites } = useFavourites();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Favourites</h1>

      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">
            You haven't added any favourites yet
          </p>
          <p className="text-sm text-muted-foreground">
            Click the star icon on any movie to add it to your favourites
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favourites.map((movie) => (
            <div key={movie.imdbID} className="space-y-2">
              <MovieCard movie={movie} />
              {movie.rating && (
                <div className="flex justify-center">
                  <RatingStars movie={movie} size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
