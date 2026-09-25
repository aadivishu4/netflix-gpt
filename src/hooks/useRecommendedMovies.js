import { useDispatch } from "react-redux";
import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addRecommendedMovies } from "../utils/moviesSlice";

const useRecommendedMovies = (movieId) => {
  const dispatch = useDispatch();

  const getRecommendedMovies = async (movieId) => {
    const recommededMoviesUrl = TMDB_BASE_URL + movieId + "/recommendations";
    const data = await fetch(recommededMoviesUrl, TMDB_API_OPTIONS);
    const json = await data.json();
    const recommendeMovies = json?.results;

    console.log("check json ===> ", json);
    if (recommendeMovies.length > 0) {
      dispatch(addRecommendedMovies(recommendeMovies));
    } else {
      console.log("Recommended movies not found", recommendeMovies);
    }
  };

  useEffect(() => {
    getRecommendedMovies(movieId);
  }, []);
};

export default useRecommendedMovies;
