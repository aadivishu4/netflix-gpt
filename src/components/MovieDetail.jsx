import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TMDB_BASE_URL, TMDB_API_OPTIONS } from "../utils/constant";
import Header from "./Header";
import NetflixLoader from "./NetflixLoader";

const MovieDetail = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetail = async () => {
      if (!movieId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setMovie(null);
        setError(null);

        const movieDetailUrl = TMDB_BASE_URL + movieId;
        const response = await fetch(movieDetailUrl, TMDB_API_OPTIONS);

        if (!response.ok) {
          throw new Error(`Failed to fetch movie. Status: ${response.status}`);
        }

        const movieDetail = await response.json();

        /*
         * TEMPORARY:
         *
         * Keep this only if you want to TEST the loader.
         *
         * TMDB may respond very quickly, so without this delay
         * you may barely see the loader.
         *
         * REMOVE this after testing.
         */
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        setMovie(movieDetail);
      } catch (error) {
        console.error("Error fetching movie details:", error);

        setError(error.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetail();
  }, [movieId]);
  const handlePreview = () => {
    navigate(`/preview/${movieId}`);
  };

  if (loading) {
    return (
      <div className='flex min-h-screen w-full items-center justify-center bg-black'>
        <NetflixLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <Header />

        <div className='flex min-h-screen flex-col items-center justify-center gap-4'>
          <h2 className='text-2xl font-bold'>Something went wrong</h2>

          <p className='text-gray-400'>{error}</p>

          <button
            onClick={() => navigate("/browse")}
            className='cursor-pointer rounded-md bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700'>
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-black text-white'>
        <Header />

        <div className='flex min-h-screen items-center justify-center'>
          <p className='text-xl text-gray-400'>Movie not found</p>
        </div>
      </div>
    );
  }

  const {
    title,
    tagline,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
    status,
    spoken_languages,
    production_countries,
    budget,
    revenue,
  } = movie;

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : "";

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "";

  const formatMoney = (amount) => {
    if (!amount) {
      return "N/A";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  };
  return (
    <div className='relative min-h-screen bg-black text-white'>
      {/* Header */}
      <Header />

      <div className='absolute inset-0'>
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=''
            className='h-full w-full object-cover'
          />
        )}

        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/70' />

        {/* Left → Right Gradient */}
        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30' />

        {/* Bottom Gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40' />
      </div>

      <main className='relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-10'>
        <div className='grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[300px_1fr]'>
          <div className='flex justify-center lg:justify-start'>
            <div className='w-full max-w-[300px]'>
              {/* Poster */}

              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${title} poster`}
                  className='w-full rounded-lg object-cover shadow-2xl shadow-black/80'
                />
              ) : (
                <div className='flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-gray-900 text-gray-500'>
                  No Poster
                </div>
              )}

              {/* Watch Button */}

              <button
                onClick={handlePreview}
                className='mt-5 w-full cursor-pointer rounded-md bg-white py-3.5 text-lg font-bold text-black transition-all duration-300 hover:bg-gray-300'>
                ▶ Watch
              </button>
            </div>
          </div>
          <div className='max-w-3xl'>
            <div className='mb-4 flex items-center gap-3'>
              {status && (
                <span className='rounded bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider'>
                  {status}
                </span>
              )}

              <span className='text-sm text-gray-400'>
                {release_date?.split("-")[0] || "N/A"}
              </span>
            </div>

            <h1 className='mb-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl'>
              {title}
            </h1>

            {tagline && (
              <p className='mb-6 text-lg italic text-gray-400'>"{tagline}"</p>
            )}

            <div className='mb-6 flex flex-wrap items-center gap-4 text-sm sm:text-base'>
              {/* Match */}

              <span className='font-semibold text-green-500'>
                {Math.round((vote_average || 0) * 10)}% Match
              </span>

              {/* Year */}

              <span>{release_date?.split("-")[0] || "N/A"}</span>

              {/* Runtime */}

              <span>{runtime ? `${runtime} min` : "N/A"}</span>

              {/* HD */}

              <span className='rounded border border-gray-500 px-2 py-0.5 text-xs'>
                HD
              </span>

              {/* Rating */}

              <span className='flex items-center gap-1'>
                <span className='text-yellow-400'>★</span>

                {vote_average?.toFixed(1) || "0.0"}
              </span>

              {/* Votes */}

              <span className='text-gray-400'>{vote_count || 0} votes</span>
            </div>

            {genres?.length > 0 && (
              <div className='mb-7 flex flex-wrap gap-2'>
                {genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='rounded-full border border-gray-600 bg-black/30 px-4 py-1.5 text-sm text-gray-200'>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className='mb-8 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg'>
              {overview || "No overview available."}
            </p>

            <div className='grid grid-cols-1 gap-x-10 gap-y-5 border-t border-gray-700/70 pt-6 sm:grid-cols-2'>
              <MovieInfo
                label='Language'
                value={spoken_languages?.[0]?.english_name || "N/A"}
              />

              <MovieInfo
                label='Country'
                value={
                  production_countries
                    ?.map((country) => country.name)
                    .join(", ") || "N/A"
                }
              />

              <MovieInfo label='Budget' value={formatMoney(budget)} />

              <MovieInfo label='Revenue' value={formatMoney(revenue)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MovieInfo = ({ label, value }) => {
  return (
    <div>
      <span className='text-sm text-gray-500'>{label}</span>

      <p className='mt-1 text-sm font-medium text-gray-200'>{value || "N/A"}</p>
    </div>
  );
};

export default MovieDetail;
