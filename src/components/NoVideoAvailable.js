const NoVideoAvailable = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-black px-6 text-white'>
      <div className='max-w-lg text-center'>
        {/* Netflix-style icon */}
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-600 bg-red-600/10'>
          <svg
            className='h-9 w-9 text-red-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='1.8'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5 19.5 8.25v7.5L15.75 13.5m-9 3.75h6.75A2.25 2.25 0 0 0 15.75 15V9A2.25 2.25 0 0 0 13.5 6.75H6.75A2.25 2.25 0 0 0 4.5 9v6A2.25 2.25 0 0 0 6.75 17.25Z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='m5 5 14 14' />
          </svg>
        </div>

        <h1 className='mb-3 text-2xl font-bold md:text-3xl'>
          Video Not Available
        </h1>

        <p className='text-sm leading-6 text-gray-400 md:text-base'>
          Sorry, there is no trailer or preview available for this movie.
        </p>

        <button
          onClick={() => window.history.back()}
          className='mt-8 rounded bg-white px-7 py-2.5 font-semibold text-black transition hover:bg-gray-300'>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoVideoAvailable;
