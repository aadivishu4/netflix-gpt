import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NETFLIX_BG_IMG } from "../utils/constant";
import { LANGUAGE_UTILS } from "../utils/languageConstant";

import openai from "../utils/openAI";

import useGptSuggestedMovies from "../hooks/useGptSuggestedMovies";

import { setGptLoading } from "../utils/gptSlice";

import NetflixLoader from "./NetflixLoader";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const searchText = useRef(null);

  const [suggestedMovies, setSuggestedMovies] = useState([]);

  const lang = useSelector((store) => store.config.lang);

  // Once GPT gives us movie names,
  // this hook searches them in TMDB.
  useGptSuggestedMovies(suggestedMovies);

  const handleGptSearchClick = async (e) => {
    e.preventDefault();

    const query = searchText.current?.value?.trim();

    if (!query) {
      console.log({
        success: false,
        output: "Please enter a movie request.",
      });

      return;
    }

    // ==========================================
    // START LOADER
    // ==========================================

    dispatch(setGptLoading(true));

    try {
      const response = await openai.responses.create({
        model: "gpt-6-luna",

        instructions: `
            You are a movie recommendation assistant.

            Rules:
            - Recommend exactly 5 movies relevant to the user's request.
            - Set success to true only when 5 relevant movies can be recommended.
            - When success is true, output must contain exactly 5 movie names separated by commas.
            - When the request is unrelated to movies or cannot be fulfilled, set success to false.
            - When success is false, output must contain a very short user-friendly reason.
            - Do not include explanations, markdown, numbering, or additional information.
          `,

        input: query,

        text: {
          format: {
            type: "json_schema",
            name: "movie_recommendation",
            strict: true,

            schema: {
              type: "object",

              properties: {
                success: {
                  type: "boolean",
                },

                output: {
                  type: "string",
                },
              },

              required: ["success", "output"],

              additionalProperties: false,
            },
          },
        },
      });

      const result = JSON.parse(response.output_text);

      console.log("GPT result ===>", result);

      // GPT couldn't satisfy the request
      if (!result.success) {
        console.log("GPT Error ===>", result.output);

        dispatch(setGptLoading(false));

        return;
      }

      const movieNames = result.output
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      console.log("GPT Movies ===>", movieNames);

      // This triggers useGptSuggestedMovies()
      setSuggestedMovies(movieNames);

      // IMPORTANT:
      // Do NOT stop loader here.
      //
      // TMDB requests still need to run.
      //
      // useGptSuggestedMovies will stop
      // the loader after TMDB finishes.
    } catch (error) {
      console.error("GPT API Error ===>", error);

      // OpenAI failed, so TMDB will
      // never run. Stop loader here.
      dispatch(setGptLoading(false));
    }
  };

  return (
    <div className='relative min-h-screen'>
      {/* Background */}

      <img
        src={NETFLIX_BG_IMG}
        alt='Netflix background'
        className='
          absolute
          inset-0
          h-full
          w-full
          object-cover
          pointer-events-none
        '
      />

      {/* Dark overlay */}

      <div
        className='
          absolute
          inset-0
          bg-black/60
          pointer-events-none
        '
      />

      {/* Content */}

      <div
        className='
          relative
          z-10
          pt-[10%]
        '>
        {/* Search */}

        <div className='flex justify-center'>
          <form
            className='
              flex
              w-11/12
              md:w-2/3
              lg:w-1/2
            '
            onSubmit={handleGptSearchClick}>
            <input
              ref={searchText}
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

        {/* Netflix Loader */}

        <NetflixLoader />
      </div>
    </div>
  );
};

export default GptSearchBar;
