import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { TMDB_BASE_URL, TMDB_API_OPTIONS } from "../utils/constant";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRateMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const topRateUrl = TMDB_BASE_URL + "top_rated?page=1";
    const data = await fetch(topRateUrl, TMDB_API_OPTIONS);
    const json = await data.json();

    const topRatedMovies = json.results;

    if (topRatedMovies.length > 0) {
      dispatch(addTopRatedMovies(topRatedMovies));
    } else {
      console.log("error while fetching top rated movies", topRatedMovies);
    }
  };
  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRateMovies;
