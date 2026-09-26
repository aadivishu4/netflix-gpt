import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import {
  NETFLIX_LOGO_SVG,
  PROFILE_URL,
  SUPPORTED_LANGUAGES,
} from "../utils/constant";
import { toggleGptSearchView, setGptLoading } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const isSearchBarEnabled = useSelector((store) => store.gpt.showGptSearch);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMovieDetailPage = location.pathname.startsWith("/movie/");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleNetflixHomeLogo = () => {
    if (user) {
      if (isSearchBarEnabled) {
        dispatch(toggleGptSearchView());
      }

      dispatch(setGptLoading(false));
      navigate("/browse");
    } else {
      navigate("/");
    }
  };

  const handleGptSearch = () => {
    dispatch(setGptLoading(false));
    dispatch(toggleGptSearchView());
    navigate("/browse");
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleBrowseMainMovies = () => {
    dispatch(setGptLoading(false));

    if (isSearchBarEnabled) {
      dispatch(toggleGptSearchView());
    }

    navigate("/browse");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const { uid, email, displayName } = firebaseUser;

        dispatch(
          addUser({
            uid,
            email,
            displayName,
          }),
        );
      } else {
        dispatch(removeUser());
        dispatch(setGptLoading(false));
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  return (
    <div className='absolute z-20 flex w-screen justify-between px-8 py-2'>
      <div onClick={handleNetflixHomeLogo}>
        <img
          src={NETFLIX_LOGO_SVG}
          alt='netflix-logo'
          className='w-40 cursor-pointer p-5'
        />
      </div>

      <div className='flex items-center gap-4 p-2'>
        {user && !isSearchBarEnabled && !isMovieDetailPage && (
          <>
            {/* <select
              className='m-2 bg-gray-500 p-2 text-white'
              onChange={handleLanguageChange}
              name='lang'>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select> */}

            {user && !isSearchBarEnabled && (
              <img
                src={PROFILE_URL}
                alt='netflix-profile-image'
                className='h-12 w-12 cursor-pointer rounded-full object-cover'
              />
            )}

            <button
              className='cursor-pointer rounded bg-gray-700 p-2'
              onClick={handleGptSearch}>
              <span className='p-2 font-bold'>GPT Search</span>
            </button>
          </>
        )}

        {isSearchBarEnabled && user && (
          <button
            className='cursor-pointer rounded bg-gray-700 p-2'
            onClick={handleBrowseMainMovies}>
            <span className='p-2 font-bold'>Browse</span>
          </button>
        )}

        {user && (
          <button
            className='cursor-pointer rounded bg-red-700 p-2'
            onClick={handleSignOut}>
            <span className='p-2 font-bold'>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
