import { useEffect } from "react";
import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const getMovieVideos = async () => {
    const VIDEO_URL = TMDB_BASE_URL + movieId + "/videos";
    const data = await fetch(VIDEO_URL, TMDB_API_OPTIONS);
    const json = await data.json();

    const filteredTrailer = json.results.filter((vd) => vd.type === "Trailer");
    const trailer = filteredTrailer.length
      ? filteredTrailer?.[0]
      : json.results?.[0];

    dispatch(addTrailerVideo(trailer));
    // console.log("trailer", trailer);
  };

  useEffect(() => {
    getMovieVideos();
  }, []);

  return (
    <div className='w-screen'>
      <iframe
        className='w-screen aspect-video'
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'></iframe>
    </div>
  );
};

export default VideoBackground;
