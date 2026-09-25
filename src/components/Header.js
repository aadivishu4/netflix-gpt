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

  const handleGptSearch = () => {
    console.log("gpt search clicked");
    dispatch(toggleGptSearchView());
  };

  const handLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
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
      // this will unsubscribed when component unmounts
      unsubscribe();
    };
  }, [dispatch, navigate]);

  return (
    <div className='absolute w-screen px-8 py-2 z-10 flex justify-between'>
      <div onClick={handleNetflixHomeLogo}>
        <img
          src={NETFLIX_LOGO_SVG}
          alt='netflix-logo'
          className='w-40 p-5 bg-gradient-to-b from-black cursor-pointer'
        />
      </div>
      {user && (
        <div className='flex items-center gap-4 p-2'>
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
          <button
            className='cursor-pointer bg-red-700 p-2 rounded'
            onClick={handleSignOut}>
            <span className='font-bold p-2'>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
