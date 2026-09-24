import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        TMDB_BASE_URL + "now_playing?page=1",
        TMDB_API_OPTIONS,
      );
      const json = await data?.json();
      const movies = json?.results;

      if (movies.length > 0) {
        dispatch(addNowPlayingMovies(movies));
      } else {
        console.log("movies data not found ====> ", movies);
      }
    } catch (error) {
      console.log("TMDB error ===>", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
