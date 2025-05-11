"use client";

import { useFavourites } from "@/contexts/favourites-context";
import { MovieSearchResult } from "@/types/movie";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  movie: MovieSearchResult;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
}

export function RatingStars({
  movie,
  size = "md",
  onChange,
}: RatingStarsProps) {
  const { rateMovie, getMovieRating } = useFavourites();
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [hoverRating, setHoverRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    setRating(getMovieRating(movie.imdbID));
  }, [movie.imdbID, getMovieRating]);

  const handleRating = (newRating: number) => {
    const finalRating = rating === newRating ? undefined : newRating;
    setRating(finalRating);

    if (finalRating) {
      rateMovie(movie, finalRating);
      if (onChange) {
        onChange(finalRating);
      }
    }
  };

  const starSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size];

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      <div className="flex">
        {stars.map((value) => {
          const displayRating =
            hoverRating !== undefined ? hoverRating : rating;
          const isFilled =
            displayRating !== undefined && value <= displayRating;

          return (
            <button
              key={value}
              type="button"
              className="text-yellow-400 focus:outline-nome mr-1"
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(undefined)}
              onClick={() => handleRating(value)}
            >
              <Star
                className={`${starSize} ${isFilled ? "fill-current" : ""}`}
              />
            </button>
          );
        })}
      </div>
      {rating && <span className="ml-2 text-sm font-medium">{rating}</span>}
    </div>
  );
}
