import Header from "./Header";
import { useState, useRef, useEffect } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { NETFLIX_BG_IMG } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSigninForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const displayName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    navigate("/login");
  }, [isSignInForm]);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // sign up or sign in logic:
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: displayName.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                }),
              );
              // changing the state so that it directly comes in logged in screen
              setIsSignInForm(!isSignInForm);
              navigate("/logn");
            })
            .catch((error) => {
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className='absolute h-screen overflow-hidden flex items-center justify-center'>
        <img src={NETFLIX_BG_IMG} alt='bg-image' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black z-1 my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80  text-white'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Full Name'
            className='p-4 my-2 w-full bg-gray-800'
            ref={displayName}
          />
        )}
        <input
          type='text'
          placeholder='Email or Phone Number'
          className='p-4 my-2 w-full bg-gray-800'
          ref={email}
        />
        <input
          type='password'
          placeholder='Password'
          className='p-4 my-2 w-full bg-gray-800'
          ref={password}
        />
        <p className='text-red-700 text-sm mt-5'>{errorMessage}</p>
        <button
          className='p-4 my-4 bg-red-700 w-full rounded font-bold'
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSigninForm}>
          {isSignInForm
            ? "Are you new to Netflix? Sign Up Now"
            : "Already have an accoun ? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
