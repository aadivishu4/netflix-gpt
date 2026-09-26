import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const VIDEO_URL = TMDB_BASE_URL + movieId + "/videos";

        const response = await fetch(VIDEO_URL, TMDB_API_OPTIONS);

        const json = await response.json();

        const trailers = json.results?.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        const trailer = trailers?.[0] || json.results?.[0];

        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    if (movieId) {
      getMovieVideos();
    }
  }, [movieId, dispatch]);

  if (!trailerVideo?.key) {
    return null;
  }

  return (
    <div className='relative aspect-video w-screen overflow-hidden bg-black'>
      <iframe
        className='
          pointer-events-none
          absolute
          left-0
          top-[-10%]
          h-[120%]
          w-full
          border-0
        '
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo.key}&rel=0&playsinline=1`}
        title='Movie trailer'
        allow='autoplay; encrypted-media'
      />
    </div>
  );
};

export default VideoBackground;
