import { TMDB_IMG_CDN_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieId, posterPath }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;

  const handleMovieDetail = (value) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      onClick={handleMovieDetail}
      className='w-48 min-w-48 flex-shrink-0 relative z-0
      origin-center transform-gpu transition-transform duration-300 ease-out
      hover:scale-110 hover:z-50 cursor-pointer'>
      <img
        className='block w-full rounded-md object-cover'
        src={TMDB_IMG_CDN_URL + posterPath}
        alt='Movie Card'
      />
    </div>
  );
};

export default MovieCard;
