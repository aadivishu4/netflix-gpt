import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import Error from "./Error";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/browse/:id",
      element: <VideoPreview />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <div className='min-h-screen bg-black overscroll-none'>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};
export default Body;
