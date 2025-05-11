import type { MovieSearchResult } from "@/types/movie";

export async function searchMovies(query = "harry potter") {
  try {
    if (!query.trim()) {
      return { error: "Please enter a search term", movies: [] };
    }
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${query}`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.Response === "False") {
      return { error: data.Error || "No movies found", movies: [] };
    }

    const movies: MovieSearchResult[] = data.Search.map((item: any) => ({
      imdbID: item.imdbID,
      Title: item.Title,
      Year: item.Year,
      Poster: item.Poster,
    }));

    return { movies, error: null };
  } catch (error) {
    console.error("Error searching movies:", error);
    return { error: "Failed to fetch movies", movies: [] };
  }
}
