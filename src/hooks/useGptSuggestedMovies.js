import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { TMDB_API_OPTIONS } from "../utils/constant";

import { addGptSuggestedMovies, setGptLoading } from "../utils/gptSlice";

const useGptSuggestedMovies = (suggestedMoviesList) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // GPT hasn't provided movie names yet.
    if (!suggestedMoviesList?.length) return;

    const getMovies = async (movieName) => {
      try {
        const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          movieName,
        )}&include_adult=false&page=1`;

        const response = await fetch(searchMoviesUrl, TMDB_API_OPTIONS);

        if (!response.ok) {
          throw new Error(`TMDB search failed: ${response.status}`);
        }

        const json = await response.json();

        console.log(`TMDB result for ${movieName}:`, json);

        // Don't display movies without poster images
        const moviesWithPosters =
          json.results?.filter((movie) => movie.poster_path) || [];

        return {
          searchTerm: movieName,
          movies: moviesWithPosters,
        };
      } catch (error) {
        console.error(`Movie search failed for ${movieName}:`, error);

        return {
          searchTerm: movieName,
          movies: [],
        };
      }
    };

    const fetchSuggestedMovies = async () => {
      try {
        // Search all 5 GPT suggestions in parallel
        const moviesResponse = await Promise.all(
          suggestedMoviesList.map((movieName) => getMovies(movieName)),
        );

        // Remove groups where TMDB found nothing
        const validSuggestions = moviesResponse.filter(
          (suggestion) => suggestion.movies.length > 0,
        );

        console.log("Movies being stored in Redux:", validSuggestions);

        dispatch(addGptSuggestedMovies(validSuggestions));
      } catch (error) {
        console.error("Error fetching suggested movies:", error);
      } finally {
        // OpenAI + TMDB process is now complete
        dispatch(setGptLoading(false));
      }
    };

    fetchSuggestedMovies();
  }, [suggestedMoviesList, dispatch]);
};

export default useGptSuggestedMovies;
