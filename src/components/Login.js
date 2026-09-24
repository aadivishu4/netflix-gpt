import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const toggleSigninForm = () => {
    console.log("toggle clicked...");
    setIsSignInForm(!isSignInForm);
  };

  const displayName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    // sign up or sign in logic:
    debugger;
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user data => ", user);
          updateProfile(auth.currentUser, {
            displayName: displayName.current.value,
          })
            .then(() => {
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error);
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("error ===> ", errorCode);
          console.log("error message ===> ", errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("sign in user ===> ", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          console.log("error ===> ", errorCode);
          console.log("error message ===> ", errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/4263c437-c678-4724-ad80-e3ba0dc8761e/web/IN-en-20260921-TRIFECTA-perspective_95810136-2c4a-4ab4-a323-50418521e261_large.jpg'
          alt='bg-image'
        />
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
