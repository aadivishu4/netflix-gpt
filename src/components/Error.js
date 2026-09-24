import { useNavigate, useRouteError } from "react-router-dom";
import Header from "./Header";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-40'
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_24727a44-26d0-4be3-9d1d-06806d62f16e_large.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black' />

      {/* Netflix Logo */}
      {/* <div className='absolute top-0 left-0 z-20 px-8 py-6 md:px-14'>
        <h1
          onClick={() => navigate("/")}
          className='text-red-600 text-3xl md:text-5xl font-black tracking-tight cursor-pointer'>
          NETFLIX
        </h1>
      </div> */}
      <Header />

      {/* Error Content */}
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6'>
        <h1 className='text-7xl md:text-9xl font-black text-red-600 drop-shadow-lg'>
          404
        </h1>

        <h2 className='mt-4 text-2xl md:text-4xl font-bold'>Lost your way?</h2>

        <p className='mt-4 max-w-xl text-gray-300 text-base md:text-lg'>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>

        {error?.statusText && (
          <p className='mt-3 text-sm text-gray-500'>{error.statusText}</p>
        )}

        <button
          onClick={() => navigate("/")}
          className='mt-8 bg-white text-black font-semibold px-7 py-3 rounded hover:bg-gray-300 transition duration-200'>
          Netflix Home
        </button>

        <div className='mt-10 border-l-2 border-red-600 pl-4'>
          <span className='text-gray-400'>Error Code </span>
          <span className='font-semibold'>{error?.status || "NSES-404"}</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
