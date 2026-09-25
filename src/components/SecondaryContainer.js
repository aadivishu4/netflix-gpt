import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import RecommendedMovies from "./RecommendedMovies";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (!movies?.nowPlayingMovies) return null;

  const mainMovieId = movies.nowPlayingMovies[0]?.id;

  return (
    <div className='relative z-20 -mt-32 bg-black text-white'>
      <div className='px-6 md:px-12'>
        <RecommendedMovies movieId={mainMovieId} />

        <MoviesList title='Now Playing' movies={movies.nowPlayingMovies} />

        <MoviesList title='Popular Movies' movies={movies.popularMovies} />

        <MoviesList title='Top Rated' movies={movies.topRatedMovies} />

        <MoviesList title='Upcoming Movies' movies={movies.upcommingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
