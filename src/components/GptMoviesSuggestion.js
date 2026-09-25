import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMovieSuggestions = () => {
  const gptSuggestedMovies = useSelector(
    (store) => store.gpt.gptSuggestedMovies,
  );

  if (!gptSuggestedMovies?.length) {
    return null;
  }

  return (
    <div className='bg-black text-white px-6 pb-10'>
      {gptSuggestedMovies.map((suggestion) => (
        <MoviesList
          key={suggestion.searchTerm}
          title={suggestion.searchTerm}
          movies={suggestion.movies}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
