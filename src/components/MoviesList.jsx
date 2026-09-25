import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <div className='px-2 py-4'>
      <h1 className='text-white text-2xl md:text-3xl font-bold mb-3'>
        {title}
      </h1>

      <div className='flex gap-3 overflow-x-auto overflow-y-hidden no-scrollbar py-6'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
