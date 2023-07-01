import { CameraIcon, DropDownIcon, HouseIcon, UserProfile } from '@/components';
import Link from 'next/link';
import useFeedSidebar from './useFeedSidebar';

const FeedSidebar = () => {
  const {
    handleShouldLogout,
    t,
    handleIsNotBurger,
    dropDownRef,
    userData,
    isBurger,
    router,
    setDropdown,
    btnRef,
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
          <div
            className={`rounded-full border-2 ${
              router.pathname === '/profile'
                ? 'border-default-btn'
                : 'border-transparent'
            }`}
          >
            <UserProfile />
          </div>
          <div>
            <h3 className='capitalize text-2xl text-white break-words capitalize'>
              {userData?.name}
            </h3>
            <p className='text-input text-sm hover:text-white'>
              {t('edit_profile')}
            </p>
          </div>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/newsfeed'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <HouseIcon isFeed={router.pathname === '/newsfeed'} />
          <p className='text-white text-2xl'>{t('news_feed')}</p>
        </Link>
        <Link
          onClick={handleIsNotBurger}
          href='/movie-list'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <CameraIcon isMovie={router.pathname.includes('movie-list')} />
          <p className='text-white text-2xl'>{t('list_of_movies')}</p>
        </Link>
      </div>
      {isBurger && (
        <>
          <div
            className='fixed sm:block hidden w-full h-full z-[-1]'
            onClick={handleIsNotBurger}
          ></div>
          <div className='sm:block hidden py-16 z-[999] bg-post-bg w-full h-full rounded-xl'>
            <Link
              onClick={handleIsNotBurger}
              href='/profile'
              className='cursor-pointer py-2 px-6 hover:bg-add-quote-bg active:bg-add-quote-bg flex items-center gap-6'
            >
              <div
                className={`rounded-full border-2 ${
                  router.pathname === '/profile'
                    ? 'border-default-btn'
                    : 'border-transparent'
                }`}
              >
                <UserProfile />
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
              className='flex cursor-pointer py-4 hover:bg-add-quote-bg active:bg-add-quote-bg px-10 my-2 items-center gap-8'
            >
              <HouseIcon isFeed={router.pathname === '/newsfeed'} />
              <p className='text-white text-2xl sm:text-xl'>{t('news_feed')}</p>
            </Link>
            <Link
              onClick={handleIsNotBurger}
              href='/movie-list'
              className={`flex cursor-pointer py-4 px-10 my-2 hover:bg-add-quote-bg active:bg-add-quote-bg items-center gap-8`}
            >
              <CameraIcon isMovie={router.pathname.includes('movie-list')} />
              <p className='text-white text-2xl sm:text-xl'>
                {t('list_of_movies')}
              </p>
            </Link>
            <div className='flex pl-4 flex-col justify-start items-start'>
              <button
                className='text-white text-xl capitalize tracking-[1px] gap-2 px-4 py-2.5 text-center inline-flex items-center'
                type='button'
                ref={btnRef}
                onClick={() => setDropdown((prev) => !prev)}
              >
                {router.locale === 'en' ? 'Eng' : 'ქარ'}
                <div className='mt-1 rotate-[270deg]'>
                  <DropDownIcon />
                </div>
              </button>
              {dropDown && (
                <div className='relative bottom-12 left-20'>
                  <div
                    ref={dropDownRef}
                    className='z-10 absolute bg-post-bg shadow-2xl divide-y divide-gray-100 rounded-lg shadow'
                  >
                    <ul className='py-2 text-md text-white'>
                      <li>
                        <Link
                          href=''
                          locale='en'
                          onClick={() => {
                            localStorage.removeItem('locale');
                            setDropdown((prev) => !prev);
                          }}
                          className='block px-4 py-2 hover:opacity-[0.5]'
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
                            setDropdown((prev) => !prev);
                          }}
                          className='block px-4 py-2 hover:opacity-[0.5]'
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
