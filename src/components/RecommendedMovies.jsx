import { useSelector } from "react-redux";
import useRecommendedMovies from "../hooks/useRecommendedMovies";
import MoviesList from "./MoviesList";

const RecommendedMovies = ({ movieId }) => {
  useRecommendedMovies(movieId);

  const recommendedMovies = useSelector(
    (store) => store.movies?.recommendedMovies,
  );

  if (!recommendedMovies?.length) return null;

  return <MoviesList title='Recommended Movies' movies={recommendedMovies} />;
};

export default RecommendedMovies;
