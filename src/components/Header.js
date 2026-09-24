import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("error => ", error);
      });
  };

  return (
    <div className='absolute w-screen px-8 py-2 z-10 flex justify-between'>
      <div>
        <img
          src='https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAdEhm1UzVexHjKqFOP9W6E2UVtkWFvL-vdxIEbTU81rsqNuPmDDy_dQvmQ85ath49JBruVV4aGQA3gY2Dl5SiqFf-AEwPAZBTNkW8FMxGXpDN2mHrf8KlRRiddj1P422ZW1eZkZNWLTd.svg'
          alt='netflix-logo'
          className='w-40 p-5 bg-gradient-to-b from-black'
        />
      </div>
      {user && (
        <div className='flex items-center gap-4 p-2'>
          <img
            src='https://i.pinimg.com/1200x/2f/3f/02/2f3f0210ddd06dcb863a689d93e99345.jpg'
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
