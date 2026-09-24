import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        console.log("checking user......", user);
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          }),
        );
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  const dispatch = useDispatch();

  return (
    <div className='min-h-screen bg-black overscroll-none'>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};
export default Body;
