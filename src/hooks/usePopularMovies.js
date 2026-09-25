import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        TMDB_BASE_URL + "popular?page=1",
        TMDB_API_OPTIONS,
      );
      const json = await data?.json();
      const movies = json?.results;

      if (movies.length > 0) {
        dispatch(addPopularMovies(movies));
      } else {
        console.log("popular movies data not found ====> ", movies);
      }
    } catch (error) {
      console.log("TMDB error ===>", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
