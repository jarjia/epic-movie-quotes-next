import useFeed from './useFeed';

const Feed = () => {
  const { data, handleLogout } = useFeed();

  return (
    <div className='p-8'>
      <h1>{data?.data.name}</h1>
      <h3>{data?.data.email}</h3>
      <button
        className='border-2 border-black bg-gray-500'
        onClick={handleLogout}
      >
        log out
      </button>
      News Feed
    </div>
  );
};

export default Feed;
