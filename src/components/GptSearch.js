import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMoviesSuggestion";

const GptSearch = () => {
  return (
    <div className='bg-black min-h-screen'>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
