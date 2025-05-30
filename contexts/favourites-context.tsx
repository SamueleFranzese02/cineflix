"use client";

import { MovieSearchResult, MovieWithRating } from "@/types/movie";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FavouritesContextType = {
  favourites: MovieWithRating[];
  addFavourite: (movie: MovieSearchResult) => void;
  removeFavourite: (id: string) => void;
  isFavourite: (id: string) => boolean;
  rateMovie: (movie: MovieSearchResult, rating: number) => void;
  getMovieRating: (id: string) => number | undefined;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<MovieWithRating[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("cineflix-favourites");
    if (storedFavourites) {
      try {
        setFavourites(JSON.parse(storedFavourites));
      } catch (error) {
        console.error("Error parsing favourites from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cineflix-favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = useCallback((movie: MovieSearchResult) => {
    setFavourites((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;
      return [...prev, movie];
    });
  }, []);

  const removeFavourite = useCallback((id: string) => {
    setFavourites((prev) => prev.filter((movie) => movie.imdbID !== id));
  }, []);

  const isFavourite = useCallback(
    (id: string) => {
      return favourites.some((movie) => movie.imdbID === id);
    },
    [favourites],
  );

  const rateMovie = useCallback((movie: MovieSearchResult, rating: number) => {
    setFavourites((prev) => {
      const existingIndex = prev.findIndex((m) => m.imdbID === movie.imdbID);

      if (existingIndex >= 0) {
        const newFavourites = [...prev];
        newFavourites[existingIndex] = {
          ...newFavourites[existingIndex],
          rating,
        };
        return newFavourites;
      } else {
        return [...prev, { ...movie, rating }];
      }
    });
  }, []);

  const getMovieRating = useCallback(
    (id: string) => {
      const movie = favourites.find((m) => m.imdbID === id);
      return movie?.rating;
    },
    [favourites],
  );

  const contextValue = useMemo(
    () => ({
      favourites,
      addFavourite,
      removeFavourite,
      isFavourite,
      rateMovie,
      getMovieRating,
    }),
    [
      favourites,
      addFavourite,
      removeFavourite,
      isFavourite,
      rateMovie,
      getMovieRating,
    ],
  );

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }

  return context;
}
