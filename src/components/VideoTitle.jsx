import { useNavigate } from "react-router-dom";
const VideoTitle = ({ title, overview, id }) => {
  const navigate = useNavigate();

  const handleMainTrailerPlay = () => {
    navigate(`/browse/${id}`);
  };

  return (
    <div
      onClick={handleMainTrailerPlay}
      className='w-screen aspect-video pt-[20%] px-24 absolute bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div>
        <button className='bg-white text-black text-lg p-3 px-12 rounded-sm hover:bg-opacity-80'>
          ▶ Play
        </button>
        <button className='mx-2 bg-gray-600 text-black text-lg p-3 px-12 rounded-sm'>
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
