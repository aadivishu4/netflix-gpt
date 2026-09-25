import { useDispatch } from "react-redux";
import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { addUpcommingMovies } from "../utils/moviesSlice";

const useUpcommingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovieUrl = TMDB_BASE_URL + "upcoming?page=1";
  const getUpcommingMovies = async () => {
    const data = await fetch(upcomingMovieUrl, TMDB_API_OPTIONS);
    const json = await data.json();
    const upcommingMovies = json.results;

    if (upcommingMovies.length > 0) {
      dispatch(addUpcommingMovies(upcommingMovies));
    } else {
      console.log("No data found for upcomming movies", upcommingMovies);
    }
  };

  useEffect(() => {
    getUpcommingMovies();
  }, []);
};

export default useUpcommingMovies;
