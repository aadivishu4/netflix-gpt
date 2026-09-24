import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSigninForm = () => {
    console.log("toggle clicked...");
    setIsSignInForm(!isSignInForm);
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
        action=''
        className='w-3/12 absolute p-12 bg-black z-1 my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80  text-white'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Full Name'
            className='p-4 my-2 w-full bg-gray-800'
          />
        )}
        <input
          type='text'
          placeholder='Email or Phone Number'
          className='p-4 my-2 w-full bg-gray-800'
        />
        <input
          type='password'
          placeholder='Password'
          className='p-4 my-2 w-full bg-gray-800'
        />
        <button className='p-4 my-4 bg-red-700 w-full rounded font-bold'>
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
