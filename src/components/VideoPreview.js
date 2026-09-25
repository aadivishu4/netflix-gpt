import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { TMDB_API_OPTIONS, TMDB_BASE_URL } from "../utils/constant";

const VideoPreview = () => {
  const params = useParams();
  const { id: movieId } = params;
  console.log("vide preview component check", movieId);

  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    getMovieTrailer(movieId);
  }, [movieId]);

  const getMovieTrailer = async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL + movieId}/videos`,
      TMDB_API_OPTIONS,
    );

    const json = await response.json();
    console.log("check preview json", json);
    debugger;

    const trailers = json.results?.filter((video) => video.type === "Trailer");

    const trailer = trailers?.[0] || json.results?.[0];

    setTrailerKey(trailer?.key);
  };

  if (!trailerKey) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <Header />

        <div className='flex min-h-screen items-center justify-center'>
          Loading trailer...
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen bg-black overflow-hidden'>
      <Header />

      <div className='h-full pt-20'>
        <iframe
          className='w-full h-full'
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title='Movie Trailer'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoPreview;
