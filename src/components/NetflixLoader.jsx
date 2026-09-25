import { useSelector } from "react-redux";

const NetflixLoader = () => {
  const isLoading = useSelector((store) => store.gpt.isLoading);

  if (!isLoading) return null;

  return (
    <div className='flex w-full items-center justify-center py-16'>
      <div className='h-14 w-14 animate-spin rounded-full border-4 border-gray-700 border-t-red-600' />
    </div>
  );
};

export default NetflixLoader;
