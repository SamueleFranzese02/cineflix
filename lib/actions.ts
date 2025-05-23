import type { Movie, MovieSearchResult } from "@/types/movie";

export async function searchMovies(query = "harry potter") {
  try {
    if (!query.trim()) {
      return { error: "Please enter a search term", movies: [] };
    }
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`,
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

export async function getMovieDetails(imdbID: string) {
  try {
    if (!imdbID) {
      return { error: "Movie ID is required", movie: null };
    }

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}&plot=full`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      return { error: data.Error || "Movie not found", movie: null };
    }

    const movie: Movie = {
      imdbID: data.imdbID,
      Title: data.Title,
      Year: data.Year,
      Rated: data.Rated,
      Released: data.Released,
      Runtime: data.Runtime,
      Genre: data.Genre,
      Director: data.Director,
      Writer: data.Writer,
      Actors: data.Actors,
      Plot: data.Plot,
      Language: data.Language,
      Country: data.Country,
      Awards: data.Awards,
      Poster: data.Poster,
      Ratings: data.Ratings || [],
      Metascore: data.Metascore,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
      Type: data.Type,
      DVD: data.DVD,
      BoxOffice: data.BoxOffice,
      Production: data.Production,
      Website: data.Website,
    };

    return { movie, error: null };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { error: "Failed to fetch movie details", movie: null };
  }
}
