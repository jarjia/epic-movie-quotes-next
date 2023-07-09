import { CameraIcon, DropDownIcon, HouseIcon, UserProfile } from '@/components';
import Link from 'next/link';
import useFeedSidebar from './useFeedSidebar';
import { AppBars } from '@/types';

const FeedSidebar: React.FC<AppBars> = ({
  setShouldLogout,
  setIsBurger,
  isBurger,
}) => {
  const {
    t,
    dropDownRef,
    userData,
    router,
    setDropdown,
    btnRef,
    dropDown,
    setIsHovered,
    isHovered,
  } = useFeedSidebar();

  return (
    <aside
      className={`fixed ${
        isBurger ? 'sm:z-[999]' : 'sm:z-[-1]'
      } sm:right-[33px] sm:h-screen pt-24 px-8 sm:pt-0 sm:w-screen h-full bg-transparent w-1/4`}
    >
      <div className='block sm:hidden'>
        <Link
          href='/profile'
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
            <p className={`text-sm ${isHovered ? 'text-white' : 'text-input'}`}>
              {t('edit_profile')}
            </p>
          </div>
        </Link>
        <Link
          href='/newsfeed'
          className='flex cursor-pointer items-center gap-8 pl-4 my-8'
        >
          <HouseIcon isFeed={router.pathname === '/newsfeed'} />
          <p className='text-white text-2xl'>{t('news_feed')}</p>
        </Link>
        <Link
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
            className='fixed sm:block hidden w-full h-screen z-[-1]'
            onClick={() => setIsBurger((prev: boolean) => !prev)}
          ></div>
          <div className='sm:block hidden py-16 z-[999] bg-post-bg w-[80%] sm-mid:w-full tiny:w-[calc(100vw-10%)] h-full rounded-xl'>
            <Link
              href='/profile'
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
                <p
                  className={`text-sm ${
                    isHovered ? 'text-white' : 'text-input'
                  }`}
                >
                  {t('edit_profile')}
                </p>
              </div>
            </Link>
            <Link
              href='/newsfeed'
              className='flex cursor-pointer py-4 hover:bg-add-quote-bg active:bg-add-quote-bg px-10 my-2 items-center gap-8'
            >
              <HouseIcon isFeed={router.pathname === '/newsfeed'} />
              <p className='text-white text-2xl sm:text-xl'>{t('news_feed')}</p>
            </Link>
            <Link
              href='/movie-list'
              className={`flex cursor-pointer py-4 px-10 my-2 hover:bg-add-quote-bg active:bg-add-quote-bg items-center gap-8`}
            >
              <CameraIcon isMovie={router.pathname.includes('movie-list')} />
              <p className='text-white text-2xl sm:text-xl'>
                {t('list_of_movies')}
              </p>
            </Link>
            <div className='flex flex-col justify-start items-start'>
              <button
                className='w-full text-white text-xl capitalize tracking-[1px] gap-2 px-4 pl-9 py-2.5 text-center inline-flex items-center'
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
                          href={router.asPath}
                          locale='en'
                          scroll={false}
                          onClick={() => {
                            localStorage.removeItem('locale');
                            setDropdown((prev) => !prev);
                          }}
                          className='block px-4 py-2 hover:bg-add-quote-bg active:bg-add-quote-bg'
                        >
                          English
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={router.asPath}
                          locale='ka'
                          scroll={false}
                          onClick={() => {
                            localStorage.setItem('locale', 'ka');
                            setDropdown((prev) => !prev);
                          }}
                          className='block px-4 py-2 hover:bg-add-quote-bg active:bg-add-quote-bg'
                        >
                          ქართული
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShouldLogout(true)}
                className='w-full my-4 mt-0 pl-9 py-4 text-start text-xl text-white hover:bg-add-quote-bg active:bg-add-quote-bg'
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
