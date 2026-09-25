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

  // 1. Request is still running
  if (loading) {
    return (
      <div className='h-screen bg-black text-white'>
        <Header />
        <NetflixLoader />
      </div>
    );
  }

  // 2. Request finished but no video exists
  if (!trailerKey) {
    return (
      <div className='h-screen bg-black text-white'>
        <Header />
        <NoVideoAvailable />
      </div>
    );
  }

  // 3. Video exists
  return (
    <div className='h-screen bg-black overflow-hidden'>
      <Header />

      <iframe
        className='w-full h-full'
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title='Movie Trailer'
        allow='
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share
        '
        allowFullScreen
      />
    </div>
  );
};

export default VideoPreview;
