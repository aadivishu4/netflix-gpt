import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { NETFLIX_LOGO_SVG, PROFILE_URL } from "../utils/constant";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
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
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      // this will unsubscribed when component unmounts
      unsubscribe();
    };
  }, []);

  const dispatch = useDispatch();

  return (
    <div className='absolute w-screen px-8 py-2 z-10 flex justify-between'>
      <div>
        <img
          src={NETFLIX_LOGO_SVG}
          alt='netflix-logo'
          className='w-40 p-5 bg-gradient-to-b from-black cursor-pointer'
        />
      </div>
      {user && (
        <div className='flex items-center gap-4 p-2'>
          <img
            src={PROFILE_URL}
            alt='netflix-profile-image'
            className='w-12 h-12 object-cover rounded-full cursor-pointer'
          />
          <button className='cursor-pointer' onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
