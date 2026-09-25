import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import {
  NETFLIX_LOGO_SVG,
  PROFILE_URL,
  SUPPORTED_LANGUAGES,
} from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const isSearchBarEnabled = useSelector((store) => store.gpt.showGptSearch);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleNetflixHomeLogo = () => {
    user ? navigate("/browse") : navigate("/");
  };

  const handleGptSearch = (e) => {
    e.preventDefault();
    dispatch(toggleGptSearchView());
    navigate("/browse"); // kind of jack
  };

  const handLanguageChange = (e) => {
    e.preventDefault();
    dispatch(changeLanguage(e.target.value));
  };

  const handBrowsMainMovies = (e) => {
    e.preventDefault();
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          }),
        );
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  return (
    <div className='absolute w-screen px-8 py-2 flex justify-between z-20'>
      <div onClick={handleNetflixHomeLogo}>
        <img
          src={NETFLIX_LOGO_SVG}
          alt='netflix-logo'
          className='w-40 p-5 cursor-pointer'
        />
      </div>
      {/* {user && !isSearchBarEnabled && ( */}
      <div className='flex items-center gap-4 p-2'>
        {user && !isSearchBarEnabled && (
          <>
            <select
              className='p-2 bg-gray-500 text-white m-2'
              onChange={handLanguageChange}
              name='lang'
              id=''>
              {SUPPORTED_LANGUAGES.map((lang) => {
                return (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                );
              })}
            </select>
            <button
              className='cursor-pointer bg-fuchsia-700 p-2 rounded'
              onClick={handleGptSearch}>
              <span className='font-bold p-2'>GPT Search</span>
            </button>
            <img
              src={PROFILE_URL}
              alt='netflix-profile-image'
              className='w-12 h-12 object-cover rounded-full cursor-pointer'
            />
          </>
        )}

        {/* show only when the search is enabled and loggedin user */}
        {isSearchBarEnabled && user && (
          <button
            className='cursor-pointer bg-gray-700 p-2 rounded'
            onClick={handBrowsMainMovies}>
            <span className='font-bold p-2'>Brows</span>
          </button>
        )}

        <button
          className='cursor-pointer bg-red-700 p-2 rounded'
          onClick={handleSignOut}>
          <span className='font-bold p-2'>Sign Out</span>
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default Header;
