import { NETFLIX_BG_IMG } from "../utils/constant";
import { useSelector } from "react-redux";
import { LANGUAGE_UTILS } from "../utils/languageConstant";

const GptSearchBar = () => {
  const lang = useSelector((store) => store.config.lang);

  return (
    <div className='relative min-h-screen'>
      {/* Background */}
      <img
        src={NETFLIX_BG_IMG}
        alt='Netflix background'
        className='absolute inset-0 w-full h-full object-cover pointer-events-none'
      />

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/60 pointer-events-none' />

      {/* Search Container */}
      <div className='relative z-10 flex justify-center pt-[10%]'>
        <form
          className='flex w-11/12 md:w-2/3 lg:w-1/2'
          onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            placeholder={LANGUAGE_UTILS[lang]?.gptSearchPlaceholder}
            className='
              flex-1
              min-w-0
              px-5
              py-4
              bg-white
              text-black
              placeholder:text-gray-500
              outline-none
              rounded-l-md
            '
          />

          <button
            type='submit'
            className='
              px-8
              py-4
              bg-red-600
              text-white
              font-semibold
              rounded-r-md
              hover:bg-red-700
              transition
              whitespace-nowrap
            '>
            {LANGUAGE_UTILS[lang]?.search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
