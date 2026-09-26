import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "./Header";
import NetflixLoader from "./NetflixLoader";
import NoVideoAvailable from "./NoVideoAvailable";

import { TMDB_API_OPTIONS } from "../utils/constant";

const VideoPreview = () => {
  const { id: movieId } = useParams();

  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const getMovieTrailer = async () => {
      try {
        setLoading(true);
        setTrailerKey(null);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          TMDB_API_OPTIONS,
        );

        if (!response.ok) {
          throw new Error(`TMDB request failed: ${response.status}`);
        }

        const json = await response.json();
        const youtubeVideos =
          json.results?.filter((video) => video.site === "YouTube") || [];

        const trailer = youtubeVideos.find((video) => video.type === "Trailer");

        const teaser = youtubeVideos.find((video) => video.type === "Teaser");

        const selectedVideo = trailer || teaser || youtubeVideos[0];

        setTrailerKey(selectedVideo?.key ?? null);
      } catch (error) {
        console.error("Error fetching trailer:", error);

        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    getMovieTrailer();
  }, [movieId]);

  if (loading) {
    return (
      <div className='h-screen bg-black text-white'>
        <Header />
        <NetflixLoader />
      </div>
    );
  }

  if (!trailerKey) {
    return (
      <div className='h-screen bg-black text-white'>
        <Header />
        <NoVideoAvailable />
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className='fixed inset-0 h-screen w-screen overflow-hidden bg-black'>
        <iframe
          className='
          absolute
          left-1/2
          top-1/2
          h-[130vh]
          w-[130vw]
          -translate-x-1/2
          -translate-y-1/2
          border-0
        '
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&loop=1&playlist=${trailerKey}&rel=0&playsinline=1&disablekb=0`}
          title='Movie trailer'
          allow='autoplay; encrypted-media; picture-in-picture'
          allowFullScreen
        />
      </div>
    </>
  );
};

export default VideoPreview;
