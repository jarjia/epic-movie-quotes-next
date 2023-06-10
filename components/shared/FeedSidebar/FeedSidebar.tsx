import { CameraIcon, DropDownIcon, HouseIcon, UserProfile } from '@/components';
import Link from 'next/link';
import useFeedSidebar from './useFeedSidebar';

const FeedSidebar = () => {
  const {
    handleShouldLogout,
    t,
    handleIsNotBurger,
    userData,
    isBurger,
    router,
    handleDropDown,
    dropDown,
  } = useFeedSidebar();

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
            <p className='text-input text-sm'>{t('edit_profile')}</p>
          </div>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/newsfeed'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <HouseIcon />
          <p className='text-white text-2xl'>{t('news_feed')}</p>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/movie-list'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <CameraIcon />
          <p className='text-white text-2xl'>{t('list_of_movies')}</p>
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
                <p className='text-input'>{t('edit_profile')}</p>
              </div>
            </Link>
            <Link
              onClick={handleIsNotBurger}
              href='/newsfeed'
              className='flex cursor-pointer items-center gap-8 pl-4 my-8'
            >
              <HouseIcon />
              <p className='text-white text-2xl sm:text-xl'>{t('news_feed')}</p>
            </Link>
            <Link
              onClick={handleIsNotBurger}
              href='/movie-list'
              className='flex cursor-pointer items-center gap-8 pl-4 my-8'
            >
              <CameraIcon />
              <p className='text-white text-2xl sm:text-xl'>
                {t('list_of_movies')}
              </p>
            </Link>
            <div className='flex flex-col justify-start items-start'>
              <button
                className='text-white text-xl capitalize tracking-[1px] gap-2 px-4 py-2.5 text-center inline-flex items-center'
                type='button'
                onClick={handleDropDown}
              >
                {router.locale === 'en' ? 'Eng' : 'ქარ'}
                <div className='mt-1 rotate-[270deg]'>
                  <DropDownIcon />
                </div>
              </button>
              {dropDown && (
                <div className='relative bottom-12 left-20'>
                  <div className='z-10 absolute bg-post-bg shadow-2xl divide-y divide-gray-100 rounded-lg shadow'>
                    <ul className='py-2 text-md text-white'>
                      <li>
                        <Link
                          href=''
                          locale='en'
                          onClick={() => {
                            localStorage.removeItem('locale');
                            handleDropDown();
                          }}
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          href=''
                          locale='ka'
                          onClick={() => {
                            localStorage.setItem('locale', 'ka');
                            handleDropDown();
                          }}
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          ქართული
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <button
                onClick={handleShouldLogout}
                className='mx-4 my-4 text-xl  text-white'
              >
                {t('log_out')}
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default FeedSidebar;
