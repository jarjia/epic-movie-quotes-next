import { CameraIcon, HouseIcon, UserProfile } from '@/components';
import { AppContext } from '@/context';
import Link from 'next/link';
import { useContext } from 'react';

const FeedSidebar = () => {
  const { userData, handleIsNotBurger, isBurger } = useContext(AppContext);

  return (
    <aside
      className={`fixed sm:top-[-100px] ${
        isBurger ? 'sm:z-[99]' : 'sm:z-[-1]'
      } sm:right-[33px] sm:h-screen pt-24 px-8 sm:w-screen h-full bg-transparent w-1/4`}
    >
      <div className='block sm:hidden'>
        <Link
          onClick={handleIsNotBurger}
          href='/profile'
          className='my-4 cursor-pointer flex items-center gap-6'
        >
          <UserProfile />
          <div>
            <h3 className='text-2xl text-white break-words capitalize'>
              {userData?.name}
            </h3>
            <p className='text-input'>Edit your profile</p>
          </div>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/newsfeed'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <HouseIcon />
          <p className='text-white text-2xl'>News feed</p>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/movie-list'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <CameraIcon />
          <p className='text-white text-2xl'>List of movies</p>
        </Link>
      </div>
      {isBurger && (
        <>
          <div
            className='fixed sm:block hidden w-full h-full z-[-1]'
            onClick={handleIsNotBurger}
          ></div>
          <div className='sm:block hidden px-6 py-16 z-[999] bg-post-bg w-full h-full rounded-xl'>
            <Link
              onClick={handleIsNotBurger}
              href='/profile'
              className='cursor-pointer flex items-center gap-6'
            >
              <div>
                <div
                  className='w-profile h-profile rounded-full bg-center bg-cover'
                  style={{ backgroundImage: 'url(/assets/images/user.png)' }}
                ></div>
              </div>
              <div>
                <h3 className='text-2xl sm:text-xl text-white break-words capitalize'>
                  {userData?.name}
                </h3>
                <p className='text-input'>Edit your profile</p>
              </div>
            </Link>
            <Link
              onClick={handleIsNotBurger}
              href='/newsfeed'
              className='flex cursor-pointer items-center gap-8 pl-4 my-8'
            >
              <HouseIcon />
              <p className='text-white text-2xl sm:text-xl'>News feed</p>
            </Link>
            <Link
              onClick={handleIsNotBurger}
              href='/movie-list'
              className='flex cursor-pointer items-center gap-8 pl-4 my-8'
            >
              <CameraIcon />
              <p className='text-white text-2xl sm:text-xl'>List of movies</p>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
};

export default FeedSidebar;
