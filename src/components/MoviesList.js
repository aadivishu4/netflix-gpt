import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies?.length) return null;

  return (
    <div className='px-2 py-2'>
      <h1 className='text-white text-2xl md:text-3xl font-bold mb-3'>
        {title}
      </h1>

      <div className='flex gap-3 overflow-x-auto no-scrollbar'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
