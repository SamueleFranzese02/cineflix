"use client";

import { useFavourites } from "@/contexts/favourites-context";
import { MovieSearchResult } from "@/types/movie";
import { MouseEvent } from "react";
import { Star } from "lucide-react";

interface FavouriteButtonProps {
  movie: MovieSearchResult;
  size?: "default" | "lg";
}

export function FavouriteButton({
  movie,
  size = "default",
}: FavouriteButtonProps) {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const isFav = isFavourite(movie.imdbID);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isFav) {
      removeFavourite(movie.imdbID);
    } else {
      addFavourite(movie);
    }
  };

  const sizeClasses = size === "lg" ? "p-2.5" : "p-1.5";
  const iconSize = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <button
      onClick={handleClick}
      className={`rounded-full transition-all ${sizeClasses} ${isFav ? "bg-yellow-400 text-black" : "bg-black/50 text-white hover:bg-black/70"}`}
    >
      <Star className={`${iconSize} ${isFav ? "fill-current" : ""}`} />
    </button>
  );
}
