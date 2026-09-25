import { TMDB_IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className='w-48 min-w-48 flex-shrink-0'>
      <img
        className='w-full rounded-md object-cover'
        src={TMDB_IMG_CDN_URL + posterPath}
        alt='Movie Card'
      />
    </div>
  );
};

export default MovieCard;
